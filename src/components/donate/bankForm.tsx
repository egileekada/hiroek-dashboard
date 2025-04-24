import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import useBank from "../../hooks/useBank";
import PinInput from "react-pin-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDetails } from "../../global-state/useUserDetails";

export default function BankForm() {

    const { bankForm, loadingBank, setValue, values } = useBank()
    const [searchParams] = useSearchParams();
    const index = searchParams.get("pin");
    const type = searchParams.get("type");

    const [sortCode, setSortCode] = useState("")

    const { bankAccountName, bankAccountNumber, bankName, sortCode: code } = useDetails((state) => state);

    const navigate = useNavigate()

    const clickHandler = () => {

        console.log(values);

        if (!values?.bankAccountName) {
            toast.error("Please Enter Bank Account Name")
        } else if (!values?.bankName) {
            toast.error("Please Enter Bank Name")
        } else if (!values?.bankAccountNumber) {
            toast.error("Please Enter Account Number")
        } else if (!sortCode) {
            toast.error("Please Enter Sort Code")
        } else {
            if (type) {
                navigate("/dashboard/donation/bankInfo?pin=true&type=change")
            } else {
                navigate("/dashboard/donation/bankInfo?pin=true")
            }
        }
    }

    console.log(code);
    

    useEffect(() => {
        if (!values?.bankAccountName) {
            setValue("bankAccountName", bankAccountName)
            setValue("bankAccountNumber", bankAccountNumber)
            setValue("bankName", bankName)
            setValue("sortCode", code)
            setSortCode(code)
            // changeHandler("address", defaultdata?.address)
            // changeHandler("address", defaultdata?.address)
        }
    }, [values])

    const SortHandler = (name: string, item: string) => {
        setValue(name, item)
        setSortCode(item)
    }

    return bankForm(
        <div className=" w-full flex flex-col gap-4 pb-6 " >
            {!index && (
                <div className=" w-full p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Account Holder Name*</Text>
                        <CustomInput value={values.bankAccountName ? values.bankAccountName : bankAccountName} edit={true} setValue={setValue} name="bankAccountName" type="text" placeholder="Enter Account Name" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Bank Name*</Text>
                        <CustomInput value={values.bankName ? values.bankName : bankName} edit={true} setValue={setValue} name="bankName" type="text" placeholder="Enter Bank Name" />
                        {/* <SelectBankType value={values?.bankName ?? "Select Bank"} setValue={changeHandler} options={bankInfoData} />  */}
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Account Number*</Text>
                        <CustomInput value={values.bankAccountNumber ? values.bankAccountNumber : bankAccountNumber} edit={true} setValue={setValue} name="bankAccountNumber" type="text" placeholder="Enter Account No." />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Sort Code*</Text>
                        <CustomInput value={values.sortCode ? values.sortCode : code} name="sortCode" edit={true} setValue={SortHandler} type="text" placeholder="Enter Sort Code" />
                    </div>
                    <div className=" flex w-full mt-4 flex-col gap-1 " >
                        <CustomButton onClick={clickHandler} type="button" >
                            Proceed
                        </CustomButton>
                    </div>
                </div>
            )}
            {index && (
                <div className=' w-full h-full flex justify-start ' >
                    <div className=" lg:px-0 px-4 flex flex-col gap-4  w-fit  ">
                        <div className=' flex flex-col gap-1 ' >
                            <p className=' text-primary text-sm font-bold ' >Withdrawal Pin</p>
                            <PinInput
                                length={4}
                                placeholder='0'
                                initialValue={values?.pin}
                                secret={true}
                                autoSelect={true}
                                style={{
                                    background: "#37137F14",
                                    borderRadius: '5px',
                                }}
                                focus={true}
                                onChange={(e) => setValue("pin", e)}
                                inputStyle={{
                                    marginRight: '10px', // Adjust the gap here
                                    width: '60px',
                                    height: '60px',
                                    textAlign: 'center',
                                    border: '1px solid transparent',
                                    borderRadius: '5px',
                                    // background: "#37137F14",
                                    fontSize: '16px',
                                }}
                            />
                        </div>
                        <CustomButton d loading={loadingBank} type="submit" height='60px' >
                            Save Bank Account
                        </CustomButton>
                    </div>
                </div>
            )}
        </div>
    )
}

