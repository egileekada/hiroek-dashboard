
import { useMutation, useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
import { BankValidation, BankPinValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import axios from "axios";
import { useDetails } from "../global-state/useUserDetails";
import { useNavigate } from "react-router-dom";

const useBank = () => {

    const router = useNavigate(); 
    const { bankAccountName, bankAccountNumber, bankName } = useDetails((state) => state);

    const [bankInfoData, setData] = useState([] as any);

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.patch(`/organizations/update-bank-details`, data),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            toast.success("Update Successful") 
        },
    });
 
    const { mutate: pinMutate, isLoading: loadingPin } = useMutation({
        mutationFn: (data: any) => httpService.patch(`/organizations/update-pin`, data),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            toast.success("Update Successful") 
            router("/dashboard/donation")
        },
    });

    const { renderForm: bankForm, values, setValue, control } = useForm({
        defaultValues: {
            bankAccountName: bankAccountName,
            bankAccountNumber: bankAccountNumber,
            bankName: bankName,
            sortCode: "",
            pin: ""
        },
        validationSchema: BankValidation,
        submit: (data: any) => mutate(data)
    }); 

    const { renderForm: PinForm, setValue: setPinValue} = useForm({
        defaultValues: {
            oldPin: "",
            newPin: ""
        },
        validationSchema: BankPinValidation,
        submit: (data: any) => pinMutate(data)
    }); 
    
    

    // react query
    const { isLoading: loadingBank } = useQuery(
        ["my-bank-list"],
        () => axios.get("https://api.paystack.co/bank"),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data) => {
                setData(data?.data?.data);   
            },
        },
    );

    return {
        bankForm,
        isLoading,
        isSuccess,
        values,
        loadingBank,
        bankInfoData,
        setValue,
        setPinValue,
        PinForm,
        loadingPin,
        control
    };
}

export default useBank