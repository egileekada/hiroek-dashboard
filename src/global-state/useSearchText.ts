import { create } from 'zustand';  
 
type State = {   
    search: string  
}

type Action = {  
    setSearchText: (data: State['search']) => void   
}

export const useSearchStore = create<State & Action>((set) => ({ 
    search: "",  
    setSearchText: (data: any) => set(() => ({ search: data })),  
}));