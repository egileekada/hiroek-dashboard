import { useNavigate, useParams } from "react-router-dom";
import { CommunityDetail } from "../../components/community";
import PageHeader from "../../components/shared/pageHeader";
import { CustomButton } from "../../components/shared";
import { AnnoncementIcon, ChatWhiteIcon, EditIcon } from "../../svg";
import useGetCommunityById from "../../hooks/communityHooks/useGetCommunityById";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";


export default function CommunityDetailPage() {

    const router = useNavigate()

    const { data, isLoading } = useGetCommunityById()
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const toggleButtons = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <div className=' w-full flex flex-col gap-6 absolute inset-0 lg:px-4 ' >
            <div className=" w-full lg:flex hidden items-center justify-between " >
                <PageHeader path={"/dashboard/community"} back={true} header="Community Details" body="Effortless Event Creation and Community Engagement." />
                <div className=" gap-3 w-fit flex ">
                    <CustomButton onClick={() => router(`/dashboard/community/edit/${id}`)} hasFrontIcon={true} icon={
                        <EditIcon />
                    } >
                        Edit Channel
                    </CustomButton>
                </div>
            </div>
            {/* <div className=" w-full lg:block hidden " >
                <PageHeader back={true} header="Community Details" body="Effortless Event Creation and Community Engagement." />
            </div> */}
            <LoadingAnimation loading={isLoading} >
                <CommunityDetail item={data} />
            </LoadingAnimation>
            <div className="fixed bottom-4 w-[240px] right-4 flex flex-col justify-end items-center">
                {/* Animated Buttons */}
                {/* {isOpen && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: -80, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="mb-2"
                    >

                        <CustomButton rounded="44px" fontSize="14px" bgColor="#7B1251" onClick={() => router(`/dashboard/community/post/${id}`)} hasFrontIcon={true} icon={
                            <ChatWhiteIcon />
                        } >
                            Add New Post
                        </CustomButton>
                    </motion.div>
                )} */}

                {isOpen && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: -140, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="mb-2 absolute -bottom-16 right-0 w-full ml-auto "
                    >
                        <CustomButton width="200px" fontSize="14px" rounded="44px" bgColor="#7B1251" onClick={() => router(`/dashboard/community/post/${id}?tab=true`)} hasFrontIcon={true} icon={
                            <AnnoncementIcon />
                        } >
                            Add New Broadcast
                        </CustomButton>
                    </motion.div>
                )}

                {/* Main Floating Button */}
                <button
                    className="w-16 h-16 ml-auto rounded-full bg-red-500 text-white shadow-xl flex items-center justify-center"
                    onClick={toggleButtons}
                >
                    {isOpen ? <IoClose size={"25px"} /> : <ChatWhiteIcon />}
                </button>
            </div>
        </div>
    )
}