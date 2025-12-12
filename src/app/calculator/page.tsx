'use client';

import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { PricingDisplay } from '@/components/calculator/PricingDisplay';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function CalculatorPage() {
    const router = useRouter();
    const currentProduct = useAppStore((state) => state.currentProduct);

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        router.push('/checklist');
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Header />

            <div className="max-w-md mx-auto pt-4 pb-32 px-4">
                {/* Breadcrumb / Back */}
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="sm" onClick={handleBack} className="-ml-3 text-slate-500">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Назад
                    </Button>
                    <span className="ml-2 font-medium text-slate-900 truncate">
                        {currentProduct?.name || 'Калькулятор'}
                    </span>
                </div>

                <CalculatorForm />
            </div>

            <PricingDisplay onNext={handleNext} />
        </main>
    );
}
