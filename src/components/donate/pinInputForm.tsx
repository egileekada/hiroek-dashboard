// import { useState } from 'react'
import PinInput from 'react-pin-input';
import { CustomButton } from '../shared';
import useBank from '../../hooks/useBank';

export default function PinInputForm() { 

    const { PinForm, loadingPin, setPinValue } = useBank() 

    return PinForm(
        <div className=' w-full h-full flex justify-start ' >
            <div className=" lg:px-0 px-4 flex flex-col gap-4  w-fit  ">
                <div className=' flex flex-col gap-1 ' >
                    <p className=' text-primary text-sm font-bold ' >Withdrawal Pin</p>
                    <PinInput
                        length={4}
                        placeholder='0'
                        initialValue=""
                        secret={true}
                        autoSelect={true}
                        style={{
                            background: "#37137F14",
                            borderRadius: '5px',
                        }}
                        focus={true}
                        onChange={(e)=> setPinValue("oldPin", e)}
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
                <div className=' flex flex-col gap-1 mb-4 ' >
                    <p className=' text-primary text-sm font-bold ' >Confirm Withdrawal Pin</p>
                    <PinInput
                        length={4}
                        placeholder='0'
                        initialValue=""
                        secret={true}
                        autoSelect={true}
                        onChange={(e)=> setPinValue("newPin", e)}
                        style={{
                            background: "#37137F14",
                            borderRadius: '5px',
                        }}
                        inputStyle={{
                            marginRight: '10px', // Adjust the gap here
                            width: '60px',
                            height: '60px',
                            textAlign: 'center',
                            border: '1px solid transparent',
                            borderRadius: '5px', 
                            fontSize: '16px',
                        }}
                    />
                </div>
                <CustomButton loading={loadingPin} type="submit" height='60px' >
                    Save Withdrawal Pin
                </CustomButton>
            </div>
        </div>
    );
}
