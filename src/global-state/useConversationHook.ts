import { create } from 'zustand';  
 
type State = {   
    data: {
        name: string,
        photo: string,
        id: string
    }
}

type Action = {  
    updateConversation: (data: State['data']) => void   
}

export const useConversationHook = create<State & Action>((set) => ({ 
    data: {} as any,  
    updateConversation: (data: any) => set(() => ({ data: data })),  
}));