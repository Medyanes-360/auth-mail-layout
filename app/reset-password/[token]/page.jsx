import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
}
