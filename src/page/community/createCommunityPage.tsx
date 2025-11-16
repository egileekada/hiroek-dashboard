import { useLocation } from 'react-router-dom'
import { CommunityForm } from '../../components/community'
import PageHeader from '../../components/shared/pageHeader'
import useCommunity from '../../hooks/communityHooks/useCommunity'
import useGetCommunityById from '../../hooks/communityHooks/useGetCommunityById'
import CommunityFormEdit from '../../components/community/communityFormEdit'
import LoadingAnimation from '../../components/shared/loadingAnimation'
import { CustomButton } from '../../components/shared'
import { FormikProvider } from 'formik'
import { useEffect } from 'react'

export default function CreateCommunityPage() {

    const { formik, isLoading, loadingEdit } = useCommunity()
    const history = useLocation()

    const { data, isLoading: loading } = useGetCommunityById()

    useEffect(() => {
        if (history?.pathname.includes("edit") && data) {
            formik.setFieldValue("name", data?.name)
            formik.setFieldValue("description", data?.description)
        }
    }, [data])

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=' w-full flex flex-col gap-6 ' >
                <div className=" w-full flex items-center justify-between " >
                    <PageHeader second={true} back={true} header={!history?.pathname.includes("edit") ? "Create New Channel" : "Edit Channel"} body="" />
                    {history?.pathname.includes("edit") && (
                        <div className=" w-[170px] lg:flex hidden" >
                            <CustomButton height='45px' loading={loadingEdit} className=" px-3 " width="100%" type="submit" >
                                Edit Channel
                            </CustomButton>
                        </div>
                    )}
                </div>
                {!history?.pathname.includes("edit") && (
                    <CommunityForm isLoading={isLoading} />
                )}
                {history?.pathname.includes("edit") && (
                    <LoadingAnimation loading={loading} >
                        <CommunityFormEdit defaultdata={data} isLoading={loadingEdit} />
                    </LoadingAnimation>
                )}
            </form>
        </FormikProvider>
    )
}