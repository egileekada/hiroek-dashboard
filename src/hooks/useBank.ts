
import { useMutation, useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
import { BankValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import axios from "axios";
import { useDetails } from "../global-state/useUserDetails";

const useBank = () => {

    // const router = useNavigate(); 
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
            // router("/dashboard")
        },
    });

    const { renderForm: bankForm, values, setValue } = useForm({
        defaultValues: {
            bankAccountName: bankAccountName,
            bankAccountNumber: bankAccountNumber,
            bankName: bankName,
            sortCode: "",
        },
        validationSchema: BankValidation,
        submit: (data: any) => mutate(data)
    });

    console.log(bankAccountName+" heel" );
    

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
                console.log(data?.data?.data);
                
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
        setValue
    };
}

export default useBank