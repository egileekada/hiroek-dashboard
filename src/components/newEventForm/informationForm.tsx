
import CustomInput from "./input"
import CustomAddressFormik from "../shared/customAddressFormik"
import CustomDatePicker from "../shared/customDatePicker"
import CustomSelect from "../shared/customSelect"
import ImagePicker from "../shared/imagePicker"
// import { Switch } from "@radix-ui/themes"
import { FormikProps } from "formik"
import { ICreateEvent } from "../../model/event"
import { CustomButton, Text } from "../shared"
import useCategory from "../../hooks/useCategory"
import { useImage } from "../../global-state/useImageData"
import toast from "react-hot-toast" 
import { useLocation, useNavigate, useParams } from "react-router-dom"

interface IProps {
    formik: FormikProps<ICreateEvent>;
    data: any;
    tab?: boolean; 
    setTab: (by: number)=> void
    setOpen: (by: boolean)=> void
}

export default function InformationForm({ formik, data, setTab, setOpen }: IProps) {

    const { isLoading: loadingCategory, data: categoryData } = useCategory()
    const { eventImage } = useImage((state) => state) 
    const history = useLocation()
    const navigate = useNavigate()

    const { id } = useParams();

    const clickHandler = (e: any) => {
        e.preventDefault()
        if (!formik?.values?.address || !formik?.values?.name || !formik?.values?.description || !formik?.values?.address || !formik?.values?.category) {
            formik?.handleSubmit()
        } else if (!eventImage && !formik.values?.photo) {
            toast.error("Add Image")
        } else if (!formik?.values?.eventEndDate || !formik?.values?.endTime) {
            toast.error("Add Event Start And End Date")
        } else {

            if(history.pathname?.includes("edit")) {
                if(formik.values.ticketing.length > 0){ 
                    navigate(`/dashboard/event/edit/${id}?type=ticketdetails`) 
                } else if(formik.values?.fundRaiser.organizations) {
                    navigate(`/dashboard/event/edit/${id}?type=fundraising`)
                } else {
                    navigate(`/dashboard/event/edit/${id}?type=details`)
                }
            } else { 
                setTab(1)
                setOpen(true)
            }
        }
    }

    console.log(categoryData);
    

    return (
        <form onSubmit={(e) => clickHandler(e)} className=" w-full flex flex-col gap-4 lg:pb-6 " >
            <ImagePicker defaultValue={data?.photo} />
            <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <CustomInput borderRadius="8px" name="name" label="Event Name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <CustomInput borderRadius="8px" name="description" label="Event Description" type="text" textarea={true} placeholder="Type event description here. . ." /> 
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomAddressFormik borderRadius="8px" name="address" type="text" placeholder="Type or search for venue..." />
                </div>
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                        {!loadingCategory && (
                            <CustomSelect touched={formik?.touched as any} errors={formik?.errors} value={formik?.values?.category} placeholder="Select Categories" name="category" changeHandler={formik.setFieldValue} list={categoryData} />
                        )}
                    </div>
                </div>
                <div className=" w-full flex !gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Start Date & Time</Text>
                        <CustomDatePicker name="endTime" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >End Date & Time</Text>
                        <CustomDatePicker name="eventEndDate" />
                    </div>
                </div>
                <div className=" mt-6 w-full lg:w-[50%] " >
                    <CustomButton type="submit" >Continue</CustomButton>
                </div>
            </div>
        </form>
    )
}