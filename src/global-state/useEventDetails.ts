import { create } from 'zustand'; 
import { IEvent } from '../model/event';
 
type EventState = {   
    event: IEvent
}

type Action = {  
    updateEvent: (data: EventState['event']) => void  
}

export const useEventDetail = create<EventState & Action>((set) => ({ 
    event: {} as any, 
    updateEvent: (data: any) => set(() => ({ event: data })), 
}));