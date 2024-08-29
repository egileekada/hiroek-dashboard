
import { BankForm } from '../../components/donate'
import PageHeader from '../../components/shared/pageHeader'

export default function AddBankDetailPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Setup Bank Account" body="Effortless Event Creation and Community Engagement." />
            <BankForm />
        </div>
    )
}