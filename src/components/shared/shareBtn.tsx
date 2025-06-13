
import { ShareIcon2 } from "../../svg"


export default function ShareBtn({ type, id, height, width }: { id: string, type: "EVENT" | "CHANNEL", height?: string, width?: string }) {

    const shareUrl = `https://events.hiroek.io/event/${id}`;
    const shareUrlChannel = `https://channel.hiroek.io/channel/${id}`;
 
    const copyHandler = () => {
        if (type === "EVENT") { 
            if (navigator.share) {
                navigator.share({
                    title: '',
                    text: ``,
                    url: shareUrl,
                })
                    .then(() => console.log('Shared successfully!'))
                    .catch((error) => console.error('Error sharing:', error));
            } else {
                alert('Sharing not supported on this device.');
            }
        }  else { 
            if (navigator.share) {
                navigator.share({
                    title: '',
                    text: ``,
                    url: shareUrlChannel,
                })
                    .then(() => console.log('Shared successfully!'))
                    .catch((error) => console.error('Error sharing:', error));
            } else {
                alert('Sharing not supported on this device.');
            }
        }
    }

    return (
        <div onClick={copyHandler} className={` ${width ? width : " w-11 "} ${height ? height : "h-11 "} rounded-[10px] bg-primary flex justify-center items-center `} >
            <ShareIcon2 />
        </div>
    )
}