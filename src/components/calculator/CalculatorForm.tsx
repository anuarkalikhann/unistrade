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
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

export const CalculatorForm = () => {
    const currentProduct = useAppStore((state) => state.currentProduct);
    const formData = useAppStore((state) => state.formData);
    const updateFormData = useAppStore((state) => state.updateFormData);

    const { control, watch, register, setValue } = useForm({
        defaultValues: formData,
        mode: 'onChange',
    });

    const isGateProduct = ['sliding-gates', 'swing-gates', 'sectional-gates'].includes(currentProduct?.id || '');
    const addWicket = watch('add_wicket');
    const wicketRule = PRICING_RULES['wicket'];

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
                                    <div className="relative">
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="h-12 pr-10">
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
                                        {field.value && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    field.onChange("");
                                                }}
                                                className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors z-20"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
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
                                                                    <div className="relative">
                                                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                                                            <SelectTrigger className="h-12 pr-10">
                                                                                <SelectValue placeholder="Выберите..." />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {option.options?.map((opt) => (
                                                                                    <SelectItem key={opt.value} value={opt.value}>
                                                                                        {opt.label} {!option.hidePriceInLabel && (
                                                                                            <>
                                                                                                {opt.price > 0 ? ` (+${opt.price} сом)` :
                                                                                                    (opt.price === 0 && !['turnstile_model', 'barrier_model'].includes(option.id)) ? ' (учтено)' : ''}
                                                                                            </>
                                                                                        )}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        {field.value && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    field.onChange("");
                                                                                }}
                                                                                className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors z-20"
                                                                            >
                                                                                <X size={16} />
                                                                            </button>
                                                                        )}
                                                                    </div>
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
                                                                    <div className="relative">
                                                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                                                            <SelectTrigger className="h-12 pr-10">
                                                                                <SelectValue placeholder="Выберите..." />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="no">Нет</SelectItem>
                                                                                <SelectItem value="yes">Да</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        {field.value && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    field.onChange("");
                                                                                }}
                                                                                className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors z-20"
                                                                            >
                                                                                <X size={16} />
                                                                            </button>
                                                                        )}
                                                                    </div>
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
                                                                    <div className="relative">
                                                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                                                            <SelectTrigger className="h-12 pr-10">
                                                                                <SelectValue placeholder="Выберите..." />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {option.options?.map((opt) => (
                                                                                    <SelectItem key={opt.value} value={opt.value}>
                                                                                        {opt.label} {!option.hidePriceInLabel && (
                                                                                            <>
                                                                                                {opt.price > 0 ? ` (+${opt.price} сом)` :
                                                                                                    (opt.price === 0 && !['turnstile_model', 'barrier_model'].includes(option.id)) ? ' (учтено)' : ''}
                                                                                            </>
                                                                                        )}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        {field.value && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    field.onChange("");
                                                                                }}
                                                                                className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors z-20"
                                                                            >
                                                                                <X size={16} />
                                                                            </button>
                                                                        )}
                                                                    </div>
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

            {/* Wicket Section if added */}
            {isGateProduct && addWicket && (
                <div className="space-y-6 pt-4 border-t-2 border-dashed border-slate-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">Дополнительно: Калитка</h2>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => setValue('add_wicket', false)}
                            className="flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Удалить калитку
                        </Button>
                    </div>

                    <Card className="border-blue-100 bg-blue-50/10">
                        <CardContent className="pt-6 space-y-8">
                            {(() => {
                                if (!wicketRule) return null;
                                const sections: Record<string, any[]> = {};
                                wicketRule.options?.forEach(opt => {
                                    const section = opt.section || 'Общее';
                                    if (!sections[section]) sections[section] = [];
                                    sections[section].push(opt);
                                });

                                return Object.entries(sections).map(([sectionTitle, options]) => (
                                    <div key={sectionTitle} className="space-y-6">
                                        <h3 className="font-semibold text-slate-900 border-b border-blue-100 pb-2 mb-4">{sectionTitle}</h3>
                                        <div className="grid gap-6">
                                            {options.map((option) => (
                                                <div key={option.id} className="space-y-2">
                                                    <Label className="text-base">{option.label}</Label>

                                                    {option.type === 'select' && (
                                                        <Controller
                                                            name={`wicket_${option.id}`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <div className="relative">
                                                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                                                        <SelectTrigger className="h-12 bg-white">
                                                                            <SelectValue placeholder="Выберите..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {option.options?.map((opt: any) => (
                                                                                <SelectItem key={opt.value} value={opt.value}>
                                                                                    {opt.label} {opt.price > 0 ? ` (+${opt.price} сом)` : ''}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    {field.value && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                field.onChange("");
                                                                            }}
                                                                            className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 z-20"
                                                                        >
                                                                            <X size={16} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        />
                                                    )}

                                                    {option.type === 'number' && (
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                type="number"
                                                                className="h-12 bg-white"
                                                                placeholder="0"
                                                                {...register(`wicket_${option.id}`)}
                                                            />
                                                            {option.unit && <span className="text-sm text-slate-500 whitespace-nowrap">{option.unit}</span>}
                                                        </div>
                                                    )}

                                                    {option.type === 'input' && (
                                                        <Input
                                                            type="text"
                                                            className="h-12 bg-white"
                                                            {...register(`wicket_${option.id}`)}
                                                        />
                                                    )}

                                                    {option.type === 'boolean' && (
                                                        <Controller
                                                            name={`wicket_${option.id}`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <div className="relative">
                                                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                                                        <SelectTrigger className="h-12 bg-white">
                                                                            <SelectValue placeholder="Выберите..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="no">Нет</SelectItem>
                                                                            <SelectItem value="yes">Да</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    {field.value && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                field.onChange("");
                                                                            }}
                                                                            className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 z-20"
                                                                        >
                                                                            <X size={16} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ));
                            })()}
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Add Wicket Button */}
            {isGateProduct && !addWicket && (
                <div className="flex justify-center py-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="h-14 px-8 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold text-lg gap-2 rounded-xl transition-all hover:scale-105"
                        onClick={() => setValue('add_wicket', true)}
                    >
                        <Plus size={24} />
                        Добавить калитку
                    </Button>
                </div>
            )}

            {/* Contact Section */}
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <h3 className="font-semibold text-slate-900 border-b pb-2 mb-4">Контактные данные</h3>
                    <div className="space-y-2">
                        <Label htmlFor="clientName">Имя и Фамилия клиента</Label>
                        <Input
                            id="clientName"
                            type="text"
                            placeholder="Иван Иванов"
                            className="h-12 text-lg"
                            {...register('clientName')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clientAddress">Адрес клиента</Label>
                        <Input
                            id="clientAddress"
                            type="text"
                            placeholder="г. Бишкек, ул. ..."
                            className="h-12 text-lg"
                            {...register('clientAddress')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Номер телефона</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+996..."
                            className="h-12 text-lg"
                            {...register('phone')}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
