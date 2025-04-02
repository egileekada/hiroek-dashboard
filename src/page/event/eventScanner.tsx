import { useNavigate, useParams } from 'react-router-dom'
import { CustomButton } from '../../components/shared'
import { CloseIcon, HistoryIcon } from '../../svg'
import { QrReader } from 'react-qr-reader'
import useConversation from '../../hooks/eventHooks/useConversation'
import { useEffect, useState } from 'react'

function EventScanner() {

    const navigate = useNavigate()
    const { id } = useParams();

    const { verifyTicket } = useConversation()

    const [index, setIndex] = useState("")

    useEffect(()=> {
        if(index){
            verifyTicket(index)
        }
    }, [index])

    return (
        <div className=' w-full flex relative h-full justify-center bg-primary items-center  ' >
            <div className=" absolute top-6 right-4 flex px-2 items-center gap-2 "  >
                <CustomButton onClick={()=> navigate(`/dashboard/event/scan/history/${id}`)} bgColor='white' rounded='44px' color='#37137F' width='fit-content' height='46px'
                    icon={
                        <HistoryIcon />
                    }
                    hasFrontIcon={true}
                >
                    <p className=' font-bold text-sm ' >Ticket Scan History</p>
                </CustomButton>
            </div>

            <div className=' w-full px-4 bg-primary h-full rounded-2xl flex flex-col justify-center items-center ' >
                <div className=' w-full max-w-[250px] border-8 border-white rounded-2xl h-[250px] bg-white ' >
                    <QrReader 
                        onResult={(result: any) => {
                            if (!!result) {
                                if(index !== result?.text)
                                setIndex(result?.text);
                            }
                        }} 
                        constraints={{ facingMode: "environment" }}  // Set container style
                        videoStyle={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "16px",
                          objectFit: "cover", // Makes the video fill the div
                        }}
                    />
                </div>
            </div>
            <div className=' fixed bottom-8 ' >
                <CustomButton onClick={() => navigate(`/dashboard/event/details/${id}`)} bgColor='#FF5151' height='44px' rounded='44px' color='white' width='fit-content'
                    icon={
                        <CloseIcon />
                    }
                    hasIcon={true}
                >
                    
                    <p className=' font-bold ' >Close</p>
                </CustomButton>
            </div>
        </div>
    )
}

export default EventScanner
