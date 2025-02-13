import { HeartColorlessIcon, HeartIcon } from '../../svg'
import { Spinner, Text } from '@radix-ui/themes'
import { IComment } from '../../hooks/communityHooks/useGetCommunityPost'
import useCommunity from '../../hooks/communityHooks/useCommunity'
import { useDetails } from '../../global-state/useUserDetails'
import { useState } from 'react'

export default function LikeCommentBtn({ item }: { item: IComment }) {
    const { likeChannelComment, unLikeChannelComment } = useCommunity()
    const [currentId, setCurrentId] = useState("") 
    
    const clickHandler = () => {
        setCurrentId(item?._id)
        if (item?.likes?.includes(userId + "")) {
            unLikeChannelComment?.mutate(item?._id)
        } else {
            likeChannelComment?.mutate(item?._id)
        }
    }

    const { userId } = useDetails((state) => state); 

    return (
        <>
            {(unLikeChannelComment?.isLoading || likeChannelComment?.isLoading && currentId === item?._id) && (
                <Spinner size={"2"} className=' text-primary ' />
            )}
            {(!unLikeChannelComment?.isLoading && !likeChannelComment?.isLoading) &&
                <div onClick={clickHandler} role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                    {item?.likes?.includes(userId + "") ? (
                        <HeartIcon size="24px" />
                    ) : (
                        <HeartColorlessIcon size="24px" />
                    )}
                    <Text className=" font-black text-xs " >{item?.likes?.length}</Text>
                </div>
            }
        </>
    )
}
