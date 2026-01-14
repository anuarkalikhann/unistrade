'use client';

import { ChecklistForm } from '@/components/calculator/ChecklistForm';
import { PricingDisplay } from '@/components/calculator/PricingDisplay';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { usePriceCalculator } from '@/lib/hooks/usePriceCalculator';
import { calculatePrice } from '@/lib/priceCalculator';
import { useState } from 'react';
import { PRICING_RULES } from '@/constants/pricingRules';
import { CHECKLISTS } from '@/constants/checklists';

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

        const rule = currentProduct ? PRICING_RULES[currentProduct.id] : null;
        const checklist = currentProduct ? CHECKLISTS[currentProduct.id] : null;

        const formattedInputs: string[] = [];
        // Global Fields
        if (formData.clientName) formattedInputs.push(`Имя клиента: ${formData.clientName}`);
        if (formData.clientAddress) formattedInputs.push(`Адрес клиента: ${formData.clientAddress}`);
        if (formData.phone) formattedInputs.push(`Номер телефона: ${formData.phone}`);

        if (rule) {
            // Dimensions
            if (rule.dimensions && !rule.hideDimensions) {
                if (formData.width) formattedInputs.push(`Ширина: ${formData.width} мм`);
                if (formData.height) formattedInputs.push(`Высота: ${formData.height} мм`);
            }

            // Frame
            if (rule.frames && formData.frame) {
                const frame = rule.frames.find(f => f.value === formData.frame);
                if (frame) formattedInputs.push(`Каркас: ${frame.label}`);
            }

            // Options in order
            rule.options?.forEach(opt => {
                const val = formData[opt.id];
                if (val === undefined || val === '' || val === null) return;

                // Visibility check
                if (opt.visibleIf) {
                    const parentVal = formData[opt.visibleIf.optionId];
                    if (!opt.visibleIf.values.includes(parentVal)) return;
                }

                let displayVal = val;
                let optionPrice = 0;

                if (opt.type === 'select' || opt.type === 'boolean') {
                    const found = opt.options?.find(o => o.value === val);
                    if (found) {
                        displayVal = found.label;
                        optionPrice = found.price || 0;
                    } else {
                        displayVal = (val === 'yes' ? 'Да' : val === 'no' ? 'Нет' : val);
                    }
                } else if (opt.type === 'number' || opt.type === 'input') {
                    if (opt.priceType === 'quantity' && opt.pricePerUnit) {
                        optionPrice = Number(val) * opt.pricePerUnit;
                    } else if (opt.priceType === 'fixed' && opt.priceValue) {
                        optionPrice = opt.priceValue;
                    }
                }

                const unit = opt.unit || '';
                if (unit && (opt.type === 'number' || opt.type === 'input')) {
                    displayVal = `${val} ${unit}`;
                }

                const priceStr = optionPrice > 0 ? ` (+${optionPrice} сом)` : ' (учтено)';
                formattedInputs.push(`${opt.label}: ${displayVal}${priceStr}`);
            });
        }

        const formattedChecklist: string[] = [];
        if (checklist) {
            checklist.questions.forEach(q => {
                const val = checklistData[q.id];
                if (val) {
                    formattedChecklist.push(`${q.text} ${val}`);
                }
            });
        }

        const payload = {
            product: currentProduct.name,
            totalPrice,
            inputs: formData,
            checklist: checklistData,
            formatted_inputs: formattedInputs.join('\n'),
            formatted_checklist: formattedChecklist.join('\n'),
            full_summary: [
                `Товар: ${currentProduct.name}`,
                `Итоговая цена: ${totalPrice} сом`,
                '\n--- Параметры заказа ---',
                ...formattedInputs,
                '\n--- Чек-лист ---',
                ...formattedChecklist,
                checklistData.manager_comment ? `\nКомментарий менеджера: ${checklistData.manager_comment}` : ''
            ].join('\n'),
            manager_comment: checklistData.manager_comment || '',
            order_items: calculatePrice(currentProduct, formData).items
        };

        try {
            const res = await fetch('https://ennan.app.n8n.cloud/webhook/aa173e01-197b-4a9b-9557-b04647eb9692', {
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
