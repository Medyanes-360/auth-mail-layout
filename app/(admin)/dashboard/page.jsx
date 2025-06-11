"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">Hoş geldiniz, {session?.user?.name}</p>
        <p className="text-gray-600 mt-2">Rolünüz: {session?.user?.role}</p>
      </div>
    </div>
  );
}
