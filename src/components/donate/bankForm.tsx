import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";


export default function BankForm() {
    return (
        <div className=" w-full flex flex-col gap-4 pb-6 " >
            <div className=" w-full p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Charity Organization Name*</Text>
                    <CustomInput name="name" type="text" placeholder="Enter Charity Organization Name*" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Bank Name*</Text>
                    <CustomInput name="name" type="text" placeholder="Bank Name" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Account Name*</Text>
                    <CustomInput name="name" type="text" placeholder="Enter Account Name*" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Account Number*</Text>
                    <CustomInput name="name" type="text" placeholder="Enter Account No.*" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >SWIFT/BIC Code*</Text>
                    <CustomInput name="name" type="text" placeholder="Enter SWIFT/BIC Code*" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >IBAN*</Text>
                    <CustomInput name="name" type="text" placeholder="Enter IBAN*" />
                </div>
                <div className=" flex w-full mt-4 flex-col gap-1 " >
                    <CustomButton>
                        Save Bank Account
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}
