import toast from "react-hot-toast"
import { ShareIcon2 } from "../../svg"


export default function ShareBtn({ id, type }: { id: string, type: "EVENT" | "CHANNEL" }) {

    const copyHandler = () => {
        if(type === "EVENT") {
            navigator.clipboard.writeText(`events.hiroek.io/event/${id}`)
        }
        toast.success("Copied to clipboard")
    }
    
    return (
        <div onClick={copyHandler} className=" w-11 h-11 rounded-[10px] bg-primary flex justify-center items-center " >
            <ShareIcon2 />
        </div>
    )
}