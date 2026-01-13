import { useAppStore } from '@/store/useAppStore';
import { calculatePrice } from '@/lib/priceCalculator';

export const usePriceCalculator = () => {
    const currentProduct = useAppStore((state) => state.currentProduct);
    const formData = useAppStore((state) => state.formData);

    if (!currentProduct) return 0;

    const { total } = calculatePrice(currentProduct, formData);
    return total;
};
