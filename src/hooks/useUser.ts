
import {  useQuery } from "react-query"; 
import toast from "react-hot-toast";
import { useDetails } from "../global-state/useUserDetails";
import httpService from "../utils/httpService";
import Cookies from "js-cookie"
import { useState } from "react";
import { IUser } from "../model/user";

const useUser = () => {

    // const router = useNavigate(); 
    const { email } = useDetails((state) => state);  

    const [data, setData] = useState({} as IUser)

    const userId = Cookies.get("user-index")

    // react query
    const { isLoading } = useQuery(
        ["user", userId],
        () => httpService.get(`/organizations/${userId}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {  
                setData(data?.data?.organization)
            },
            enabled: email ? false : true
        },
    );

    return { 
        isLoading,
        data
    };
}

export default useUser