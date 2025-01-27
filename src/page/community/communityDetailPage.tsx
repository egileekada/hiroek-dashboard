import { useNavigate, useParams } from "react-router-dom";
import { CommunityDetail } from "../../components/community";
import PageHeader from "../../components/shared/pageHeader";
import { CustomButton } from "../../components/shared";
import { ChatWhiteIcon, EditIcon } from "../../svg";
import useGetCommunityById from "../../hooks/communityHooks/useGetCommunityById";
import LoadingAnimation from "../../components/shared/loadingAnimation";


export default function CommunityDetailPage() {

    const router = useNavigate()

    const { data, isLoading } = useGetCommunityById()
    const { id } = useParams();

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
            <LoadingAnimation loading={isLoading} >
                <CommunityDetail item={data} />
            </LoadingAnimation>
            <div className=" w-fit lg:hidden fixed bottom-8 ml-auto mr-6 right-0  ">
                <CustomButton rounded="44px" bgColor="linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" onClick={() => router(`/dashboard/community/post/${id}`)} hasFrontIcon={true} icon={
                    <ChatWhiteIcon />
                } >
                   Add New Post
                </CustomButton>
            </div>
        </div>
    )
}