
import { useMutation, useQueryClient } from "react-query";
// import { useNavigate } from "react-router-dom";
import { CommunityPostValidation, CommunityValidation } from "../../services/validation";
import { useForm } from "../useForm";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useImage } from "../../global-state/useImageData";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

const useCommunity = () => {

    // const router = useNavigate(); 
    const { eventImage } = useImage((state) => state)
    const history = useLocation()
    const router = useNavigate();
    const [images, setImages] = useState<File[]>([]);
    const { id } = useParams();

    const query = useQueryClient()

    const [open, setOpen] = useState(false)
    const [openReport, setOpenReport] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openBroadcast, setOpenBroadcast] = useState(false)
    const [openPin, setOpenPin] = useState(false)

    const [reason, setReason] = useState("")

    const [content, setContent] = useState("")
    const [contentReply, setContentReply] = useState("")
    const [contentComment, setContentComment] = useState("")

    const [searchParams] = useSearchParams();
    const index = searchParams.get("tab");

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-community`, data, {
            headers: { 'Content-Type': eventImage.type ?? "" }
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast.success("Created Event Successfully")
            router("/dashboard/community")
        },
    });


    const { mutate: createPost, isLoading: loadingCreatePost } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-post`, data, {
            // headers: { 'Content-Type': images[0].type ?? "" }
        }),
        onError: (error: any) => {
            console.log(error);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast.success("Created Post Successfully")
            // router("/dashboard/community") 
            // if(index) { 
            //     createAnnocement(data?.data?.post?._id)
            // } else {
                router("/dashboard/community/details/"+id)
            // }

        },
    }); 

    const createAnnocementPost = useMutation({
        mutationFn: (postId: any) => httpService.post(`/organizations/posts/${postId}/make-announcement`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            setOpenBroadcast(false)
            toast?.success("successful")
        },
    });

    const { mutate: createAnnocement, isLoading: loadingCreateAnnocement } = useMutation({
        mutationFn: (postId: any) => httpService.post(`/organizations/posts/${postId}/make-announcement`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            router("/dashboard/community/details/"+id)
        },
    });

    const deleteChannelPost = useMutation({
        mutationFn: (postId: any) => httpService.delete(`/posts/${postId}`),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => {
            console.log(data);
            query.invalidateQueries("post-communities")
            setOpenDelete(false) 
            toast.success("post deleted successfully")
        },
    });


    const unLikeChannelPost = useMutation({
        mutationFn: (postId: any) => httpService.post(`/posts/${postId}/unlike`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            query?.invalidateQueries("post-communities") 
            query?.invalidateQueries("postssingle") 
            query?.invalidateQueries("comments")  
            
        },
    });


    const likeChannelPost = useMutation({
        mutationFn: (postId: any) => httpService.post(`/posts/${postId}/like`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            query?.invalidateQueries("post-communities") 
            query?.invalidateQueries("postssingle") 
            query?.invalidateQueries("comments")  
        },
    });


    const unLikeChannelComment = useMutation({
        mutationFn: (commentId: any) => httpService.post(`/posts/comments/${commentId}/unlike`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            query?.invalidateQueries("post-communities") 
            query?.invalidateQueries("postssingle") 
            query?.invalidateQueries("comments")  
        },
    });


    const likeChannelComment = useMutation({
        mutationFn: (commentId: any) => httpService.post(`/posts/comments/${commentId}/like`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            query?.invalidateQueries("post-communities") 
            query?.invalidateQueries("postssingle") 
            query?.invalidateQueries("comments")  
        },
    });

    const reportChannelPost = useMutation({
        mutationFn: (data: {
            postId: string,
            reason: string
        }) => httpService.post(`/posts/${data?.postId}/report`, {
            reason: data?.reason
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast?.success("successful")
            setOpenReport(false)
            setReason("")
        },
    });

    const replyChannelPost = useMutation({
        mutationFn: (data: {
            postId: string,
            content: string
        }) => httpService.post(`/posts/comments/${data?.postId}/reply`, {
            content: data?.content
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            query?.invalidateQueries("post-communities") 
            query?.invalidateQueries("postssingle") 
            query?.invalidateQueries("comments")  
            setContentReply("")
            
        },
    });



    const createCommentPost = useMutation({
        mutationFn: (data: {
            postId: string 
        }) => httpService.post(`/posts/${data?.postId}/comment`, {
            content: contentComment
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            query?.invalidateQueries("post-communities") 
            query?.invalidateQueries("postssingle") 
            query?.invalidateQueries("comments")  
            setContentComment("")
            
        },
    }); 

    const { renderForm: communityHookForm, values, setValue, formState } = useForm({
        defaultValues: {
            name: "",
            description: "",
            privacy: "public",
        },
        validationSchema: CommunityValidation,
        submit: (data: any) => {

            const formData = new FormData()

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else {
                formData.append("name", data?.name)
                formData.append("description", data?.description)
                formData.append("privacy", data?.privacy)
                if (eventImage) {
                    formData.append("photo", eventImage)
                }
                mutate(formData)
            }
        }
    });


    const { renderForm: postHookForm, values: postValues, setValue: setPostValue, formState: postformState } = useForm({
        defaultValues: {
            "content": "",
            "communityId": id
        },
        validationSchema: CommunityPostValidation,
        submit: (data: any) => {

            const formData = new FormData()
            formData.append("content", data?.content)
            if(index) {
                formData.append("isAnnouncement", "true")
            }
            formData.append("communityId", data?.communityId)
            if (images?.length > 0) {
                images?.map((item) => (
                    formData.append("attachment", item)
                ))
            }
            createPost(formData)
        }
    });

    const submit = ()=> {
        if(!content){
            toast.error("Add Content")
        } else {
            const formData = new FormData()
            formData.append("content", content)
            formData.append("communityId", id+"")
            if(index) {
                formData.append("isAnnouncement", "true")
            }
            if (images?.length > 0) {
                images?.map((item) => (
                    formData.append("attachment", item)
                ))
            }
            createPost(formData)
        }
    }

    return {
        communityHookForm,
        isLoading,
        isSuccess,
        values,
        setValue,
        formState,
        createPost,
        loadingCreatePost,
        createAnnocement,
        loadingCreateAnnocement,
        setPostValue,
        postValues,
        postHookForm,
        images,
        setImages,
        submit,
        content,
        setContent,
        postformState,
        deleteChannelPost,
        reportChannelPost,
        unLikeChannelPost,
        likeChannelPost,
        replyChannelPost,
        openBroadcast,
        openPin,
        openDelete,
        openReport,
        open,
        setOpen,
        setOpenBroadcast,
        setOpenDelete,
        setOpenPin,
        setOpenReport,
        reason, 
        setReason,
        createAnnocementPost,
        unLikeChannelComment,
        likeChannelComment,
        createCommentPost,
        setContentComment,
        contentComment,
        setContentReply,
        contentReply,
        index
    };
}

export default useCommunity