import { create } from 'zustand'; 
 
type State = {   
    address: string
}

type Action = {  
    updateMap: (data: State['address']) => void  
}

export const useMap = create<State & Action>((set) => ({ 
    address: "", 
    updateMap: (data: any) => set(() => ({ address: data })), 
}));