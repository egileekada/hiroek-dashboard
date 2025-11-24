import { FormikProps } from "formik";
import { ICreateEvent } from "../../model/event";
import CustomInput from "./input";
import { CustomButton, Text } from "../shared";
import OrganizationCardWithId from "../event/organizationCardById";
import { useLocation, useNavigate, useParams } from "react-router-dom"; 

interface IProps {
    formik: FormikProps<ICreateEvent>;
    data: any;
    setTab: (by: number)=> void
}

export default function EventFundraising({ formik }: IProps) {

    const history = useLocation() 
    const { id } = useParams();

    const navigate = useNavigate()

    const clickHandler = () => {
        if(history.pathname.includes("edit")) {
            navigate(`/dashboard/event/edit/${id}?type=details`)
        } else {
            navigate(`/dashboard/event/create?type=details`)
        }
    } 

    return (
        <form onSubmit={clickHandler} className=" max-w-[450px] w-full flex h-full flex-col gap-4 lg:pb-6 px-4 " >
            <div className=" flex w-full flex-col gap-4 " >
                <CustomInput borderRadius="8px" name="fundRaiser.fundRaisingGoal" label="Set Fundraising Target" type="number" placeholder="" />
                {/* <CustomInput borderRadius="8px" name="name" label="Add Charity Partner" type="text" placeholder="" /> */}
                <div className=" flex flex-col gap-3 " >
                    <div className=" w-full h-[54px] flex rounded-full shadow-md border items-center justify-between px-4 " >
                        <Text className=" text-sm font-bold " >Charity Partner Name</Text>
                    </div>
                </div>
                {formik?.values?.fundRaiser?.organizations?.map((item: string, index: number) => {
                    return (
                        <div className=' w-full ' key={index} >
                            <OrganizationCardWithId index={item} name='fundRaiser.organizations' />
                        </div>
                    )
                })}
            </div>
            <div className=" mt-auto " >
                <CustomButton >Continue</CustomButton>
            </div>
        </form>
    )
}