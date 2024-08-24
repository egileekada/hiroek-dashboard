import ClaimAccountForm from "../components/auth/claimAccountForm";
import { AuthLayout } from "../components/shared"; 

export default function ClaimAccountPage() {
    return (
        <AuthLayout header="Claim Account" body="Enter your official organization email to proceed." >
            <ClaimAccountForm /> 
        </AuthLayout>
    )
}
