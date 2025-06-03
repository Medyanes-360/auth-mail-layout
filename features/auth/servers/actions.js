"use server";

import {
  createNewData,
  getDataByMany,
  updateData,
} from "@/servers/serviceOperations";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail, sendWelcomeEmail } from "../utils/email";
import { generateToken } from "../utils/jwt";

// Sabitler
const USER_TABLE = "user";

export async function registerUser(data) {
  try {
    // Tüm string değerleri küçük harfe çevir (şifre hariç)
    const email = data.email.toLowerCase();
    const name = data.name.toLowerCase();
    const surname = data.surname.toLowerCase();

    // Email kontrolü
    const existingUser = await getDataByMany(USER_TABLE, {
      email: email,
    });

    if (existingUser && existingUser.length > 0) {
      return { success: false, error: "Bu email adresi zaten kayıtlı." };
    }

    // Şifre hashleme
    const hashedPassword = await hash(data.password, 10);

    // Kullanıcı oluşturma
    const userData = {
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    };

    const newUser = await createNewData(USER_TABLE, userData);

    // Hata kontrolü
    if (newUser.error) {
      throw new Error(newUser.error);
    }
    
    // Hoş geldin emaili gönder
    await sendWelcomeEmail(email, name);
    
    revalidatePath("/login");

    return {
      success: true,
      data: {
        id: newUser.id,
        name: name,
        email: email,
        surname: surname,
      },
    };
  } catch (error) {
    console.error("Kullanıcı kaydı sırasında hata:", error);
    return { success: false, error: "Kayıt sırasında bir hata oluştu." };
  }
}

export async function loginUser(credentials) {
  try {
    // Email ile kullanıcıyı bul
    const users = await getDataByMany(USER_TABLE, {
      email: credentials.email,
    });

    if (!users || users.length === 0 || users.error) {
      return null; // Kullanıcı bulunamadı
    }

    const user = users[0];

    // Şifre kontrolü
    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return null; // Şifre geçersiz
    }

    // JWT token oluştur
    const token = generateToken(user);

    // Kullanıcı bilgileri ve token'ı döndür
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error("Kullanıcı girişi sırasında hata:", error);
    return null;
  }
}

// Şifre sıfırlama talebi oluşturur ve kullanıcıya email gönderir
export async function requestPasswordReset(email) {
  try {
    // Email ile kullanıcıyı bul
    const users = await getDataByMany(USER_TABLE, {
      email: email.toLowerCase(),
    });

    if (!users || users.length === 0 || users.error) {
      return {
        success: false,
        error: "Bu email adresi ile kayıtlı kullanıcı bulunamadı.",
      };
    }

    const user = users[0];

    // Benzersiz token oluştur
    const resetToken = uuidv4();
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // 1 saat geçerli

    // Token'ı kullanıcı bilgilerine kaydet
    await updateData(USER_TABLE, user.id, {
      resetToken: resetToken,
      resetTokenExpiry: tokenExpiry,
    });

    // Email gönder
    const emailSent = await sendPasswordResetEmail(email, resetToken);
    if (!emailSent) {
      throw new Error("Email gönderilemedi.");
    }

    return {
      success: true,
      resetToken: resetToken,
    };
  } catch (error) {
    console.error("Şifre sıfırlama talebi sırasında hata:", error);
    return { success: false, error: "İşlem sırasında bir hata oluştu." };
  }
}

// Şifre sıfırlama işlemini gerçekleştirir
export async function resetPassword(token, newPassword) {
  try {
    // Token'a sahip kullanıcıyı bul
    const users = await getDataByMany(USER_TABLE, {
      resetToken: token,
    });

    if (!users || users.length === 0) {
      return { success: false, error: "Geçersiz veya süresi dolmuş token." };
    }

    const user = users[0];

    // Token süresini kontrol et
    if (new Date(user.resetTokenExpiry) < new Date()) {
      return { success: false, error: "Token süresi dolmuş." };
    }

    // Yeni şifreyi hashle
    const hashedPassword = await hash(newPassword, 10);

    // Şifreyi güncelle ve token bilgilerini temizle
    const updateResult = await updateData(USER_TABLE, user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    if (updateResult.error) {
      throw new Error(updateResult.error);
    }

    return { success: true };
  } catch (error) {
    console.error("Şifre sıfırlama sırasında hata:", error);
    return { success: false, error: "İşlem sırasında bir hata oluştu." };
  }
}
