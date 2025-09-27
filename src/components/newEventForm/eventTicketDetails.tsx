import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CustomButton, Text } from "../shared";
import { FormikProps } from "formik";
import { ICreateEvent } from "../../model/event";
import { formatNumber } from "../../utils/numberFormat";
import { dateFormat } from "../../utils/dateFormat";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdEditSquare } from "react-icons/md"; 

interface IProps {
    formik: FormikProps<ICreateEvent>;
    data: any;
    setTab: (by: number) => void
    setOpen: (by: boolean) => void
}


export default function EventTicketDetails({ formik, setTab, setOpen }: IProps) {


    // const [ticketNo, setTicketNo] = useState(0)

    const navigate = useNavigate()
    const history = useLocation()
    const { id } = useParams();


    const clickTicket = (type: "remove" | "add", index: number) => {
        if (Number(formik?.values?.ticketing[Number(index)].signUpLimit) > 0 && type === "remove") {
            formik.setFieldValue(`ticketing[${index}].signUpLimit`, Number(formik?.values?.ticketing[Number(index)]?.signUpLimit) - 1)
            // setTicketNo((prev) => prev - 1)
        } else if (type === "add") {
            if (!formik?.values?.ticketing[Number(index)]?.signUpLimit) {
                formik.setFieldValue(`ticketing[${index}].signUpLimit`, 1)
            } else {
                formik.setFieldValue(`ticketing[${index}].signUpLimit`, Number(formik?.values?.ticketing[Number(index)]?.signUpLimit) + 1)
            }
        }
    }

    const clickHandler = () => {
        if(history.pathname.includes("edit")) {
            navigate(`/dashboard/event/edit/${id}?type=ticket&index=${formik.values.ticketing.length}`)
        } else {
            navigate(`/dashboard/event/create?type=ticket&index=${formik.values.ticketing.length}`)
        }
    }


    const editHandler = (index: number) => {
        if(history.pathname.includes("edit")) {
            navigate(`/dashboard/event/edit/${id}?type=editticket&index=${index}`)
        } else {
            navigate(`/dashboard/event/create?type=editticket&index=${index}`)
        }
    }

    const openHandler = () => {

        if(history.pathname.includes("edit")) {
            if(formik.values.recurrence.frequency) {
                navigate(`/dashboard/event/edit/${id}?type=recurrence`)
            } else {
                setTab(2)
                setOpen(true)
            } 
        } else {
            setTab(2)
            setOpen(true)
        }
    }

    return (
        <form className=" max-w-[450px] w-full h-full flex flex-col gap-4 lg:pb-6 px-4 " >
            {formik.values.ticketing.map((item, index) => {
                return (
                    <div key={index} className=" flex w-full flex-col " >
                        <div className=" w-full h-[56px] rounded-t-xl bg-primary px-4 flex justify-between items-center " >
                            <Text className=" font-bold text-sm text-white " >{item?.ticketType}</Text>
                            <div className=" w-fit flex gap-3 items-center " >
                                <div className=" w-fit h-[54px] text-white px-2 gap-4 flex justify-between items-center rounded-lg " >
                                    <div role="button" onClick={() => clickTicket("remove", index)} >
                                        <AiOutlineMinusCircle size={"30px"} />
                                    </div>
                                    {item?.signUpLimit ?? "0"}
                                    <div role="button" onClick={() => clickTicket("add", index)} >
                                        <IoMdAddCircleOutline size={"30px"} />
                                    </div>
                                </div>
                                <button onClick={()=> editHandler(index)} >
                                    <MdEditSquare color="white" size={"20px"} />
                                </button>
                            </div>
                        </div>
                        <div className=" w-full border-t-0 border h-[63px] flex items-center justify-between px-4 rounded-b-xl " >
                            <div className=" flex flex-col text-primary " >
                                <Text className=" font-bold " >{formatNumber(item?.ticketPrice)} {item?.signUpLimit > 0 && <span className=" text-xs font-semibold " >({item?.signUpLimit} Tickets Available)</span>}</Text>
                                <Text className=" text-xs font-semibold " >Sales End On {dateFormat(item?.salesEndDate)}</Text>
                            </div>

                        </div>
                    </div>
                )
            })}
            <CustomButton onClick={clickHandler} bgColor="#fff" color="#37137f" borderColor="#37137f" borderWidth="2px" >Add Other Ticket Types</CustomButton>
            <div className=" mt-auto " >
                <CustomButton type="button" onClick={openHandler} >Continue</CustomButton>
            </div>
        </form>
    )
}