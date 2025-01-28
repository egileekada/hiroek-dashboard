import { create } from 'zustand'; 

type ImageState = { 
    image: any;  
    eventImage: any
    postImage: Array<any>
}

type Action = {  
    updateImage: (data: ImageState['image']) => void 
    updateEventImage: (data: ImageState['eventImage']) => void 
    updatePostImage: (data: ImageState['postImage']) => void 
}

export const useImage = create<ImageState & Action>((set) => ({ 
    image: null,
    eventImage: null, 
    postImage: [],
    updateImage: (data: any) => set(() => ({ image: data })),
    updateEventImage: (data: any) => set(() => ({ eventImage: data })),
    updatePostImage: (data: any) => set(() => ({ postImage: data })),
}));