import { create } from 'zustand'; 

type UserState = {
    accountClaimed: boolean;
    bankAccountName: string;
    bankAccountNumber: string;
    address: string;
    bankName: string;
    telephone: string;
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
    setAll: (data: Partial<UserState>) => void
}

export const useDetails = create<UserState>((set) => ({
    accountClaimed: false,
    bankAccountName: "",
    address: "", 
    bankAccountNumber: "",
    bankName: "",
    charityRegNumber: "",
    city: "",
    country: "",
    createdAt: "",
    description: "",
    email: "",
    fundRaised: 0,
    interests: [],
    loc: {
        type: "",
        coordinates: []
    },
    logo: "",
    name: "",
    postalCode: "",
    telephone: "",
    subcategories: [],
    totalDonations: 0,
    updatedAt: "",
    userId: "",
    setAll: (data) => set((state) => ({ ...state, ...data }))
}));