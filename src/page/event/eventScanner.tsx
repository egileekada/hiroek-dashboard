import { useNavigate, useParams } from 'react-router-dom'
import { CustomButton } from '../../components/shared'
import { CloseIcon, HistoryIcon } from '../../svg'
import { QrReader } from 'react-qr-reader'

function EventScanner() {

    const navigate = useNavigate()
    const { id } = useParams();

    return (
        <div className=' w-full flex relative h-full justify-center bg-primary items-center  ' >
            <div className=" absolute top-6 right-4 flex px-2 items-center gap-2 "  >
                <CustomButton onClick={()=> navigate(`/dashboard/event/scan/history/${id}`)} bgColor='white' rounded='44px' color='#37137F' width='fit-content' height='46px' >
                    <HistoryIcon />
                    <p className=' font-bold text-sm ' >Ticket Scan History</p>
                </CustomButton>
            </div>

            <div className=' w-full px-4 bg-primary  rounded-2xl flex flex-col justify-center items-center ' >
                <div className=' w-fit rounded-[44px] text-primary bg-white flex justify-center items-center px-3 h-[40px] ' >
                    <p className=' font-bold ' >Start Scanning</p>
                </div>
                <div className=' w-full -mt-2 ' >
                    <QrReader
                        onResult={(result: any) => {
                            if (!!result) {
                                console.log(result);
                            }
                        }}
                        constraints={{ facingMode: "user" }}
                        videoStyle={{ width: '100%', innerHeight: "150px" }}
                    />
                </div>
            </div>
            <div className=' absolute bottom-8 ' >
                <CustomButton onClick={() => navigate(`/dashboard/event/details/${id}`)} bgColor='#FF5151' rounded='44px' color='white' width='fit-content' >
                    <CloseIcon />
                    <p className=' font-bold ' >Close</p>
                </CustomButton>
            </div>
        </div>
    )
}

export default EventScanner
