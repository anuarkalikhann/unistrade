import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalculatorState, Product } from '@/types';

export const useAppStore = create<CalculatorState>()(
    persist(
        (set) => ({
            currentProduct: null,
            formData: {},
            checklistData: {},
            totalPrice: 0,
            setProduct: (product: Product) => set({ currentProduct: product }),
            updateFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),
            updateChecklistData: (data) =>
                set((state) => ({ checklistData: { ...state.checklistData, ...data } })),
            reset: () => set({ currentProduct: null, formData: {}, checklistData: {}, totalPrice: 0 }),
        }),
        {
            name: 'unistrade-storage',
        }
    )
);
