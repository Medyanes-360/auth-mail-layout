import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Merhaba, {session?.user?.name}
      </h1>
    </div>
  );
}
