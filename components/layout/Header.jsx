"use client";

import LogoutButton from "@/features/auth/components/LogoutButton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Client tarafında localStorage kontrolü
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">
            <Link href="/">Home</Link>
          </h1>
        </div>
        <div className="flex items-center">
          <nav className="flex space-x-4 mr-8">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900">
                  Giriş Yap
                </Link>
              </>
            ) : (
              <LogoutButton className="text-gray-600 hover:text-gray-900" />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
