"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/features/auth/servers/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await requestPasswordReset(data.email);

      if (!result.success) {
        throw new Error(
          result.error || "Şifre sıfırlama talebi başarısız oldu."
        );
      }

      const resetUrl = `/reset-password/${result.resetToken}`;
      console.log("Şifre sıfırlama sayfasına yönlendiriliyor:", resetUrl);
      router.push(resetUrl);
    } catch (error) {
      alert(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Şifre Sıfırlama
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
          Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              placeholder="ornek@email.com"
              type="email"
              {...register("email", {
                required: "E-posta adresi zorunludur",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Geçerli bir e-posta adresi giriniz",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </LabelInputContainer>

          <button
            disabled={isSubmitting}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:opacity-50 cursor-pointer"
            type="submit">
            {isSubmitting
              ? "Gönderiliyor..."
              : "Şifre Sıfırlama Bağlantısı Gönder"}
            <BottomGradient />
          </button>

          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-neutral-700 dark:text-neutral-300 text-sm hover:underline">
              Giriş sayfasına dön
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
