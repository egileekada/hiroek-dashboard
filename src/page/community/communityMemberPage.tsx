import { CommunityMember } from '../../components/community'
import PageHeader from '../../components/shared/pageHeader'

export default function CommunityMemberPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Community Members" body="Effortless Event Creation and Community Engagement." />
            <CommunityMember />
        </div>
    )
}
