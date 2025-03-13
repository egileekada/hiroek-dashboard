
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ICommunity } from "../../model/community";
import { IMember, IUser } from "../../model/user";

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

export interface IComment {
    "likes": Array<string>,
    "replies": Array<{
        "likes": Array<string>,
        "replies": Array<string>,
        "_id": string,
        "user": string,
        "post": string,
        "content": string,
        "createdAt": string,
        "updatedAt": string
    }>,
    "_id": string,
    "user": IMember,
    "post": string,
    "content": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

const useGetCommunityPost = () => {

    const [data, setData] = useState<Array<IPost>>()
    const { id } = useParams();

    // react query
    const { isLoading, isRefetching } = useQuery(
        ["post-communities"],
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