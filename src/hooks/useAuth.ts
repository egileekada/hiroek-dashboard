
import { useMutation } from "react-query";
import { unsecureHttpService } from "../utils/httpService";  
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestCodeValidation, resetPasswordValidation, signInValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import { ILogin, IResetPassword, IResetRequest } from "../model/auth";
import Cookies from "js-cookie" 

const useAuth = () => {
 
    const router = useNavigate();     
    const [searchParams] = useSearchParams();
  
    const resetCode = searchParams.get('resetCode');
    const email = searchParams.get('email'); 

    const { mutate: signIn, isLoading: signInLoading, isSuccess: signInSuccess } = useMutation({
        mutationFn: (data: ILogin) => unsecureHttpService.post(`/organizations/login`, data),
        onError: (error: any) => { 
            console.log(error?.response?.data?.error?.details?.message);
            
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            
            Cookies.set("access_token", data?.data?.token)
            Cookies.set("user-index", data?.data?.organization?._id) 
            toast.success("Login Successful")
            router("/dashboard")
        },
    }); 

    const { mutate: requestCodeMutate, isLoading: requestCodeLoading, isSuccess: requestCodeSuccess } = useMutation({
        mutationFn: (data: any) => unsecureHttpService.post(`/organizations/password-reset-request`, data),
        onError: (error: any) => {  
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {  
            toast.success("Email Sent Successfully")
            router("/login")
        },
    });  

    const { mutate: resetPasswordMutate, isLoading: resetPasswordLoading, isSuccess: resetPasswordSuccess } = useMutation({
        mutationFn: (data: IResetPassword) => unsecureHttpService.post(`/organizations/password-reset`, data),
        onError: (error: any) => { 
            console.log(error?.response?.data?.error?.details?.message);
            
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            console.log(data);
            toast.success("Password Successfully Changed")
            router("/login")
        },
    });  
  
    const { renderForm, values } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validationSchema: signInValidation,
        submit: (data: ILogin) => signIn(data)
    });
  
    const { renderForm: claimHookForm, values: claimValue } = useForm({
        defaultValues: {
            email: ''
        },
        validationSchema: requestCodeValidation,
        submit: (data: any) => requestCodeMutate(data)
    });
  
    const { renderForm: requestCodeForm, values: requestValue } = useForm({
        defaultValues: {
            email: '', 
        },
        validationSchema: requestCodeValidation,
        submit: (data: IResetRequest) => requestCodeMutate(data)
    });
  
    const { renderForm: resetPasswordForm, values: resetValue } = useForm({
        defaultValues: {
            email: email,
            resetCode: resetCode,
            password: '',
            confirmpassword: '',
        },
        validationSchema: resetPasswordValidation,
        submit: (data: IResetPassword) => {
            if(data.confirmpassword === data?.password){
                resetPasswordMutate({
                    email: email+"",
                    password: data?.password,
                    resetCode: resetCode+"",
                })
            } else{ 
                toast.error("Incorrect Confirm Password")
            }
        }
    });

    return { 
        renderForm,
        signInLoading,
        signInSuccess,
        values,
        claimHookForm,
        claimValue,
        requestCodeForm,
        requestValue,
        resetPasswordForm,
        resetValue,
        requestCodeMutate,
        requestCodeLoading,
        requestCodeSuccess,
        resetPasswordMutate,
        resetPasswordLoading,
        resetPasswordSuccess, 
    };
}

export default useAuth