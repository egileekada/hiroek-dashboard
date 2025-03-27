
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import Cookies from "js-cookie"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
    ownerType: string,
    balance: number,
    _id: string,
    owner: string,
    createdAt: string,
    updatedAt: string, 
}

const useBankBal = () => {

    const [data, setData] = useState({} as IProps)

    const navigate = useNavigate()

    const userId = Cookies.get("user-index")

    // react query
    const { isLoading, isError } = useQuery(
        ["BankBal", userId],
        () => httpService.get(`/organizations/get-wallet/${userId}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                navigate("/")
                console.log(error);
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.wallet)
            },
        },
    );

    return {
        isLoading,
        data,
        isError
    };
}

export default useBankBal