
import PageHeader from '../components/shared/pageHeader'
// import { CustomButton } from '../components/shared'
// import { EventIcon } from '../svg' 
import { ProfileForm } from '../components/profile'
import { SettingIcon } from '../svg'
import { useNavigate } from 'react-router-dom'
// import useProfile from '../hooks/useProfile'

export default function ProfileInfoPage() { 

    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between relative " >
                <PageHeader back={true} header="Update Your Profile" body="Update your organisation's profile to enhance your experience." />
                <div role='button' onClick={()=> router("/dashboard/settings")} className=" w-fit flex absolute right-4 top-3 ">
                    <SettingIcon />
                </div>
            </div>
            <ProfileForm />
        </div>
    )
}
