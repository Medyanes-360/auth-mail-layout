"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <h1 className="text-3xl font-bold">
        {user ? `Merhaba, ${user.name}` : "Hoş Geldiniz"}
      </h1>
    </div>
  );
}
