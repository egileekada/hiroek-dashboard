

interface IProps {
    className?: string,
    asHeader?: boolean, 
    children: any
}

export default function text({ className, asHeader, children }: IProps) {

    return (
        <p className={` ${className} ${asHeader ? " font-bold text-[48px] " : " text-base "} `} >{children}</p>
    )
}
