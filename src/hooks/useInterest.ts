
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import { IInterest } from "../model/interest";

interface IProps {
    value: string,
    label: string
}

const useInterest = () => {

    // const router = useNavigate();  

    const [data, setData] = useState<Array<IProps>>([])

    // react query
    const { isLoading } = useQuery(
        ["interests"],
        () => httpService.get(`/users/interests`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => { 

                const flavorOptions = data?.data?.interests?.data.map((flavor: IInterest) => ({
                    value: flavor?._id,
                    label: (flavor?.name)
                })); 

                setData(flavorOptions)
            },
        },
    );

    return {
        isLoading,
        data
    };
}

export default useInterest