 
export interface IUser {
    accountClaimed: boolean;
    bankAccountName: string;
    bankAccountNumber: string;
    bankName: string;
    charityRegNumber: string;
    city: string;
    country: string;
    createdAt: string;
    description: string;
    email: string;
    fundRaised: number;
    interests: Array<any>;
    loc: {
        type: string;
        coordinates: Array<any>
    };
    logo: string;
    name: string;
    postalCode: string;
    subcategories: Array<any>;
    totalDonations: number;
    updatedAt: string;
    userId: string; 
}