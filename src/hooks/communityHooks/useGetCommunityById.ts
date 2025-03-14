
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react"; 
import { ICommunity } from "../../model/community";
import { useParams } from "react-router-dom";

const useGetCommunityById = () => {

    const [data, setData] = useState({} as ICommunity)
    const { id } = useParams();


    // react query
    const { isLoading, isRefetching } = useQuery(
        ["communities-by-id", id],
        () => httpService.get(`/communities/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                // console.log(error);
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.community)
            }
        },
    );

    return {
        isLoading,
        isRefetching,
        data
    };
}

export default useGetCommunityById