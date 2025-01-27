
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ICommunity } from "../../model/community";
import { IUser } from "../../model/user";

interface IProps {
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

const useGetCommunityPost = () => {

    const [data, setData] = useState<Array<IProps>>()
    const { id } = useParams();

    // react query
    const { isLoading, isRefetching } = useQuery(
        ["hosted-communities"],
        () => httpService.get(`/posts/community/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                // console.log(error);
            },
            onSuccess: (data: any) => {
                setData(data?.data?.posts?.data);
            }
        },
    );

    return {
        isLoading,
        isRefetching,
        data
    };
}

export default useGetCommunityPost