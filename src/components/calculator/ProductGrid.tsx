'use client';

import { PRODUCTS } from '@/constants/products';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export const ProductGrid = () => {
    const router = useRouter();
    const setProduct = useAppStore((state) => state.setProduct);
    const reset = useAppStore((state) => state.reset);

    const handleSelect = (product: Product) => {
        reset();
        setProduct(product);
        router.push('/calculator');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {PRODUCTS.map((product) => (
                <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer active:scale-95 border-l-4 border-l-primary/0 hover:border-l-primary"
                    onClick={() => handleSelect(product)}
                >
                    <CardContent className="p-6 h-full flex items-center justify-between gap-4">
                        <span className="text-lg font-medium text-slate-800 break-words leading-tight">{product.name}</span>
                        <ArrowRight className="w-6 h-6 text-slate-400 flex-shrink-0" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
