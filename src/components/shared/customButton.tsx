import { ArrowIcon } from '../../svg';

interface IProps { 
    hasBackIcon?: boolean,
    hasFrontIcon?: boolean,
    children?: React.ReactNode,
    icon?: React.ReactNode,
    bgColor?: string,
    color?: string,
    width?: string,
    rounded?: string
    [x:string]: any;
}

export default function CustomButton(props: IProps) {

    const {
        hasFrontIcon,
        hasIcon,
        children,
        bgColor,
        icon,
        color,
        width,
        rounded,
        ...rest
    } = props
    return ( 
        <button {...rest} style={{boxShadow: "2px 2px 0px 0px #37137F4D", background: bgColor ?? "#37137f", color: color ?? "white", borderRadius: rounded ?? "10px" }} className=' w-full h-[50px] px-3 flex gap-3 items-center text-white font-black justify-center' >
            {hasFrontIcon && (
                <>
                    {icon ?? <ArrowIcon />}
                </>
            )}
            {children}
            {hasIcon && (
                <>
                    {icon ?? <ArrowIcon />}
                </>
            )}
        </button>
    )
}