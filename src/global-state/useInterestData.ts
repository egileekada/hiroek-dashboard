import { create } from 'zustand'; 


interface IProps {
    value: string,
    label: string
}

type InterestState = {   
    interest: Array<IProps>
}

type Action = {  
    updateInterest: (data: InterestState['interest']) => void  
}

export const useInterest = create<InterestState & Action>((set) => ({ 
    interest: [], 
    updateInterest: (data: any) => set(() => ({ interest: data })), 
}));