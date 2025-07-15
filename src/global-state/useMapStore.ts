import { create } from 'zustand'; 


// interface LatLngLiteral {
//     lat: number | null;
//     lng: number | null;
// }

type State = {   
    address: string
    marker: any
}

type Action = {  
    updateMap: (data: State['address']) => void
    updateMarker: (data: State['marker']) => void    
}

export const useMap = create<State & Action>((set) => ({ 
    address: "", 
    marker: {} as any,
    updateMap: (data: any) => set(() => ({ address: data })), 
    updateMarker: (data: any) => set(() => ({ marker: data })), 
}));