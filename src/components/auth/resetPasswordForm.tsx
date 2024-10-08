import { Text } from '@radix-ui/themes' 
import { CustomButton, CustomInput } from '../shared'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function ResetPasswordForm() {

    const router = useNavigate()

    const { requestCodeForm, requestCodeLoading } = useAuth()

    return requestCodeForm (
        <div className=' w-full bg-white p-7 rounded-[30px] gap-3 flex flex-col ' style={{ boxShadow: "0px 5px 10px 0px #00000040" }} >
            <div className=" flex w-full flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Email*</Text>
                <CustomInput name="email" type="email" placeholder="Email Address*" />
            </div>
            <CustomButton loading={requestCodeLoading}  type="submit" hasIcon={true} >
                Reset Password
            </CustomButton>
            <Text className=" text-sm font-medium text-primary text-center " >Already have an account? <span onClick={()=> router("/login")} role="button" style={{ fontWeight: "bold" }} >Log In</span></Text>
        </div>
    )
}
