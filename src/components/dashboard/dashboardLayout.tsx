import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar" 

export default function DashboardLayout() {
    return (
        <div className=" w-full h-screen overflow-hidden " >
            <div className=" w-[300px] h-screen border-r border-r-[#F0F1F3] " style={{boxShadow: "4px 0px 30px 0px #8362EA0D"}} >
                <Sidebar />
            </div>
            <div className=" w-full h-screen " >
                <div className=" " >
                    
                </div>
                <Outlet />
            </div>
        </div>
    )
}
