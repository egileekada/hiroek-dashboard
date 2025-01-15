
export interface IMessage {
    conversation: string;
    createdAt: string;
    message: string
    recipient: {
        _id: string;
        fullname: string;
        photo: string
    };
    recipientType: string
    sender: {
        _id: string;
        name: string;
        logo: string
    }
    senderType: string;
    status: "unread" | "read";
    updatedAt: string;
    _id: string;
}