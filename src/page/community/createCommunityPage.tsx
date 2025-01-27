import { CommunityForm } from '../../components/community' 
import PageHeader from '../../components/shared/pageHeader'
import useCommunity from '../../hooks/communityHooks/useCommunity' 

export default function CreateCommunityPage() {

    const { communityHookForm, setValue, values, isLoading } = useCommunity() 
    
    return communityHookForm (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader second={true} back={true} header="Create New Community" body="" /> 
            </div>
            <CommunityForm values={values} setValue={setValue} isLoading={isLoading} />
        </div>
    )
}