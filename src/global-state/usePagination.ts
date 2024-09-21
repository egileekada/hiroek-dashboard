import { create } from 'zustand'; 
 

type PaginationState = {   
    page: number;
    pageSize: number;
    eventFilter: "past" | "present" | "future"
}

type Action = {  
    updatePage: (data: PaginationState['page']) => void  
    updatePageSize: (data: PaginationState['pageSize']) => void  
    updateFilter: (data: PaginationState['eventFilter']) => void  
}

export const usePagintion = create<PaginationState & Action>((set) => ({  
    page: 1,
    pageSize: 10,
    eventFilter: "future",
    updatePage: (data: any) => set(() => ({ page: data })), 
    updatePageSize: (data: any) => set(() => ({ pageSize: data })), 
    updateFilter: (data: any) => set(() => ({ eventFilter: data })), 
}));