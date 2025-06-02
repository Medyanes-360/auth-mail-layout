import { ResetPasswordForm } from "@/features/auth";

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
}
