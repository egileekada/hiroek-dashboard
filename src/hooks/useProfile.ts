
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";
import { ProfileValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useDetails } from "../global-state/useUserDetails";
import { useState } from "react";
import Cookies from "js-cookie"
import { useImage } from "../global-state/useImageData";

const useProfile = () => {

    const { name, charityRegNumber, description, logo, setAll } = useDetails((state) => state);
    const { image: imageFile, updateImage } = useImage((state) => state)

    const [image, setImage] = useState('');

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.patch(`/organizations/edit-details`, data, {
            headers: { 'Content-Type': "" }
        }),
        onError: (error: any) => {

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            Cookies.set("user-info", JSON.stringify(data?.data?.organization))
            setAll(data?.data?.organization)
            toast.success("Update Successful")
            // router("/dashboard")
        },
    });

    const { mutate: mutateWithImage, isLoading: loadingProfile } = useMutation({
        mutationFn: (data: any) => httpService.patch(`/organizations/edit-details`, data, {
            headers: { 'Content-Type': imageFile.type }
        }),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            console.log(data);

            Cookies.set("user-info", JSON.stringify(data?.data?.organization))
            toast.success("Update Successful")
            updateImage(null)
            // router("/dashboard")
        },
    });

    const { renderForm: profileForm, values, setValue } = useForm({
        defaultValues: {
            name: name,
            charityRegNumber: charityRegNumber,
            // interests: interests,
            description: description
        },
        validationSchema: ProfileValidation,
        submit: async (data: any) => {
            const formData = new FormData()
            console.log(image);
            if (!logo && !imageFile) {
                toast.error("Add Logo")
            } else {
                formData.append("name", data?.name ?? name)
                formData.append("charityRegNumber", data?.charityRegNumber ?? charityRegNumber)
                formData.append("description", data?.description ?? description)
                if (imageFile) {
                    formData.append("logo", imageFile)
                    mutateWithImage(formData)
                } else {
                    mutate(formData)
                }
            }
        }
    });


    return {
        profileForm,
        isLoading,
        isSuccess,
        loadingProfile,
        image,
        values,
        setImage,
        setValue
    };
}

export default useProfile