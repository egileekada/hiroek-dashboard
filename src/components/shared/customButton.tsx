import { ArrowIcon } from '../../svg';

interface IProps { 
    hasBackIcon?: boolean;
    hasFrontIcon?: boolean;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    loading?: boolean;
    bgColor?: string;
    color?: string;
    width?: string;
    height?: string;
    rounded?: string;
    type?: "submit" | "reset" | "button"
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
        height,
        rounded,
        loading,
        type,
        ...rest
    } = props
    return ( 
        <button {...rest} type={type} disabled={loading} style={{boxShadow: "2px 2px 0px 0px #37137F4D", background: bgColor ?? "#37137f", color: color ?? "white", borderRadius: rounded ?? "10px", height: height ?? "50px", width: width ?? "100%" }} className=' px-3 flex gap-3 items-center text-white font-semibold justify-center' >
            {(hasFrontIcon && !loading) && (
                <>
                    {icon ?? <ArrowIcon />}
                </>
            )}
            {loading ? "Loading..." : children}
            {(hasIcon && !loading) && (
                <>
                    {icon ?? <ArrowIcon />}
                </>
            )}
        </button>
    )
}