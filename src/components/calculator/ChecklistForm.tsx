'use client';

import { useAppStore } from '@/store/useAppStore';
import { CHECKLISTS } from '@/constants/checklists';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input'; // For comments if needed
import { Card, CardContent } from '@/components/ui/card';

export const ChecklistForm = () => {
    const currentProduct = useAppStore((state) => state.currentProduct);
    const checklistData = useAppStore((state) => state.checklistData);
    const updateChecklistData = useAppStore((state) => state.updateChecklistData);

    const { control, watch, register } = useForm({
        defaultValues: checklistData,
        mode: 'onChange',
    });

    // Start with empty default if product has check list
    const checklist = currentProduct ? CHECKLISTS[currentProduct.id] : null;

    const watchedValues = watch();

    useEffect(() => {
        updateChecklistData(watchedValues);
    }, [JSON.stringify(watchedValues), updateChecklistData]);

    if (!checklist) {
        if (currentProduct) return <div className="text-gray-500 italic p-4">Для этого продукта нет чек-листа.</div>;
        return null;
    }

    return (
        <div className="space-y-6 pb-32">
            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="font-semibold text-slate-900 border-b pb-2 mb-4">Чек-лист готовности</h3>

                    {checklist.questions.map((q) => (
                        <div key={q.id} className="space-y-2">
                            <Label>{q.text}</Label>
                            {q.type === 'select' && q.options && (
                                <Controller
                                    name={q.id}
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Выберите..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {q.options?.map(opt => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            )}
                            {q.type === 'input' && (
                                <Input className="h-12" {...register(q.id)} />
                            )}
                        </div>
                    ))}

                    <div className="space-y-2 pt-4 border-t">
                        <Label htmlFor="manager_comment">Комментарий менеджера</Label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register('manager_comment')}
                            placeholder="Дополнительная информация..."
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
