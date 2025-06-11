"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerValidations } from "@/features/auth/components/RegisterFormValidations";
import { registerUser } from "@/features/auth/servers/actions";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);

      if (!result.success) {
        throw new Error(result.error || "Kayıt başarısız oldu.");
      }

      // Kayıt başarılı, otomatik giriş yap
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/login?registered=true");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      alert(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      return false;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Hoş Geldiniz
        </h2>
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">Ad</Label>
              <Input
                id="name"
                placeholder="Adınız"
                {...register("name", registerValidations.name)}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Soyad</Label>
              <Input
                id="lastname"
                placeholder="Soyadınız"
                type="text"
                {...register("surname", registerValidations.surname)}
              />
              {errors.surname && (
                <span className="text-sm text-red-500">
                  {errors.surname.message}
                </span>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              placeholder="ornek@email.com"
              type="email"
              {...register("email", registerValidations.email)}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", registerValidations.password)}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                ...registerValidations.confirmPassword,
                validate: (value) =>
                  value === watch("password") || "Şifreler eşleşmiyor",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </LabelInputContainer>

          <button
            disabled={isSubmitting}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:opacity-50 cursor-pointer"
            type="submit">
            {isSubmitting ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            <BottomGradient />
          </button>

          <div className="mt-4">
            <Link
              href="/login"
              className="text-neutral-700 dark:text-neutral-300 text-sm text-center block hover:underline">
              Zaten hesabınız var mı? Giriş yapın
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
