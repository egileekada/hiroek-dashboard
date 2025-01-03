
export interface IEvent {
    fundRaiser: IFundRaiser;
    eventTicket: IEventTicket;
    minimumPledge: number;
    address: string;
    admin: string
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
    members: Array<any>
    name: string
    organization: string
    photo: string
    privacy: string
    signUpLimit: number
    updatedAt: string
    __v: number
    _id: string
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