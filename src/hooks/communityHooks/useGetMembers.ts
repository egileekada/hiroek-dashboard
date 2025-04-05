import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import httpService from "../../utils/httpService";
import { useParams } from "react-router-dom";
import { IMember } from "../../model/user";
import { IComment, IPost } from "./useGetCommunityPost";


const useGetMembers = () => {

    const { id } = useParams();

    const query = useQueryClient() 


    const getPostCommentsData = () => {
        const [data, setData] = useState<Array<IComment>>([])
        const { isLoading } = useQuery(
            ["comments", id],
            () => httpService.get(`/posts/${id}/comments`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    console.log(data?.data?.comments?.data);
                    
                    setData(data?.data?.comments?.data); 
                },
            },
        );
        return {
            data,
            isLoading
        }
    }

    const getSinglePostData = (index?: string) => {
        const [data, setData] = useState<IPost>({} as IPost)
        const { isLoading } = useQuery(
            ["postssingle", index ? index : id],
            () => httpService.get(`/posts/${index ? index : id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.post); 
                    
                },
            },
        );
        return {
            data,
            isLoading
        }
    }


    const getMemberData = () => {
        const [data, setData] = useState<Array<IMember>>([])
        const { isLoading } = useQuery(
            ["Members"],
            () => httpService.get(`/communities/${id}/members`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.members?.data)
                },
            },
        );
        return {
            data,
            isLoading
        }
    }

    const getModeratorData = () => {
        const [data, setData] = useState<Array<IMember>>([])
        const { isLoading } = useQuery(
            ["Moderators"],
            () => httpService.get(`/communities/get-moderators/${id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data)
                },
            },
        );
        return {
            data,
            isLoading,
            getModeratorData
        }
    }


    const addModerator = useMutation({
        mutationFn: (data: { 
            memberId: string
        }) => httpService.post(`/organizations/add-community-moderator/${id}`, {
            "members": [
                data?.memberId
            ]
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            query?.invalidateQueries("Moderators")
            query?.invalidateQueries("Members")
            toast?.success("Added Moderator")

        },
    });


    const removeModerator = useMutation({
        mutationFn: (data: { 
            memberId: string
        }) => httpService.post(`/organizations/remove-community-moderator/${id}`, {
            "moderatorId": data?.memberId 
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            query?.invalidateQueries("Moderators")
            query?.invalidateQueries("Members") 
            toast?.success("Removed Moderator")

        },
    });


    return {
        getMemberData,
        getModeratorData,
        getPostCommentsData,
        getSinglePostData,
        addModerator,
        removeModerator
    };
}

export default useGetMembers