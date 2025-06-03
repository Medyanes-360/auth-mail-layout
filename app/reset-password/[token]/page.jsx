"use server";

import { ResetPasswordForm } from "@/features/auth";
import { getDataByMany } from "@/servers/serviceOperations";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;

  try {
    // Token'a sahip kullanıcıyı veritabanından kontrol et
    const users = await getDataByMany("user", {
      resetToken: token,
    });

    // Kullanıcı bulunamadıysa veya token geçersizse
    if (!users || users.length === 0) {
      redirect("/login");
    }

    const user = users[0];

    // Token süresini kontrol et
    if (new Date(user.resetTokenExpiry) < new Date()) {
      redirect("/login");
    }

    return <ResetPasswordForm token={token} />;
  } catch (error) {
    redirect("/login");
  }
}

// kullanici url uzerinden reset-password kismina gidememesi icin yaptik sadece gelen mail uzerinden sifre sifirlama url adresine erisebilir
