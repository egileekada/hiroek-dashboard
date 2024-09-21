import { Text } from '@radix-ui/themes' 
import { CustomButton, CustomInput } from '../shared'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function ChangePasswordForm() {

    const router = useNavigate()

    const { resetPasswordForm, resetValue } = useAuth() 

    console.log(resetValue); 

    return resetPasswordForm (
        <div className=' w-full bg-white p-7 rounded-[30px] gap-3 flex flex-col ' style={{boxShadow: "0px 5px 10px 0px #00000040"}} >
           <div className=" flex w-full flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Email*</Text>
                <CustomInput name="email" type="email" placeholder="Enter Email*" />
            </div>
            <div className=" flex w-full flex-col gap-1 text-primary" >
                <Text className=" text-primary font-semibold text-sm " >Password*</Text>
                <CustomInput name="password" type="password" placeholder="New Password*" isPassword={true} />
            </div>
            <div className=" flex w-full flex-col gap-1 text-primary" >
                <Text className="  font-semibold text-sm " >Confirm Password*</Text>
                <CustomInput name="confirmpassword" type="password" placeholder="Confirm New Password*" isPassword={true} />
            </div>
            <CustomButton type="submit" hasIcon={true} >
                Create New Password
            </CustomButton>
            <Text className=" text-sm font-medium text-primary text-center " >Already have an account? <span role="button" style={{ fontWeight: "bold" }} onClick={()=> router("/")} >Log In</span></Text>
        </div>
    )
}
