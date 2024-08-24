
import { ChangePasswordForm } from "../components/auth";
import { AuthLayout } from "../components/shared";

export default function ChangePassword() {
    return (
        <AuthLayout header="Create New Password" body="Create a new password for your account." >
            <ChangePasswordForm /> 
        </AuthLayout>
    )
}
