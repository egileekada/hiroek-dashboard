import { Text } from '@radix-ui/themes';
import { BackArrowIcon } from '../../svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
    header: string;
    body: string;
    back?: boolean;
    path?: any; 
}

export default function PageHeader({ header, body, back, path = "/" }: IProps) {

    const router = useNavigate()

    const clickHandler  =()=> {
        if(path){
            router(path)
        } else {
            router(-1)
        }
    }

    return (
        <div className=' w-auto flex lg:flex-row flex-col lg:items-center lg:px-0 px-4 gap-2 ' >
            {back && (
                <div className=' w-fit ' >
                    <div onClick={clickHandler} role='button' className=' w-11 h-11 lg:w-[62px] lg:h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{boxShadow: "0px 2px 4px 0px #0000000D"}} >
                        <BackArrowIcon />
                    </div>
                </div>
            )}
            <div className=' flex flex-col gap-2 lg:mt-0 mt-4 ' >
                <Text className=' text-[28px] !leading-7 font-black tracking-[1%] text-primary ' >{header}</Text>
                <Text className=' !leading-5 font-semibold text-primary text-opacity-50 ' >{body}</Text>
            </div>
        </div>
    )
}
