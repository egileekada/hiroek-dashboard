import { useEffect } from "react"; 
import { CustomButton } from "../shared";
import ModalLayout from "../shared/modalLayout";
import { Text } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router-dom"; 


export default function CreateEventBtn({ loading, submit, open, setOpen, isSuccess }: { loading?: boolean, open: boolean, setOpen: any, submit: any, isSuccess: boolean}) {
 
    const history = useLocation() 
 
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard/event")
        }
    }, [isSuccess]) 

    return (
        <div>
            <CustomButton className=" items-center " width="100%" type="submit" hasIcon={true} >
                {history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"}
            </CustomButton>
            <ModalLayout onIcon={true} width={" max-w-[361px] "} rounded="44px" open={open} setOpen={setOpen} > 
                <div className=" w-full flex flex-col gap-2 items-center pb-4 " >
                    <Text className=" text-lg font-bold text-primary " >{history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"}</Text>
                    <Text className=" text-primary text-opacity-50 text-xs mb-4 " >{history?.pathname?.includes("edit") ? "Are you sure you want to edit this event?" : "Are you sure you want to create this new event?"}</Text>
                    <CustomButton type="button" onClick={submit} loading={loading} width="200px" rounded="999px" >Yes, Proceed</CustomButton>
                    <CustomButton onClick={() => setOpen(false)} color="#CC1B1B" width="200px" bgColor="white" rounded="999px" >Cancel</CustomButton>
                </div>
            </ModalLayout>
        </div>
    )
}
