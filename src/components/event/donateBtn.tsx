import { useState } from 'react'
import ModalLayout from '../shared/modalLayout'
import { Text } from '@radix-ui/themes'
import { CustomButton } from '../shared'
import CustomInputWithoutForm from '../shared/customInputWithoutForm'
import { ApplePay, AppleStore, GooglaPay, GoogleStore } from '../../svg'

export default function DonateBtn({ fundRaisingGoal }: { fundRaisingGoal: any }) {

    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)

    // const [payload, setPayload] = useState({} as any)
    const [tab, setTab] = useState(0)

    return (
        <div className=' w-full ' >
            {fundRaisingGoal && (
                <CustomButton onClick={() => setOpen(true)} rounded="999px" >Give Now</CustomButton>
            )}
            {!fundRaisingGoal && (
                <CustomButton onClick={() => setModal(true)} rounded="999px" >Join Event</CustomButton>
            )}
            <ModalLayout onIcon={true} width={" max-w-500px "} height={"fit-content"} rounded="44px" open={modal} setOpen={setModal} >
                <div className=" w-full flex overflow-y-auto flex-col pb-4 px-3 text-primary gap-3 items-center " >
                    <Text className=" text-lg font-bold text-primary text-center " >Get The Full Experience In The App!</Text>
                    <div className=' w-full flex justify-between items-center ' >
                        <GoogleStore width='100' />
                        <CustomButton height='44px' fontSize='12px' bgColor='#37137F4D' color='#37137F' width='fit-content' >
                            Download
                        </CustomButton>
                    </div>
                    <div className=' w-full flex justify-between items-center ' >
                        <AppleStore width='100' />
                        <CustomButton height='44px' fontSize='12px' bgColor='#37137F4D' color='#37137F' width='fit-content' >
                            Download
                        </CustomButton>
                    </div>
                </div>
            </ModalLayout>
            <ModalLayout onIcon={true} width={" max-w-500px "} height={(tab === 0 || tab === 3) ? "100%" : "fit-content"} rounded="44px" open={open} setOpen={setOpen} >
                {tab === 0 && (
                    <div className=" w-full flex overflow-y-auto flex-col pb-4 px-3 text-primary " >
                        <Text className=" text-2xl font-bold text-primary " >Give Now</Text>
                        <Text className=" text-xs text-primary text-opacity-50 font-semibold " >Please fill in your details and finalise your donation.</Text>
                        <div className=" mt-6 w-full flex flex-col gap-1 " >
                            <Text className=' text-sm font-bold ' >First Name</Text>
                            <CustomInputWithoutForm value={""} type='text' placeholder={''} />
                        </div>
                        <div className=" mt-6 w-full flex flex-col gap-1 " >
                            <Text className=' text-sm font-bold ' >Last Name</Text>
                            <CustomInputWithoutForm value={""} type='text' placeholder={''} />
                        </div>
                        <div className=" mt-6 w-full flex flex-col gap-1 " >
                            <Text className=' text-sm font-bold ' >Email Address</Text>
                            <CustomInputWithoutForm value={""} type='text' placeholder={''} />
                        </div>
                        <div className=" mt-6 w-full flex flex-col gap-1 " >
                            <Text className=' text-sm font-bold ' >Phone Number</Text>
                            <CustomInputWithoutForm value={""} type='text' placeholder={''} />
                        </div>
                        <div className=" mt-6 w-full flex flex-col gap-1 " >
                            <Text className=' text-sm font-bold ' >Donation Amount</Text>
                            <CustomInputWithoutForm value={""} type='text' placeholder={''} />
                        </div>
                        <div className=' mt-auto w-full pt-8 ' >
                            <CustomButton onClick={() => setTab(1)} rounded="999px" >Donate £0.00</CustomButton>
                        </div>
                    </div>
                )}
                {tab === 1 && (
                    <div className=" w-full flex overflow-y-auto flex-col text-primary " >
                        <div className=' w-full flex justify-center pb-3 border-b px-3 border-[#E8E8E8] ' >
                            <Text className=' text-xl font-black ' >Donation Preview</Text>
                        </div>
                        <div className=' w-full grid grid-cols-2 gap-3 py-3 px-3 ' >
                            <Text className='text-xs font-bold text-[#1E1E1E] ' >Full Name</Text>
                            <Text className='text-xs font-bold text-[#262627] text-right ' >Freddy Kreuger</Text>
                            <Text className='text-xs font-bold text-[#1E1E1E] ' >Email</Text>
                            <Text className='text-xs font-bold text-[#262627] text-right ' >freddykruegs...</Text>
                            <Text className='text-xs font-bold text-[#1E1E1E] ' >Phone Number</Text>
                            <Text className='text-xs font-bold text-[#262627] text-right ' >+44 099 900 0000</Text>
                            <Text className='text-xs font-bold text-[#1E1E1E] ' >Donation Amount</Text>
                            <Text className='text-xs font-bold text-[#262627] text-right ' >£40.00</Text>
                            <Text className='text-xs font-bold text-[#1E1E1E] ' >Service Charge</Text>
                            <Text className='text-xs font-bold text-[#262627] text-right ' >£2.00</Text>
                        </div>
                        <div style={{ boxShadow: "0px -2px 4px 0px #00000040" }} className=' w-full flex justify-between px-3 py-3 items-center ' >
                            <Text className=' text-[#1E1E1E] font-bold ' >Total: £42.00</Text>
                            <CustomButton width='fit-content' height='34px' onClick={() => setTab(2)} fontSize='12px' >Donate Now</CustomButton>
                        </div>
                    </div>
                )}
                {tab === 2 && (
                    <div className=" w-full flex overflow-y-auto pb-4 flex-col text-primary gap-2 " >
                        <CustomButton onClick={() => setTab(3)} borderColor='#1E1E1EBF' bgColor='white' borderWidth='2px' color='#1E1E1E' fontSize='12px' >Pay with <GooglaPay /></CustomButton>
                        <CustomButton onClick={() => setTab(3)} borderColor='#1E1E1E' bgColor='#1E1E1E' borderWidth='2px' fontSize='12px' >Pay with <ApplePay /></CustomButton>
                        <CustomButton onClick={() => setTab(3)} borderColor='#37137f' borderWidth='2px' fontSize='12px' >Credit/Debit Card</CustomButton>
                    </div>
                )}

                {/* {tab === 3 && (
                    <div className=" w-full flex overflow-y-auto pb-4 gap-2 justify-center items-center flex-col text-primary " >
                        <Text className=' font-bold ' >Processing Payment</Text>
                        <img className=' w-[64px] ' src='/images/loading.gif' alt='loading' />
                    </div>
                )} */}

                {tab === 3 && (
                    <div className=" w-full h-full flex overflow-y-auto pb-4 justify-center items-center flex-col text-primary " >
                        <Text className=' font-bold text-center text-xl text-primary ' >Thank You for your generosity!</Text>
                        <Text className=' text-xs font-semibold text-center mt-2 text-primary text-opacity-50 ' >Your donation has been successfully received. your support will make a real difference in the lives of those in need.</Text>
                        <div className=' mt-auto w-full flex flex-col gap-3 ' >
                            <CustomButton onClick={() => setOpen(false)} borderColor='#37137f' borderWidth='2px' fontSize='12px' >View Event</CustomButton>
                            <CustomButton onClick={() => setOpen(false)} borderColor='#37137f' bgColor='white' borderWidth='2px' color='#37137f' fontSize='12px' >Invite Friends</CustomButton>
                        </div>
                    </div>
                )}
            </ModalLayout>
        </div>
    )
}
