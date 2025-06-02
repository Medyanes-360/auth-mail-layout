import { LoginForm } from "@/features/auth/components/LoginForm";

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
