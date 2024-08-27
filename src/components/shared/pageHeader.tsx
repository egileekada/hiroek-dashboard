import { Text } from '@radix-ui/themes';
import { BackArrowIcon } from '../../svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
    header: string;
    body: string;
    back?: boolean;
}

export default function PageHeader({ header, body, back }: IProps) {

    const router = useNavigate()

    return (
        <div className=' w-full flex items-center gap-2 ' >
            {back && (
                <div className=' w-fit ' >
                    <div onClick={()=> router(-1)} role='button' className=' w-[62px] h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{boxShadow: "0px 2px 4px 0px #0000000D"}} >
                        <BackArrowIcon />
                    </div>
                </div>
            )}
            <div className=' flex flex-col ' >
                <Text className=' text-[24px] leading-7 font-black tracking-[1%] text-primary ' >{header}</Text>
                <Text className=' leading-5 -mt-1 font-semibold text-primary text-opacity-50 ' >{body}</Text>
            </div>
        </div>
    )
}
