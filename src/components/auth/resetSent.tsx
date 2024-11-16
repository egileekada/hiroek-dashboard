import { Text } from '@radix-ui/themes'
import { CustomButton } from '../shared'
import { useNavigate } from 'react-router-dom'

export default function ResetSent() {

    const navigate = useNavigate()

    return (
        <div className=' w-full bg-white py-7 lg:px-4 rounded-[30px] gap-3 flex flex-col ' >
            <img className=' w-[361px] ' src="/images/space.gif" alt='space' />
            <Text className=" font-extrabold text-primary leading=[23.4px] text-lg text-center mb-6 " >A link to reset your password has been sent to your email. Please check your inbox and follow the instructions to complete the process.</Text>
            <div className=' w-full lg:block hidden ' >
                <CustomButton onClick={() => navigate("/login")} type="button" >
                    Login
                </CustomButton>
            </div>
        </div>
    )
}
