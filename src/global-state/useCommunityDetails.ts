import { create } from 'zustand'; 
import { IEvent } from '../model/event';
 
type CommunityState = {   
    community: IEvent
}

type Action = {  
    updateCommunity: (data: CommunityState['community']) => void  
}

export const useEventDetail = create<CommunityState & Action>((set) => ({ 
    community: {} as any, 
    updateCommunity: (data: any) => set(() => ({ community: data })), 
}));