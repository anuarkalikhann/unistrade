'use client';

import { ChecklistForm } from '@/components/calculator/ChecklistForm';
import { PricingDisplay } from '@/components/calculator/PricingDisplay';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { usePriceCalculator } from '@/lib/hooks/usePriceCalculator';
import { useState } from 'react';

export default function ChecklistPage() {
    const router = useRouter();
    const { currentProduct, formData, checklistData, reset } = useAppStore();
    const totalPrice = usePriceCalculator();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleSubmit = async () => {
        if (!currentProduct) return;
        setIsSubmitting(true);

        const payload = {
            product: currentProduct.name,
            totalPrice,
            inputs: formData,
            checklist: checklistData,
            manager_comment: checklistData.manager_comment || '',
        };

        try {
            const res = await fetch('https://unistrade.app.n8n.cloud/webhook/f619476a-cc9b-4ea3-8958-057ab94161da', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                reset(); // Clear store
                router.push('/success');
            } else {
                alert('Ошибка при отправке: ' + res.statusText);
            }
        } catch (e) {
            alert('Ошибка сети');
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Header />

            <div className="max-w-md mx-auto pt-4 pb-32 px-4">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="sm" onClick={handleBack} className="-ml-3 text-slate-500">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Назад
                    </Button>
                    <span className="ml-2 font-medium text-slate-900 truncate">
                        Чек-лист: {currentProduct?.name}
                    </span>
                </div>

                <ChecklistForm />
            </div>

            <PricingDisplay
                onNext={handleSubmit}
                nextLabel={isSubmitting ? 'Отправка...' : 'Отправить заказ'}
                disabled={isSubmitting}
            />
        </main>
    );
}
