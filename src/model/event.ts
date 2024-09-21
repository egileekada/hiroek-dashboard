
export interface IEvent {
    address: string
    admin: string
    adminType: string
    category: string
    createdAt: string
    description: string
    endTime: string
    eventEndDate: string
    fundRaised: number
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