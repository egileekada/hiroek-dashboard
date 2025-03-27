
// import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/shared/pageHeader'
import CustomInputWithoutForm from '../../components/shared/customInputWithoutForm';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { CustomButton } from '../../components/shared';
import ModalLayout from '../../components/shared/modalLayout';
import { useDetails } from '../../global-state/useUserDetails';
import { formatNumber } from '../../utils/numberFormat';
import useBank from '../../hooks/useBank';
import LoadingAnimation from '../../components/shared/loadingAnimation';
import { useNavigate } from 'react-router-dom';

export default function TransactionHistory() {

    // const [searchParams] = useSearchParams();
    // const index = searchParams.get("withdrawals");

    const navigate = useNavigate()

    const [amount, setAmount] = useState("")
    const [open, setOpen] = useState(false)

    const { withdrawFunds, loadingWithdrawFunds } = useBank()

    const { bankAccountNumber, bankName } = useDetails((state) => state);

    return (
        <div className=' w-full h-full flex flex-col gap-6 ' >
            <PageHeader path={"/dashboard/donation"} back={true} header="Withdraw Funds" body="" />
            <div className=' w-full flex flex-col items-center h-full ' >
                <div className=' flex flex-col h-full max-w-[400px] w-full gap-4 px-4 ' >
                    <div className=' flex flex-col w-full gap-1 ' >
                        <Text className=' text-sm font-bold ' >Amount</Text>
                        <CustomInputWithoutForm value={amount} setValue={setAmount} type={"number"} placeholder={'£0'} />
                    </div>
                    <div className=' flex flex-col w-full gap-1 ' >
                        <Text className=' text-sm font-bold ' >Bank Details</Text>
                        <div className=' w-full h-[54px] rounded-lg mb-2 flex justify-between items-center bg-primary px-4 text-white ' >
                            <Text className=' font-bold text-xs ' >{bankName + " (*****" + bankAccountNumber?.slice(bankAccountNumber?.length - 3, bankAccountNumber?.length) + ")"}</Text>
                            <div className=' w-6 h-6 rounded-full border-[6px] border-white ' />
                        </div>
                        <CustomButton onClick={()=> navigate("/dashboard/donation/bankInfo?type=change")} bgColor='white' borderWidth='2px' borderColor='#37137f' fontSize='14px' color='#37137f' >
                            + Choose Another Bank Account
                        </CustomButton>
                    </div>
                    <div className=' mt-auto mb-4 w-full ' >
                        <CustomButton isDisabled={amount ? false : true} onClick={() => setOpen(true)} >
                            Withdraw Funds
                        </CustomButton>
                    </div>
                </div>
            </div>

            <ModalLayout onIcon={true} width={" max-w-[361px] "} rounded="44px" open={open} setOpen={setOpen} >
                <LoadingAnimation loading={loadingWithdrawFunds} >
                    <div className=" w-full flex flex-col gap-2 items-center pb-4 px-3 " >
                        <Text className=" text-primary mb-4 text-center " >{`Are you sure you want to withdraw ${formatNumber(amount)}`}</Text>
                        <div className=' w-full flex gap-3 ' >
                            <CustomButton onClick={()=> withdrawFunds({amount: amount ? (Number(amount) * 100) : 0})} type="button" width="200px" rounded="999px" >Yes, Proceed</CustomButton>
                            <CustomButton onClick={() => setOpen(false)} color="#CC1B1B" width="200px" bgColor="white" rounded="999px" >Cancel</CustomButton>
                        </div>
                    </div>
                </LoadingAnimation>
            </ModalLayout>
        </div>
    )
}