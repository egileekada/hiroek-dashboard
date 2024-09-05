
import { useMutation } from "react-query";  
// import { useNavigate } from "react-router-dom";
import { BankValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";

const useBank = () => {
 
    // const router = useNavigate(); 

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/update-bank-details`, data),
        onError: (error: any) => { 
            console.log(error?.response?.data?.error?.details?.message);
            
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            console.log(data);
            
            toast.success("Update Successful")
            // router("/dashboard")
        },
    }); 
  
    const { renderForm: bankForm, values } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validationSchema: BankValidation,
        submit: (data: any) => mutate(data)
    });

    return { 
        bankForm,
        isLoading,
        isSuccess,
        values
    };
}

export default useBank