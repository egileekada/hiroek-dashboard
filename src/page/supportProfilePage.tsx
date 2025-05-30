import { Text } from "@radix-ui/themes";
import PageHeader from "../components/shared/pageHeader";
import { HelpIcon, MeetingIcon } from "../svg";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import useTawkTo from "../services/useTawk";

export default function SupportPage() {

    const hiroekSupportInfo = [
        {
            question: "Is Hiroek free for charities?",
            answer: "Yes, charities can create and list events for free."
        },
        {
            question: "What types of events can I host on Hiroek?",
            answer: "You can host fundraising galas, charity walks/runs, awareness campaigns, workshops, educational events, and more."
        },
        {
            question: "How can I raise funds through Hiroek?",
            answer: "Sell tickets or accept donations directly on the platform. Set custom fundraising goals and track progress in real time."
        },
        {
            question: "How do I verify my organisation as a charity?",
            answer: "Provide proof of nonprofit status (e.g., charity registration number) during registration. Hiroek’s team will review and verify your account."
        },
        {
            question: "Can I collaborate with other organisations on events?",
            answer: "Not at present. Collaboration or co-hosting features are coming soon."
        },
        {
            question: "How does ticketing work for charity events?",
            answer: "Set up free, paid, or donation-based tickets. Track sales and manage attendees seamlessly."
        },
        {
            question: "How can I engage volunteers through Hiroek?",
            answer: "Create volunteer recruitment events and outline roles/responsibilities in event descriptions."
        },
        {
            question: "Can I host virtual events on Hiroek?",
            answer: "Not currently. Virtual event support is coming soon."
        },
        {
            question: "How do I track donations and attendees?",
            answer: "Use Hiroek’s dashboard to view ticket sales, donations, attendee details, and engagement analytics."
        },
        {
            question: "Are there tools to thank donors and attendees?",
            answer: "Yes, automated messages are sent after ticket purchases or donations."
        },
        {
            question: "Can I create recurring events?",
            answer: "Yes, Hiroek allows you to schedule recurring events for consistent engagement."
        },
        {
            question: "How do I reschedule an event?",
            answer: "Reschedule from your event dashboard. Attendees will be notified automatically."
        },
        {
            question: "How does Hiroek ensure visibility for charity events?",
            answer: "Charity events are highlighted in the 'Charity Events' category for increased visibility."
        },
        {
            question: "Are there tools to engage my community post-event?",
            answer: "Yes, share event highlights, feedback surveys, and future announcements via the in-app channel."
        },
        {
            question: "Who can I contact for support?",
            answer: "Contact Hiroek’s dedicated team through the Support Center in the app."
        }
    ];

    const [open, setopen] = useState(-1)
    const { showChat, hideChat } = useTawkTo("680611b92a762a1910951e8f", "1ipbrafch");

    useEffect(()=> {
        hideChat()
    }, [])

    return (
        <div className=' w-full flex flex-col gap-6 py-4 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader notification={true} second={true} back={true} header="Contact Support" body="" />
            </div>
            <div className=" w-full flex flex-col gap-6 pt-4 " >
                <div className=" w-full max-w-[500px] flex flex-col gap-4 px-4  " >
                    {/* <div role="button" className=" w-full flex gap-2 items-center " >
                        <div className=" w-fit " >
                            <SupportIcon width="24" />
                        </div>
                        <div className=" flex flex-col " >
                            <Text className=" text-sm font-bold text-primary " >Contact Us On:</Text>
                        </div>
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >Phone Support</Text>
                        <CallIcon />
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >Email Support</Text>
                        <MailIcon />
                    </div> */}
                    <div onClick={showChat} className=" w-full flex items-center justify-between pl-6 cursor-pointer " >
                        <Text className=" text-sm text-primary font-semibold " >Live Chat</Text>
                        <MeetingIcon />
                    </div>
                </div>
                <div className=" w-full max-w-[600px] flex flex-col gap-4 px-4  " >
                    <div role="button" className=" w-full flex gap-2 items-center " >
                        <div className=" w-fit " >
                            <HelpIcon width="24" />
                        </div>
                        <div className=" flex flex-col " >
                            <Text className=" text-sm font-bold text-primary " >FAQ:</Text>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-2 pl-6  " >
                        {hiroekSupportInfo?.map((item, index) => {
                            return (
                                <div key={index} className=" w-full pt-2 pb-4 flex flex-col gap-2 border-b " >
                                    <div onClick={()=> setopen((prev) => prev === index ? -1 : index)} className=" w-full flex cursor-pointer items-center justify-between " >
                                        <Text className=" text-primary font-semibold " >{item?.question}</Text>
                                        <div className={` ${index === open ? " rotate-180 " : ""} transition-all transform `} >
                                            <IoIosArrowDown />
                                        </div>
                                    </div>
                                    {/* {open === index && ( */}
                                        <div className={` ${open === index ? "opacity-100  " : "opacity-0 hidden " } transition-opacity ease-in-out delay-150 duration-300  `} >
                                            <Text className=" text-sm  " >{item?.answer}</Text>
                                        </div>
                                    {/* )} */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
