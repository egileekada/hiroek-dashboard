import { Checkbox, Text } from '@radix-ui/themes'
import { CustomButton, CustomInput } from '../shared'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {

    const router = useNavigate()

    return (
        <div className=' w-full bg-white p-7 rounded-[30px] gap-3 flex flex-col ' style={{ boxShadow: "0px 5px 10px 0px #00000040" }} >
            <div className=" flex w-full flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Email*</Text>
                <CustomInput name="email" type="email" placeholder="Email Address*" />
            </div>
            <div className=" flex w-full flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Password*</Text>
                <CustomInput name="password" type="password" placeholder="Password*" isPassword={true} />
            </div>
            <div className=' flex gap-1 ' >
                <div className=' mt-[3px]' >
                    <Checkbox />
                </div>
                <div className=' flex flex-col  ' >
                    <Text className=' font-bold text-sm leading-[14px] text-primary ' >Remember Me</Text>
                    <Text className=' font-medium -mt-1 text-sm text-[#37137F80] ' >Save my login details for next time.</Text>
                </div>
            </div>
            <CustomButton onClick={()=> router("/dashboard")}  hasIcon={true} >
                Log In
            </CustomButton>
            <Text onClick={()=> router("/reset-password")} role='button' className=" text-sm font-black text-primary text-center " >Forgot Password?</Text>
        </div>
    )
}