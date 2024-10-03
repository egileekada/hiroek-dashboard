import { create } from 'zustand'; 


interface LatLngLiteral {
    lat: number;
    lng: number;
}

type State = {   
    address: string
    marker: LatLngLiteral
}

type Action = {  
    updateMap: (data: State['address']) => void
    updateMarker: (data: State['marker']) => void    
}

export const useMap = create<State & Action>((set) => ({ 
    address: "", 
    marker: {lat: 0, lng: 0},
    updateMap: (data: any) => set(() => ({ address: data })), 
    updateMarker: (data: any) => set(() => ({ marker: data })), 
}));