import { AuthLayout } from '../components/shared'
import { ResetSent } from '../components/auth'

export default function ResetSentPage() {
  return (
    <AuthLayout hidesidebar={true} hidefooter={true} header="" body="" >
        <ResetSent /> 
    </AuthLayout>
  )
}
