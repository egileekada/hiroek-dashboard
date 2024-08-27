import { CommunityPost } from "../../components/community"; 
import PageHeader from "../../components/shared/pageHeader";


export default function CommunityPostPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header="Add New Post" body="Effortless Event Creation and Community Engagement." />
            <CommunityPost />
        </div>
    )
}
