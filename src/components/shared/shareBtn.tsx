import toast from "react-hot-toast"
import { ShareIcon2 } from "../../svg"


export default function ShareBtn({ type, id }: { id: string, type: "EVENT" | "CHANNEL" }) {

    const copyHandler = () => {
        if (type === "EVENT") {
            // navigator.clipboard.writeText(`events.hiroek.io/event/${id}`)
            if (navigator.share) {
                navigator.share({
                    title: 'Check this out!',
                    text: `Heres something interesting I found.`,
                    url: `events.hiroek.io/event/${id}`,
                })
                    .then(() => console.log('Shared successfully!'))
                    .catch((error) => console.error('Error sharing:', error));
            } else {
                alert('Sharing not supported on this device.');
            }
        }
        toast.success("Copied to clipboard")
    }

    return (
        <div onClick={copyHandler} className=" w-11 h-11 rounded-[10px] bg-primary flex justify-center items-center " >
            <ShareIcon2 />
        </div>
    )
}