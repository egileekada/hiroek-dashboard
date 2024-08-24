import { LoginForm } from "../components/auth";
import { AuthLayout } from "../components/shared";

export default function LoginPage() {
    return (
        <AuthLayout hidesidebar={true} header="Log In" body="Enter your details to access your account." >
            <LoginForm /> 
        </AuthLayout>
    )
}
