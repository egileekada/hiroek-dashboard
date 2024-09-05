
import { useMutation } from "react-query";  
// import { useNavigate } from "react-router-dom";
import { ProfileValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";

const useProfile = () => {
 
    // const router = useNavigate(); 

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/edit-details`, data),
        onError: (error: any) => { 
            console.log(error?.response?.data?.error?.details?.message);
            
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            console.log(data);
            
            toast.success("Updat Successful")
            // router("/dashboard")
        },
    }); 
  
    const { renderForm: profileForm, values } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validationSchema: ProfileValidation,
        submit: (data: any) => mutate(data)
    });

    return { 
        profileForm,
        isLoading,
        isSuccess,
        values
    };
}

export default useProfile