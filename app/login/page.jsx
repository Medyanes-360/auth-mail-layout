import { LoginForm } from "@/features/auth";

export default async function LoginPage() {
  // const session = await auth();

  // Eğer zaten giriş yapılmışsa dashboard'a yönlendir
  // if (session) {
  //   redirect("/dashboard");
  // }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
