import { IMember, IUser } from "./user";

export interface IEvent {
    fundRaiser: IFundRaiser;
    eventTicket: IEventTicket;
    minimumPledge: number;
    address: string;
    admin: any
    adminType: string
    category: string
    createdAt: string
    description: string
    endTime: string
    eventEndDate: string
    fundraisingGoal: number
    goalReached: boolean
    interests: Array<string>
    invitees: Array<any>
    members: Array<{
        fullname: string
        photo: string
        _id: string
    }>
    name: string
    organization: string
    photo: string
    privacy: string
    signUpLimit: number
    updatedAt: string
    __v: number
    _id: string
}

export interface IScanEvent {
    "callerType": string,
    "createAt": string,
    "_id": string,
    "event": string,
    "user": {
        "_id": string,
        "fullname": string,
        "photo": string
    },
    "attendee": string,
    "ticketId": string,
    "caller": {
        "_id": string,
        "name": string,
        "logo": string
    },
    "createdAt": string ,
    "updatedAt": string,
    "__v": string
}

export interface IEventDashboard {
    "fundRaised": number;
    "todayDonations": number;
    "members": number;
    "tickets": number;
    "ticketValues": number;
    "pledges": number
}

interface IFundRaiser {
    organizations: Array<IOrganization>,
    fundRaised: number,
    goalReached: boolean,
    fundRaisingGoal: number
}

interface IOrganization {
    "fundRaised": number,
    "totalDonations": number,
    "_id": string,
    "name": string,
    "charityRegNumber": string,
    "email": string,
    "description": string,
    "logo": string
}

interface IEventTicket {
    "availableTickets": number,
    "totalTicket": number,
    "ticketPrice": number
}

export interface ITicketHistory {
    "_id": string,
    "tickets": Array<any>,
    "createAt": string,
    "event": IEvent,
    "user": IMember,
    "totalTickets": number,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
} 