
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react"; 
import { ICommunity } from "../../model/community";
import { useParams } from "react-router-dom";
import { useCommunityData } from "../../global-state/useCommunityDetails";

const useGetCommunityById = (index?: string) => {

    const [data, setData] = useState({} as ICommunity)
    const { id } = useParams();

    const { updateCommunity } = useCommunityData((state)=> state)

    // react query
    const { isLoading, isRefetching } = useQuery(
        ["communities-by-id", index ?? id],
        () => httpService.get(`/communities/${index ?? id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                // console.log(error);
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.community)
                updateCommunity({
                    admin: data?.data?.community?.admin,
                    adminType: data?.data?.community?.adminType,
                    createdAt: data?.data?.community?.createdAt,
                    description: data?.data?.community?.description,
                    interests: data?.data?.community?.interests,
                    invitees: data?.data?.community?.invitees,
                    members: data?.data?.community?.members,
                    moderators: data?.data?.community?.moderators,
                    name: data?.data?.community?.name,
                    photo: data?.data?.community?.photo,
                    privacy: data?.data?.community?.privacy,
                    updatedAt: data?.data?.community?.updatedAt,
                    _id: data?.data?.community?._id
                })
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