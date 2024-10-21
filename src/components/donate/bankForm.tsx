import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import useBank from "../../hooks/useBank";  

export default function BankForm() {

    const { bankForm, loadingBank } = useBank()  

    return bankForm(
        <div className=" w-full flex flex-col gap-4 pb-6 " >
            <div className=" w-full p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  > 
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Account Holder Name*</Text>
                    <CustomInput name="bankAccountName" type="text" placeholder="Enter Account Name" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Bank Name*</Text> 
                    <CustomInput name="bankName" type="text" placeholder="Enter Bank Name" />
                    {/* <SelectBankType value={values?.bankName ?? "Select Bank"} setValue={changeHandler} options={bankInfoData} />  */}
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Account Number*</Text>
                    <CustomInput name="bankAccountNumber" type="text" placeholder="Enter Account No." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Sort Code*</Text>
                    <CustomInput name="sortCode" type="text" placeholder="Enter Sort Code" />
                </div> 
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Pin*</Text>
                    <CustomInput name="pin" type="text" placeholder="Enter Sort Code" />
                </div> 
                <div className=" flex w-full mt-4 flex-col gap-1 " >
                    <CustomButton loading={loadingBank} type="submit" >
                        Save Bank Account
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

