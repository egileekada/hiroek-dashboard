import { create } from 'zustand';  
import { ICommunity } from '../model/community';
 
type CommunityState = {   
    community: ICommunity
}

type Action = {  
    updateCommunity: (data: CommunityState['community']) => void  
}

export const useCommunityData = create<CommunityState & Action>((set) => ({ 
    community: {} as any, 
    updateCommunity: (data: any) => set(() => ({ community: data })), 
}));