import { Text } from '@radix-ui/themes';
import { BackArrowIcon, NotificationIcon } from '../../svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
    header: string;
    body: string;
    back?: boolean;
    path?: any;
    second?: boolean;
    notification?: boolean
}

export default function PageHeader({ header, body, back, path, second, notification }: IProps) {

    const router = useNavigate()

    const clickHandler = () => { 
        
        if (!path) {  
            router(-1) 
        } else {
            router(path) 
        }
    }

    return (
        <div className={` ${second ? " lg:w-auto w-full flex-row lg:items-center items-center lg:justify-start justify-between " : " w-auto lg:flex-row flex-col "} relative flex lg:items-center lg:px-0 px-4 gap-3 `} >
            {back && (
                <div className=' w-fit relative z-20 ' >
                    <div onClick={clickHandler} role='button' className=' w-11 h-11 lg:w-[45px] lg:h-[45px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
                        <BackArrowIcon />
                    </div>
                </div>
            )}
            <div className={` ${second ? " lg:relative absolute inset-0 lg:pl-0 pl-4 w-full flex flex-row justify-center " : " flex flex-col "}  lg:mt-0 mt-3 `} >
                <Text className=' lg:text-[24px] text-[18px] lg:!leading-7 font-black tracking-[1%] text-primary ' >{header}</Text>
                {body && (
                    <Text className=' !leading-4 text-xs font-bold text-primary text-opacity-50 ' >{body}</Text>
                )}
            </div>
            {notification && (
                <div onClick={() => router("/dashboard/notification")} role="button" className=" w-10 h-10 relative lg:hidden mt-2 z-10 flex justify-center items-center " >
                    <div className=' absolute top-0 right-0 w-5 h-5 text-white bg-primary rounded font-semibold text-[10px] tracking-[0.5%] flex justify-center items-center ' >
                        0
                    </div>
                    <NotificationIcon />
                </div>
            )}
        </div>
    )
}
