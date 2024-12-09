import { CommunityForm } from '../../components/community'
import PageHeader from '../../components/shared/pageHeader'

export default function CreateCommunityPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Create New Community" body="" />
            <CommunityForm />
        </div>
    )
}