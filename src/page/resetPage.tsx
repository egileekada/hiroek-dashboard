import { ResetPasswordForm } from "../components/auth";
import { AuthLayout } from "../components/shared";

export default function ResetPage() {
  return (
    <AuthLayout hidesidebar={true} header="Reset Password" body="Enter your details to access your account." >
        <ResetPasswordForm /> 
    </AuthLayout>
  )
}
