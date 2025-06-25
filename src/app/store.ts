import { create } from 'zustand';

interface MountState {
    isMount: boolean;
    setMount: (mounted: boolean) => void;
}

export const useMountStore = create<MountState>((set) => ({
    isMount: false,
    setMount: (mounted) => set({ isMount: mounted }),
}));

interface ImageState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useImageStore = create<ImageState>((set) => ({
    loading: true,
    setLoading: (loading) => set({ loading }),
}));
