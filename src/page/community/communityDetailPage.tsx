import { useNavigate } from "react-router-dom";
import { CommunityDetail } from "../../components/community";
import PageHeader from "../../components/shared/pageHeader";
import { CustomButton } from "../../components/shared";
import { EditIcon } from "../../svg";


export default function CommunityDetailPage() {

    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full lg:flex hidden items-center justify-between " >
                <PageHeader back={true} header="Community Details" body="Effortless Event Creation and Community Engagement." />
                <div className=" gap-3 w-fit flex ">
                    <CustomButton onClick={() => router("/dashboard/event/create")} hasFrontIcon={true} icon={
                        <EditIcon />
                    } >
                        Edit Community
                    </CustomButton>
                </div>
            </div>
            {/* <div className=" w-full lg:block hidden " >
                <PageHeader back={true} header="Community Details" body="Effortless Event Creation and Community Engagement." />
            </div> */}
            <CommunityDetail />
            <div className=" w-fit lg:hidden mt-auto sticky bottom-2 ml-auto mr-6 z-10 right-0 ">
                <CustomButton rounded="44px" bgColor="linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" onClick={() => router("/dashboard/community/create")} hasFrontIcon={true} icon={
                    <EditIcon />
                } >
                    Edit Community
                </CustomButton>
            </div>
        </div>
    )
}