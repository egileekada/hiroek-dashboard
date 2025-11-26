import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useParams } from "react-router-dom";
import { IMember } from "../../model/user";
import { IComment, IPost } from "./useGetCommunityPost";

const useGetMembers = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const handleError = (error: any) => {
    const message =
      error?.response?.data?.error?.details?.message ||
      error?.response?.data ||
      error?.message ||
      "Something went wrong";

    toast.error(message);
  };

  // ---------------------------------------------
  // GET COMMENTS
  // ---------------------------------------------
  const getPostCommentsData = () => {
    const { data, isLoading } = useQuery(
      ["comments", id],
      async () => {
        const res = await httpService.get(`/posts/${id}/comments`);
        return res?.data?.comments?.data as Array<IComment>;
      },
      {
        onError: handleError,
      }
    );

    return {
      data: data ?? [],
      isLoading,
    };
  };

  // ---------------------------------------------
  // GET SINGLE POST
  // ---------------------------------------------
  const getSinglePostData = (index?: string) => {
    const postId = index || id;

    const { data, isLoading } = useQuery(
      ["single-post", postId],
      async () => {
        const res = await httpService.get(`/posts/${postId}`);
        return res?.data?.post as IPost;
      },
      {
        onError: handleError,
      }
    );

    return {
      data: data ?? ({} as IPost),
      isLoading,
    };
  };

  // ---------------------------------------------
  // GET MEMBERS
  // ---------------------------------------------
  const getMemberData = () => {
    const { data, isLoading } = useQuery(
      ["members", id],
      async () => {
        const res = await httpService.get(`/communities/${id}/members`);
        return res?.data?.members?.data as Array<IMember>;
      },
      {
        onError: handleError,
      }
    );

    return {
      data: data ?? [],
      isLoading,
    };
  };

  // ---------------------------------------------
  // GET MODERATORS
  // ---------------------------------------------
  const getModeratorData = () => {
    const { data, isLoading } = useQuery(
      ["moderators", id],
      async () => {
        const res = await httpService.get(`/communities/get-moderators/${id}`);
        return res?.data as Array<IMember>;
      },
      {
        onError: handleError,
      }
    );

    return {
      data: data ?? [],
      isLoading,
    };
  };

  // ---------------------------------------------
  // ADD MODERATOR
  // ---------------------------------------------
  const addModerator = useMutation({
    mutationFn: (payload: { memberId: string }) =>
      httpService.post(`/organizations/add-community-moderator/${id}`, {
        members: [payload.memberId],
      }),

    onError: handleError,

    onSuccess: () => {
      queryClient.invalidateQueries(["moderators", id]);
      queryClient.invalidateQueries(["members", id]);
      toast.success("Added Moderator");
    },
  });

  // ---------------------------------------------
  // REMOVE MODERATOR
  // ---------------------------------------------
  const removeModerator = useMutation({
    mutationFn: (payload: { memberId: string }) =>
      httpService.post(`/organizations/remove-community-moderator/${id}`, {
        moderatorId: payload.memberId,
      }),

    onError: handleError,

    onSuccess: () => {
      queryClient.invalidateQueries(["moderators", id]);
      queryClient.invalidateQueries(["members", id]);
      toast.success("Removed Moderator");
    },
  });

  return {
    getMemberData,
    getModeratorData,
    getPostCommentsData,
    getSinglePostData,
    addModerator,
    removeModerator,
  };
};

export default useGetMembers;
