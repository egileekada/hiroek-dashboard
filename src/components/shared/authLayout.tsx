import { Text } from "@radix-ui/themes"

interface IProps {
    children: React.ReactNode,
    header?: string,
    body?: string,
    hidesidebar?: boolean
}

export default function AuthLayout({ children, header, body, hidesidebar }: IProps) {
    return (
        <div className=" w-full h-screen flex lg:bg-gradient-to-r from-[#37137F] from-[34.29%]  to-[#2E4991] to-100%  "  >
            <div className=" w-full h-full flex flex-col justify-center relative items-center lg:px-0 px-6  " >
                <div className="  rounded-full absolute top-0 w-full flex justify-center " >
                    <div className=" max-w-[450px] h-[150px] lg:hidden w-full relative " >
                        <img src="/images/halfcircle.png" className=" w-full max-w-[450px] " />
                        <div className=" w-full flex flex-col absolute top-0 pt-4 text-white items-center " >
                            <Text className=" uppercase text-[32px] font-black " >Hiroek</Text>
                            <Text className=" text-xs tracking-[1%] font-medium " >FOR CHARITIES</Text>
                        </div>
                    </div>
                </div>
                <div className=" max-w-[450px] w-full flex flex-col items-center text-primary lg:text-white gap-4 " >
                    <div className=" w-full flex flex-col items-center " >
                        <Text className=" uppercase lg:block hidden text-[32px] font-black " >Hiroek</Text>
                        <Text className=" lg:block hidden text-xs tracking-[1%] font-medium " >FOR CHARITIES</Text>
                        <Text className=" text-[28px] font-black mt-4 " >{header}</Text>
                        <Text className=" text-sm tracking-[1%] font-medium " >{body}</Text>
                    </div>
                    {children} 
                    <div className=" max-w-[389px] w-full lg:flex hidden flex-col font-medium text-sm text-primary lg:mt-0 mt-auto lg:text-[#FFFFFFBF] text-center gap-4 " >
                        <div className=" w-full flex h-[44px] justify-between items-center " >
                            <Text role="button" >Get In Touch</Text>
                            <Text role="button" >Privacy Policy</Text>
                            <Text role="button" >Terms of Use</Text>
                        </div>
                        <Text role="button" >© 2024 Hiroek. All Rights Reserved.</Text>
                    </div>
                </div>
                    <div className=" absolute bottom-8 max-w-[389px] w-full flex lg:hidden flex-col font-medium text-sm px-6 text-primary lg:mt-0 mt-auto lg:text-[#FFFFFFBF] text-center gap-4 " >
                        <div className=" w-full flex h-[44px] justify-between items-center " >
                            <Text role="button" >Get In Touch</Text>
                            <Text role="button" >Privacy Policy</Text>
                            <Text role="button" >Terms of Use</Text>
                        </div>
                        <Text role="button" >© 2024 Hiroek. All Rights Reserved.</Text>
                    </div>

            </div>
            <div className={` w-full h-full hidden ${hidesidebar ? " hidden " : " lg:block "} `} >
                <div className=" w-full h-full rounded-bl-[150px] flex flex-col gap-5 bg-black px-8 pt-[10%] text-white " >
                    <Text className=" leading-[48px] text-[40px] text-center font-extrabold " >Get Started With 3 Easy Steps</Text>
                    <div className=" flex gap-3 " >
                        <div className=" w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#FFFFFF1A] text-[18px] font-bold text-[#FFFFFFBF] " >
                            1
                        </div>
                        <div className=" flex flex-col flex-1 " >
                            <Text className=" text-[24px] font-black " >Verify Organization</Text>
                            <Text className=" text-lg font-medium " >Start by entering your organizations email To claim Your account And a verification Link Will Be Sent To Organizations email.</Text>
                        </div>
                    </div>
                    <div className=" flex gap-3 " >
                        <div className=" w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#FFFFFF1A] text-[18px] font-bold text-[#FFFFFFBF] " >
                            2
                        </div>
                        <div className=" flex flex-col flex-1 " >
                            <Text className=" text-[24px] font-black " >Create New Password</Text>
                            <Text className=" text-lg font-medium " >After Verifying the link sent to The email, Organization Will Be Required To create a new password for their account.</Text>
                        </div>
                    </div>
                    <div className=" flex gap-3 " >
                        <div className=" w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#FFFFFF1A] text-[18px] font-bold text-[#FFFFFFBF] " >
                            3
                        </div>
                        <div className=" flex flex-col flex-1 " >
                            <Text className=" text-[24px] font-black " >Setup Organization Profile</Text>
                            <Text className=" text-lg font-medium " >Maximise your Time Through Seamless Event Creation and Community Activation.</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}