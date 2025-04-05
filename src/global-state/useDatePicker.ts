import { create } from 'zustand';  
 
type EventState = {   
    startData: any  
    endDate: any
}

type Action = {  
    updateStartDate: (data: EventState['startData']) => void  
    updateEndDate: (data: EventState['endDate']) => void  
}

export const useDatePicker = create<EventState & Action>((set) => ({ 
    startData: "" as any, 
    endDate: ""as any, 
    updateStartDate: (data: any) => set(() => ({ startData: data })), 
    updateEndDate: (data: any) => set(() => ({ endDate: data })), 
}));