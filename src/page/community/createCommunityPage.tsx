import { useLocation } from 'react-router-dom'
import { CommunityForm } from '../../components/community'
import PageHeader from '../../components/shared/pageHeader'
import useCommunity from '../../hooks/communityHooks/useCommunity'
import useGetCommunityById from '../../hooks/communityHooks/useGetCommunityById'
import CommunityFormEdit from '../../components/community/communityFormEdit'
import LoadingAnimation from '../../components/shared/loadingAnimation'
import { CustomButton } from '../../components/shared'

export default function CreateCommunityPage() {

    const { communityHookForm, setValue, values, isLoading, loadingEdit } = useCommunity()
    const history = useLocation()

    const { data, isLoading: loading } = useGetCommunityById()

    return communityHookForm(
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader second={true} back={true} header={!history?.pathname.includes("edit") ? "Create New Community" : "Edit Community"} body="" />
                {history?.pathname.includes("edit") && (
                    <div className=" w-[170px] lg:flex hidden" >
                        <CustomButton height='45px' loading={loadingEdit} className=" px-3 " width="100%" type="submit" >
                            Edit Community
                        </CustomButton>
                    </div>
                )}
            </div>
            {!history?.pathname.includes("edit") && (
                <CommunityForm values={values} setValue={setValue} isLoading={isLoading} />
            )}
            <LoadingAnimation loading={loading} >
                {history?.pathname.includes("edit") && (
                    <CommunityFormEdit defaultdata={data} values={values} setValue={setValue} isLoading={loadingEdit} />
                )}
            </LoadingAnimation>
        </div>
    )
}