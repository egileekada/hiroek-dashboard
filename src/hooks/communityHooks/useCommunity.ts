
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";
import { CommunityValidation } from "../../services/validation";
import { useForm } from "../useForm";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useImage } from "../../global-state/useImageData";
import { useLocation, useNavigate } from "react-router-dom";
import { useInterest } from "../../global-state/useInterestData";

const useCommunity = () => {

    // const router = useNavigate(); 
    const { eventImage } = useImage((state) => state)
    const history = useLocation()
    const router = useNavigate();
    const { interest: interestData } = useInterest((state) => state)

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-community`, data, {
            headers: { 'Content-Type': eventImage.type ?? "" }
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast.success("Created Event Successfully")
            router("/dashboard/community")
        },
    });


    const { renderForm: communityHookForm, values, setValue, formState } = useForm({
        defaultValues: {
            name: "",
            description: "",
            privacy: "public",
        },
        validationSchema: CommunityValidation,
        submit: (data: any) => {

            const formData = new FormData()

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else {
                formData.append("name", data?.name)
                formData.append("description", data?.description)
                formData.append("privacy", data?.privacy)
                {
                    interestData?.map((item) => {
                        formData.append("interests[]", item?.value)
                    })
                }
                if (eventImage) {
                    formData.append("photo", eventImage)
                }
                mutate(formData)
            }
        }
    });

    return {
        communityHookForm,
        isLoading,
        isSuccess,
        values,
        setValue,
        formState
    };
}

export default useCommunity