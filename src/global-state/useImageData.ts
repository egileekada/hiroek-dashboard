import { create } from 'zustand'; 

type ImageState = { 
    image: any;  
}

type Action = {  
    updateImage: (data: ImageState['image']) => void 
}

export const useImage = create<ImageState & Action>((set) => ({ 
    image: null,
    updateImage: (data: any) => set(() => ({ image: data })),
}));