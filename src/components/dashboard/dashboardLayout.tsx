import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"
import Navbar from "./navbar"

export default function DashboardLayout() {
    return (
        <div className=" w-screen h-screen flex overflow-hidden " >
            <div className=" w-fit " >
                <div className=" w-[300px] h-screen border-r border-r-[#F0F1F3] " style={{ boxShadow: "4px 0px 30px 0px #8362EA0D" }} >
                    <Sidebar />
                </div>
            </div>
            <div className=" w-full flex flex-col h-screen relative " >
                <div className=" w-full bg-white h-fit top-0 sticky " >
                    <Navbar />
                </div>
                <div className=" overflow-y-auto inset-0 top-[55px] absolute flex p-6 pb-8 " >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
