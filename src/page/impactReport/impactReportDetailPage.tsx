import { useNavigate } from "react-router-dom";
import { ReportDetail } from "../../components/report";
import { CustomButton } from "../../components/shared";
import PageHeader from "../../components/shared/pageHeader";
import { EditIcon } from "../../svg";


export default function ImpactReportDetailPage() {

    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header="Impact Report Details" body="Effortless Event Creation and Community Engagement." />
                <div className=" w-fit lg:block hidden ">
                    <CustomButton className=" px-3 " onClick={() => router("/dashboard/report/post")} hasFrontIcon={true} icon={
                        <EditIcon />
                    } >
                        Edit Impact Details
                    </CustomButton>
                </div>
            </div>
            <ReportDetail /> 
        </div>
    )
}
