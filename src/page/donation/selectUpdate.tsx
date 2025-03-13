import { IoIosArrowForward } from 'react-icons/io'
import PageHeader from '../../components/shared/pageHeader'
import { PinIcon, Wallet2Icon } from '../../svg'
import { useNavigate } from 'react-router-dom'

export default function SelectUpdate() {

    const navigate = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 text-white ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader second={true} back={true} header="Manage Your Account" body="" />
            </div>
            <div className=' max-w-[500px] flex flex-col gap-4 lg:px-0 px-4 ' > 
                <div role='button' onClick={()=> navigate("/dashboard/donation/bankInfo")} className=' w-full h-[54px] flex gap-3 items-center rounded-[10px] px-4 bg-primary ' >
                    <Wallet2Icon />
                    <p className=' text-sm ' >Update Bank Details</p>
                    <IoIosArrowForward size={"20px"} className=' ml-auto ' />
                </div>
                <div role='button' onClick={()=> navigate("/dashboard/donation/pin")} className=' w-full h-[54px] flex gap-3 items-center rounded-[10px] px-4 bg-primary ' >
                    <PinIcon />
                    <p className=' text-sm ' >Update Security Pin</p>
                    <IoIosArrowForward size={"20px"} className=' ml-auto ' />
                </div>
            </div>
        </div>
    )
}
