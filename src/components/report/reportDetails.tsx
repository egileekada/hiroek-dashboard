import { Text } from "@radix-ui/themes";
import { CustomButton } from "../shared";
import { EditIcon } from "../../svg";
import { useNavigate } from "react-router-dom";


export default function ReportDetails() {

    const router = useNavigate()

    return (
        <div className=" w-full flex flex-col lg:px-0 px-4  pb-6 " >
            <div className=" w-full flex lg:flex-row flex-col gap-6 text-primary " >
                <div className=" w-full flex flex-col gap-4  " >
                    <div className=" w-full h-[318px] rounded-3xl bg-red-400 " >

                    </div>
                    {/* <div className=" w-auto flex overflow-x-auto " >
                    <div className=" w-fit flex gap-4 " >
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                        <div className=" w-[100px] h-[80px] rounded-lg bg-[#D9D9D9] " >

                        </div>
                    </div>
                </div> */}
                    <div className=" w-full flex flex-col gap-1 " >
                        <Text className=" text-[#232536] text-4xl !leading-10 font-bold " >Empowering Local Communities and Businesses</Text>
                        <Text className=" text-[#6D6E76] " >We have been at the forefront of empowering local communities through various outreach programs. This year, we successfully organized over 50 community workshops focusing on skill development, health education, and financial literacy. These initiatives have reached more than 10,000 individuals, providing them with the tools and knowledge to improve their quality of life.</Text>
                    </div>
                    <div className=" w-full flex flex-col gap-1 " >
                        <Text className=" text-[#232536] text-4xl font-bold " >Impact Highlights</Text>
                        <ul className=" list-disc ml-5 text-[#6D6E76] " >
                            <li>50+ workshops conducted</li>
                            <li>10,000+ individuals benefited</li>
                            <li>Increased local employment by 15%</li>
                        </ul>
                    </div>
                </div>
                <div className=" w-full  flex flex-col " >
                    <div className=" max-w-[479px] h-[384px] w-fulls " >
                    </div>
                </div>
            </div>
            <div className=" w-full mt-4 lg:hidden " >
            <CustomButton className=" px-3 " onClick={() => router("/dashboard/report/post")} hasFrontIcon={true} icon={
                <EditIcon />
            } >
                Edit Impact Details
            </CustomButton>
            </div>
        </div>
    )
}
