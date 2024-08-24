import { ResetPasswordForm } from "../components/auth";
import { AuthLayout } from "../components/shared";

export default function ResetPage() {
  return (
    <AuthLayout hidesidebar={true} header="Log In" body="Enter your details to access your account." >
        <ResetPasswordForm /> 
    </AuthLayout>
  )
}
