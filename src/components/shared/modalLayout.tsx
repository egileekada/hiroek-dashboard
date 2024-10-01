
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react'
import { IoIosCloseCircle } from 'react-icons/io';



export default function ModalLayout(props: {
    children: ReactNode;
    open: boolean;
    title?: string;
    width?: string;
    setOpen: (by: boolean) => void
}) {

    const {
        open,
        setOpen,
        title,
        width
    } = props

    return ( 
        <Dialog.Root open={open} >
            <Dialog.Portal  >
                <Dialog.Overlay onClick={() => setOpen(false)} className="DialogOverlay bg-black bg-opacity-40 " />
                <Dialog.Content style={{ maxWidth: width ? width : "450px" }} className="DialogContent relative ">
                    <div className='w-full h-10 flex items-center justify-center ' >
                        {title}
                    </div>
                    <div onClick={() => setOpen(false)} role='button' className=' absolute top-2 right-2 ' >
                        <IoIosCloseCircle size={"25px"} />
                    </div>
                    <div className=' w-full flex flex-col ' >
                        {props?.children} 
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
