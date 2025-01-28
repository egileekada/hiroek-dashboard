
import { useMutation } from "react-query";
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

    const [content, setContent] = useState("")

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
        onSuccess: (data) => {
            toast.success("Created Post Successfully")
            // router("/dashboard/community") 
            if(index) {

            console.log("worked");
                createAnnocement(data?.data?.post?._id)
            } else {
                router("/dashboard/community/details/"+id)
            }

        },
    });



    const { mutate: createAnnocement, isLoading: loadingCreateAnnocement } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/posts/${data}/make-announcement`, {}),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            router("/dashboard/community/details/"+id)
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
            if (images?.length > 0) {
                images?.map((item) => (
                    formData.append("attachments[]", item)
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
        postformState
    };
}

export default useCommunity