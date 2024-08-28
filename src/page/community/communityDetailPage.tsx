import { CommunityDetail } from "../../components/community";
import PageHeader from "../../components/shared/pageHeader";


export default function CommunityDetailPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full lg:block hidden " >
                <PageHeader back={true} header="Community Details" body="Effortless Event Creation and Community Engagement." />
            </div>
            <CommunityDetail />
        </div>
    )
}