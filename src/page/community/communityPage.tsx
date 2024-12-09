import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared";
import CommunityCardList from "../../components/shared/communityCardList";
import PageHeader from "../../components/shared/pageHeader";
import { CommunityIcon } from "../../svg";
import { CiSearch } from "react-icons/ci";


export default function CommunityPage() {

    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-4 lg:gap-6 relative ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader header="Community" body="" />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton width="270px" onClick={() => router("/dashboard/community/create")} hasFrontIcon={true} icon={
                        <CommunityIcon />
                    } >
                        Create New Communities
                    </CustomButton>
                </div>
            </div>
            {/* <PageHeader header="Communities" body="Effortless Event Creation and Community Engagement." /> */}

            <div className=" w-full lg:hidden relative px-4  " >
                <div className=' w-9 h-full absolute top-0 flex text-[#37137F80] items-center justify-center '>
                    <CiSearch size={"20px"} />
                </div>
                <input type={"search"} placeholder={"Search"} className=" h-[48px] pl-8 px-3 border-[#37137F80] border-[2px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] outline-none rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
            </div>
            <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 " >
                <CommunityCardList title="Recent Channels" />
                <CommunityCardList title="All Channels" mobile={true} />
            </div>
            <div className=" w-fit lg:hidden fixed bottom-28 ml-auto mr-6 right-0  ">
                <CustomButton rounded="44px" bgColor="linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" onClick={() => router("/dashboard/community/create")} hasFrontIcon={true} icon={
                    <CommunityIcon />
                } >
                    Create New Communities
                </CustomButton>
            </div>
        </div>
    )
}
