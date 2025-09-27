import { FormikProps } from "formik";
import { ICreateEvent } from "../../model/event";
import CustomInput from "./input";
import { CustomButton, Text } from "../shared";
import { AiOutlineMinusCircle } from "react-icons/ai"; 
import { IoMdAddCircleOutline } from "react-icons/io";
import CustomDatePicker from "../shared/customDatePicker"; 
import { useQuery } from "../../utils/useQuery";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface IProps {
    formik: FormikProps<ICreateEvent>;
    data: any;
    setTab: (by: number)=> void
}

export default function EventTicket({ formik }: IProps) {
 
    const query = useQuery();
    const history = useLocation()
    const index = query.get('index'); 
    const { id } = useParams();

    const navigate = useNavigate()

    useEffect(()=> {
        formik.setFieldValue(`ticketing[${index}].absorbFees`, false)
    }, [])

    const clickTicket = (type: "remove" | "add") => {
        if (Number(formik?.values?.ticketing[Number(index)].signUpLimit) > 0 && type === "remove") { 
            formik.setFieldValue(`ticketing[${index}].signUpLimit`, Number(formik?.values?.ticketing[Number(index)]?.signUpLimit) - 1)
            // setTicketNo((prev) => prev - 1)
        } else if (type === "add") {
            if(!formik?.values?.ticketing[Number(index)]?.signUpLimit) {
                formik.setFieldValue(`ticketing[${index}].signUpLimit`, 1)
            } else { 
                formik.setFieldValue(`ticketing[${index}].signUpLimit`, Number(formik?.values?.ticketing[Number(index)]?.signUpLimit) + 1)
            }
        }
    }
    
    const clickHandler = (e: any) => {
        e.preventDefault()
        if(!formik?.values?.ticketing[Number(index)]?.ticketPrice || !formik?.values?.ticketing[Number(index)]?.ticketType || !formik?.values?.ticketing[Number(index)]?.salesStartDate || !formik?.values?.ticketing[Number(index)]?.salesEndDate) {
            toast.error("Fill Ticket Information Completely")
        } else {
            if(history.pathname.includes("edit")) {
                navigate(`/dashboard/event/edit/${id}?type=ticketdetails`) 
            } else {
                navigate("/dashboard/event/create?type=ticketdetails") 
            }
        }
    } 

    return (
        <form onSubmit={clickHandler} className=" max-w-[450px] w-full flex flex-col gap-4 lg:pb-6 px-4 " >
            <div className=" flex w-full flex-col gap-4 " >
                <CustomInput borderRadius="8px" name={`ticketing[${index}].ticketPrice`} label="Event Ticket Price" type="number" placeholder="" />
                <CustomInput borderRadius="8px" name={`ticketing[${index}].ticketType`} label="Ticket Type Name" type="text" placeholder="" />
                <div className=" w-full flex flex-col gap-1 ">
                    <div className=" flex w-full flex-col gap-1 " >
                        <div className=" w-full flex justify-between items-center " >
                            <Text className=" text-primary font-semibold text-sm " >No of Tickets Available</Text>
                        </div>
                        <div className=" w-full h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                            <div role="button" onClick={() => clickTicket("remove")} >
                                <AiOutlineMinusCircle size={"30px"} />
                            </div>
                            <input value={formik?.values?.ticketing[Number(index)]?.signUpLimit}
                                name="signUpLimit"
                                onChange={(e) => formik.setFieldValue(`ticketing[${index}].signUpLimit`, e.target.value)}
                                placeholder="0"
                                type="number"
                                className=" focus:border-0 outline-none text-center "
                                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                            <div role="button" onClick={() => clickTicket("add")} >
                                <IoMdAddCircleOutline size={"30px"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex gap-4 mb-4 "  >
                    <CustomDatePicker name={`ticketing[${index}].salesStartDate`} showTime={false} label="Sale Starts" height={"50px"} /> 
                    <CustomDatePicker name={`ticketing[${index}].salesEndDate`} showTime={false} label="Sale Ends" height={"50px"} />
                </div>
                <CustomButton >Save Ticket Type</CustomButton>
            </div>
        </form>
    )
}