
import PageHeader from '../components/shared/pageHeader'
import { CustomButton } from '../components/shared'
import { EventIcon } from '../svg' 
import { ProfileForm } from '../components/profile'
import useProfile from '../hooks/useProfile'

export default function ProfileInfoPage() { 

    const { profileForm, isLoading, loadingProfile } = useProfile()

    return profileForm(
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header="Update Your Profile" body="Effortless Event Creation and Community Engagement." />
                <div className=" w-fit hidden lg:flex ">
                    <CustomButton loading={isLoading || loadingProfile} hasFrontIcon={true} icon={
                        <EventIcon />
                    } >
                        Update Profile
                    </CustomButton>
                </div>
            </div>
            <ProfileForm />
        </div>
    )
}
