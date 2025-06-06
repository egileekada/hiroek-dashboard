import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared";
import CommunityCardList from "../../components/shared/communityCardList";
import PageHeader from "../../components/shared/pageHeader";
import { MobileCommunityIcon } from "../../svg";
import { CiSearch } from "react-icons/ci";
import { useSearchStore } from "../../global-state/useSearchText";



export default function CommunityPage() {

    const router = useNavigate();
    const { search, setSearchText } = useSearchStore((state)=> state)

    return (
        <div className=' w-full flex flex-col gap-4 lg:gap-6 relative '>
            <div className=" w-full flex items-center justify-between ">
                <PageHeader header="Channel" body="" />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton width="270px" onClick={() => router("/dashboard/community/create")} hasFrontIcon={true} icon={<MobileCommunityIcon />}>
                        Create Channel
                    </CustomButton>
                </div>
            </div> 
            <div className=" w-full lg:hidden relative px-4  ">
                <div className=' w-9 h-full absolute top-0 flex text-[#37137F80] items-center justify-center '>
                    <CiSearch size={"20px"} />
                </div>
                <input type={"search"} placeholder={"Search"} value={search} onChange={(e)=> setSearchText(e?.target?.value)} className=" h-[48px] pl-8 px-3 border-[#37137F80] border-[2px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] outline-none rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary pt-1 " />
            </div>
            <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 ">
                {/* <div className=" hidden lg:block ">
                    <CommunityCardList title="Channel" />
                </div> */}
                <CommunityCardList title="All Channels" mobile={true} />
            </div>
            <div className=" w-fit lg:hidden md:bottom-8 fixed bottom-28 ml-auto mr-6 right-0  ">
                <CustomButton rounded="44px" bgColor="#37137F" onClick={() => router("/dashboard/community/create")} hasFrontIcon={true} icon={<MobileCommunityIcon />}>
                    Create Channel
                </CustomButton>
            </div>
        </div>
    );
}
