import { ArrowIcon } from '../../svg';

interface IProps { 
    hasIcon?: boolean,
    children?: React.ReactNode,
    [x:string]: any;
}

export default function CustomButton(props: IProps) {

    const {
        hasIcon,
        children,
        ...rest
    } = props
    return ( 
        <button {...rest} style={{boxShadow: "2px 2px 0px 0px #37137F4D"}} className=' w-full h-[50px] flex gap-3 items-center text-white bg-primary font-black justify-center rounded-[10px] ' >
            {children}
            {hasIcon && (
                <ArrowIcon />
            )}
        </button>
    )
}