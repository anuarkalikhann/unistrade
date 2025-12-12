'use client';

import { usePriceCalculator } from '@/lib/hooks/usePriceCalculator';
import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PricingDisplayProps {
    onNext?: () => void;
    nextLabel?: string;
    disabled?: boolean;
}

export const PricingDisplay = ({ onNext, nextLabel = 'Далее', disabled }: PricingDisplayProps) => {
    const price = usePriceCalculator();
    const currentProduct = useAppStore(state => state.currentProduct);

    // Format price: e.g. 125 000 сом
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-top z-50">
            <div className="max-w-md mx-auto flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Итого:</span>
                    <span className="text-2xl font-bold text-slate-900 transition-all duration-300">
                        {formattedPrice} <span className="text-sm font-normal text-slate-500">сом</span>
                    </span>
                </div>

                {onNext && (
                    <Button
                        size="lg"
                        onClick={onNext}
                        disabled={disabled}
                        className="px-8 font-semibold bg-slate-900 hover:bg-slate-800 text-white"
                    >
                        {nextLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};
