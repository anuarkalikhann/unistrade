'use client';

import { useAppStore } from '@/store/useAppStore';
import { PRICING_RULES } from '@/constants/pricingRules';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

export const CalculatorForm = () => {
    const currentProduct = useAppStore((state) => state.currentProduct);
    const formData = useAppStore((state) => state.formData);
    const updateFormData = useAppStore((state) => state.updateFormData);

    const { control, watch, register } = useForm({
        defaultValues: formData,
        mode: 'onChange',
    });

    const rule = currentProduct ? PRICING_RULES[currentProduct.id] : null;

    // Sync Form -> Store
    const watchedValues = watch();
    useEffect(() => {
        updateFormData(watchedValues);
    }, [JSON.stringify(watchedValues), updateFormData]);

    if (!currentProduct || !rule) {
        return <div className="text-center p-10">Select a product defined in pricingRules.ts</div>;
    }

    return (
        <div className="space-y-6 pb-32">
            {/* Dimensions Section */}
            {rule.dimensions && !rule.hideDimensions && (
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <h3 className="font-semibold text-slate-900 border-b pb-2 mb-4">Размеры</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="width">Ширина (мм)</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    placeholder={`${rule.dimensions.baseWidth}`}
                                    className="h-12 text-lg"
                                    {...register('width', { required: true })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height">Высота (мм)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    placeholder={`${rule.dimensions.baseHeight}`}
                                    className="h-12 text-lg"
                                    {...register('height', { required: true })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Frame Section */}
            {rule.frames && rule.frames.length > 0 && (
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <h3 className="font-semibold text-slate-900 border-b pb-2 mb-4">Каркас</h3>
                        <div className="space-y-2">
                            <Label htmlFor="frame">Тип каркаса</Label>
                            <Controller
                                name="frame"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Выберите каркас" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {rule.frames?.map((frame) => (
                                                <SelectItem key={frame.value} value={frame.value}>
                                                    {frame.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Options Section */}
            {rule.options && rule.options.length > 0 && (
                <Card>
                    <CardContent className="pt-6 space-y-8">
                        {(() => {
                            // Group options by section
                            const sections: Record<string, typeof rule.options> = {};
                            const noSection: typeof rule.options = [];

                            rule.options.forEach(opt => {
                                // Check visibility
                                if (opt.visibleIf) {
                                    const parentValue = watchedValues[opt.visibleIf.optionId];
                                    if (!opt.visibleIf.values.includes(parentValue)) {
                                        return;
                                    }
                                }

                                if (opt.section) {
                                    if (!sections[opt.section]) sections[opt.section] = [];
                                    sections[opt.section].push(opt);
                                } else {
                                    noSection.push(opt);
                                }
                            });

                            return (
                                <>
                                    {/* Options with sections */}
                                    {Object.entries(sections).map(([sectionTitle, options]) => (
                                        <div key={sectionTitle} className="space-y-6">
                                            <h3 className="font-semibold text-slate-900 border-b pb-2 mb-4">{sectionTitle}</h3>
                                            <div className="grid gap-6">
                                                {options.map((option) => (
                                                    <div key={option.id} className="space-y-2">
                                                        <Label className="text-base">{option.label}</Label>

                                                        {option.type === 'select' && (
                                                            <Controller
                                                                name={option.id}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue placeholder="Выберите..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {option.options?.map((opt) => (
                                                                                <SelectItem key={opt.value} value={opt.value}>
                                                                                    {opt.label} {!option.hidePriceInLabel && (
                                                                                        <>({opt.price > 0 ? `+${opt.price} сом` : opt.price === 0 ? 'Бесплатно' : `${opt.price} сом`})</>
                                                                                    )}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                        )}

                                                        {option.type === 'input' && (
                                                            <Input
                                                                type="text"
                                                                className="h-12"
                                                                {...register(option.id)}
                                                            />
                                                        )}

                                                        {option.type === 'number' && (
                                                            <div className="flex items-center gap-2">
                                                                <Input
                                                                    type="number"
                                                                    className="h-12"
                                                                    placeholder="0"
                                                                    {...register(option.id)}
                                                                />
                                                                {option.unit && <span className="text-sm text-slate-500 whitespace-nowrap">{option.unit}</span>}
                                                            </div>
                                                        )}

                                                        {option.type === 'boolean' && (
                                                            <Controller
                                                                name={option.id}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue placeholder="Выберите..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="no">Нет</SelectItem>
                                                                            <SelectItem value="yes">Да</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Options without sections (Legacy/General) */}
                                    {noSection.length > 0 && (
                                        <div className="space-y-6">
                                            <h3 className="font-semibold text-slate-900 border-b pb-2 mb-4">Опции</h3>
                                            <div className="grid gap-6">
                                                {noSection.map((option) => (
                                                    <div key={option.id} className="space-y-2">
                                                        <Label className="text-base">{option.label}</Label>
                                                        {option.type === 'select' && (
                                                            <Controller
                                                                name={option.id}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue placeholder="Выберите..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {option.options?.map((opt) => (
                                                                                <SelectItem key={opt.value} value={opt.value}>
                                                                                    {opt.label} {!option.hidePriceInLabel && (
                                                                                        <>({opt.price > 0 ? `+${opt.price} сом` : opt.price === 0 ? 'Бесплатно' : `${opt.price} сом`})</>
                                                                                    )}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                        )}
                                                        {/* Other types rendering for no-section items if needed, copying same logic as above or keeping simple if not used */}
                                                        {option.type === 'input' && <Input className="h-12" {...register(option.id)} />}
                                                        {option.type === 'number' && (
                                                            <div className="flex items-center gap-2">
                                                                <Input type="number" className="h-12" placeholder="0" {...register(option.id)} />
                                                                {option.unit && <span className="text-sm text-slate-500 whitespace-nowrap">{option.unit}</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
