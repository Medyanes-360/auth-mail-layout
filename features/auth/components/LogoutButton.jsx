"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ className = "" }) {
  const router = useRouter();

  const handleLogout = () => {
    // Token ve kullanıcı bilgilerini sil
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Sayfayı yenile ve login'e yönlendir
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-sm font-medium ${className} cursor-pointer`}>
      Çıkış Yap
    </button>
  );
}
