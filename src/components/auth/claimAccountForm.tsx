import { Text } from "@radix-ui/themes";
import { CustomInput, CustomButton } from "../shared"; 
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ClaimAccountForm() {

    const router = useNavigate()

    const { claimHookForm } = useAuth()

    return claimHookForm (
        <div className=' w-full bg-white p-7 rounded-[30px] gap-3 flex flex-col ' style={{boxShadow: "0px 5px 10px 0px #00000040"}} >
            <div className=" flex w-full flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Email*</Text>
                <CustomInput name="email" type="email" placeholder="Email Address*" />
            </div>
            <div className=" flex w-full flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Password*</Text>
                <CustomInput name="password" type="password" placeholder="Password*" isPassword={true} />
            </div>
            <CustomButton onClick={()=> router("/dashboard")} hasIcon={true} >
                Claim Account
            </CustomButton>
            <Text className=" text-sm font-medium text-primary text-center " >Already have an account? <span role="button" style={{ fontWeight: "bold" }} onClick={()=> router("/login")} >Log In</span></Text>
        </div>
    )
}
