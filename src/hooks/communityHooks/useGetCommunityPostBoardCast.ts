
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ICommunity } from "../../model/community";
import { IUser } from "../../model/user";

export interface IPost {
    "userType": string,
    "attachments": Array<any>,
    "likes": Array<string>,
    "comments": Array<any>,
    "isAnnouncement": boolean,
    "_id": string,
    "content": string,
    "user": IUser,
    "community": ICommunity,
    "createdAt": string,
    "updatedAt": string,
}

const useGetCommunityPostBoardCast = () => {

    const [data, setData] = useState<Array<IPost>>()
    const { id } = useParams();

    // react query
    const { isLoading, isRefetching } = useQuery(
        ["post-announcements"],
        () => httpService.get(`/posts/community-announcements/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                // console.log(error);
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.announcements?.data);
            }
        },
    );

    return {
        isLoading,
        isRefetching,
        data
    };
}

export default useGetCommunityPostBoardCast