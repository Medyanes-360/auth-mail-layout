"use server";

import {
  createNewData,
  getDataByMany,
  updateData,
} from "@/servers/serviceOperations";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail, sendWelcomeEmail } from "../utils/email";

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

    // Benzersiz şifre sıfırlama kodu oluştur
    const passwordResetCode = uuidv4();
    const passwordResetExpiry = new Date();
    passwordResetExpiry.setHours(passwordResetExpiry.getHours() + 1); // 1 saat geçerli

    // Şifre sıfırlama kodunu kullanıcı bilgilerine kaydet
    await updateData(USER_TABLE, user.id, {
      resetToken: passwordResetCode,
      resetTokenExpiry: passwordResetExpiry,
    });

    // Email gönder
    const emailSent = await sendPasswordResetEmail(email, passwordResetCode);
    if (!emailSent) {
      throw new Error("Email gönderilemedi.");
    }

    return {
      success: true,
      resetToken: passwordResetCode,
    };
  } catch (error) {
    console.error("Şifre sıfırlama talebi sırasında hata:", error);
    return { success: false, error: "İşlem sırasında bir hata oluştu." };
  }
}

// Şifre sıfırlama işlemini gerçekleştirir
export async function resetPassword(passwordResetCode, newPassword) {
  try {
    // Şifre sıfırlama kodu ile kullanıcıyı bul
    const users = await getDataByMany(USER_TABLE, {
      resetToken: passwordResetCode,
    });

    if (!users || users.length === 0) {
      return {
        success: false,
        error: "Geçersiz veya süresi dolmuş şifre sıfırlama kodu.",
      };
    }

    const user = users[0];

    // Şifre sıfırlama kodunun süresini kontrol et
    if (new Date(user.resetTokenExpiry) < new Date()) {
      return {
        success: false,
        error: "Şifre sıfırlama kodunun süresi dolmuş.",
      };
    }

    // Yeni şifreyi hashle
    const hashedPassword = await hash(newPassword, 10);

    // Şifreyi güncelle ve sıfırlama kodunu temizle
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
