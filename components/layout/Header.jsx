"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">
            <Link href="/">Ana Sayfa</Link>
          </h1>
          {session && (
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              Profilim
            </Link>
          )}
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <nav className="flex space-x-4">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900">
                  Giriş Yap
                </Link>
              </>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-gray-600 hover:text-gray-900">
                Çıkış Yap
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
