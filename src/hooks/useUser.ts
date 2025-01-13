
import {  useQuery } from "react-query"; 
import toast from "react-hot-toast";
import { useDetails } from "../global-state/useUserDetails";
import httpService from "../utils/httpService";
import Cookies from "js-cookie"
import { useState } from "react";
import { IUser } from "../model/user"; 
import { useNavigate } from "react-router-dom";

const useUser = () => { 

    const { email } = useDetails((state) => state);  

    const [data, setData] = useState({} as IUser)

    const navigate = useNavigate()

    const userId = Cookies.get("user-index")

    // react query
    const { isLoading, isError } = useQuery(
        ["user", userId],
        () => httpService.get(`/organizations/${userId}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                navigate("/")
                console.log(error);
            },
            onSuccess: (data: any) => {  
                setData(data?.data?.organization)
            },
            enabled: email ? false : true
        },
    ); 

    return { 
        isLoading,
        data,
        isError
    };
}

export default useUser