import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { PRICING_RULES } from '@/constants/pricingRules';
import { AWNINGS_PRICING_TABLE, EUR_TO_KGS, AwningPricingEntry } from '@/constants/awningsData';

export const usePriceCalculator = () => {
    const currentProduct = useAppStore((state) => state.currentProduct);
    const formData = useAppStore((state) => state.formData);

    // We can calculate directly or sync to store. 
    // Calculating derived state during render is better for performance usually, but we might want to store it.

    if (!currentProduct) return 0;

    const rule = PRICING_RULES[currentProduct.id];
    if (!rule) return 0;

    // 1. Dimensions (Moved to top scope for shared availability)
    const width = parseFloat(formData.width || '0');
    const height = parseFloat(formData.height || '0');
    const projection = parseFloat(formData.projection || '0');
    const length = parseFloat(formData.length || '0');

    let structurePrice = 0;

    // Strategy 1: Dimensions Step Logic (Default if not specified or 'standard')
    const strategy = rule.pricingStrategy || 'standard';

    if (strategy === 'standard') {
        let dimensionPrice = 0;
        if (rule.dimensions) {
            const { basePrice, baseWidth, baseHeight, widthStep, widthPricePerStep, heightStep, heightPricePerStep } = rule.dimensions;
            dimensionPrice = basePrice;

            if (width > baseWidth) {
                const widthDiff = width - baseWidth;
                const widthStepsCount = Math.ceil(widthDiff / widthStep);
                dimensionPrice += widthStepsCount * widthPricePerStep;
            }

            if (height > baseHeight) {
                const heightDiff = height - baseHeight;
                const heightStepsCount = Math.ceil(heightDiff / heightStep);
                dimensionPrice += heightStepsCount * heightPricePerStep;
            }
        }

        let frameMultiplier = 1;
        const selectedFrameValue = formData.frame;
        if (rule.frames && selectedFrameValue) {
            const frame = rule.frames.find(f => f.value === selectedFrameValue);
            if (frame && frame.priceType === 'multiplier') {
                frameMultiplier += frame.priceValue;
            }
        }

        structurePrice = dimensionPrice * frameMultiplier;

        // SPECIAL OVERRIDE FOR AWNINGS PRODUCTION LOOKUP
        if (currentProduct.id === 'awnings-production') {
            const model = formData.model;
            const fabric = formData.fabric;
            const angle = formData.angle ? parseInt(formData.angle) : undefined;
            const w_m = width / 1000;
            const p_m = projection / 1000;

            const modelEntries = AWNINGS_PRICING_TABLE.filter((e: AwningPricingEntry) => {
                const matchesModel = e.model === model;
                const matchesFabric = e.fabric === fabric;
                const matchesAngle = e.angle ? e.angle === angle : true;
                return matchesModel && matchesFabric && matchesAngle;
            });

            if (modelEntries.length > 0) {
                const possibleWidths = Array.from(new Set(modelEntries.map((e: AwningPricingEntry) => e.width_m))).sort(
                    (a: number, b: number) => a - b
                );
                const targetWidth = possibleWidths.find((w: number) => w >= w_m);

                if (targetWidth) {
                    const widthEntries = modelEntries.filter((e: AwningPricingEntry) => e.width_m === targetWidth);
                    const possibleProjections = Array.from(
                        new Set(widthEntries.map((e: AwningPricingEntry) => e.projection_m))
                    ).sort((a: number, b: number) => a - b);
                    const targetProjection = possibleProjections.find((p: number) => p >= p_m);

                    if (targetProjection) {
                        const entry = widthEntries.find((e: AwningPricingEntry) => e.projection_m === targetProjection);
                        if (entry) {
                            structurePrice = entry.price_eur * EUR_TO_KGS;
                        }
                    }
                }
            }
        }
    } else if (strategy === 'area') {
        const areaM2 = (width * height) / 1000000; // mm to m^2
        let pricePerSqm = 0;

        // Specific Rule: Black Color + L-Gofr Design -> Override Price
        const color = formData.color;
        const design = formData.design;

        if (color === 'black' && design === 'l_gofr') {
            pricePerSqm = 14500;
        } else if (rule.areaPriceRules) {
            // Find applicable tier
            const tier = rule.areaPriceRules.find(r => areaM2 <= r.maxArea);
            if (tier) {
                pricePerSqm = tier.price;
            } else {
                // Fallback to highest tier or base
                pricePerSqm = rule.areaPriceRules[rule.areaPriceRules.length - 1].price;
            }
        }

        structurePrice = Math.ceil(areaM2 * pricePerSqm);

        // Apply multipliers (e.g. Color Black +8% if NOT covered by specific rule?)
        // Wait, prompt says: "Condition: color == 'black' AND design == 'L гофр' -> override 14500. NOTE: This combo is always 14500."
        // Also "Condition: color == 'black' -> +8%".
        // Does the override ALREADY include the +8%? Or is +8% added ON TOP?
        // Prompt Note: "Эта комбинация всегда считается по 14500, независимо от квадратуры".
        // And "Если выбран черный цвет, применяется наценка 8%. Проверьте также правило базовой цены для L-гофр."
        // Interpretation: 
        // 1. If Black + L-Gofr: Base Rate = 14500. Multiplier 8%? 
        //    "Эта комбинация всегда считается по 14500... (regardless of area)". 
        //    Usually implies 14500 IS the final base rate. 
        //    But does the 8% apply? "Проверьте также правило базовой цены".
        //    Likely: 14500 is the rate. The 8% is separate? 
        //    Let's assume: 14500 is the BASE, and +8% applies if color is black?
        //    OR: 14500 is the SPECIAL rate for that combo, inclusive? 
        //    Given "14500 (usually for <= 8.5)" vs "13500 (for > 8.5)".
        //    Black + L-Gofr forces the higher rate (14500) even for large gates.
        //    Does it also get +8%? 14500 * 1.08?
        //    Re-reading: "Note: This combination is always calculated at 14500, regardless of square footage."
        //    And "Color... Black: +8%... Note: If Black is selected, +8% applies."
        //    I will implement: Base Rate determined by generic rules OR override. 
        //    THEN apply multipliers (Color, etc.) to the calculated structure price.
        //    So: 14500 * Area * 1.08 (if black multiplier applies).

        let multipliers = 0;

        // Handle Frame Modifiers (Lift Type)
        if (rule.frames) { // reusing frames for lift type or generic multiplier options logic
            rule.frames.forEach(f => {
                // But wait, structure logic usually selects ONE frame.
                // In my rules above, I put Lift Type into 'frames'. 
                // We need to know WHICH one is selected.
                // In standard logic `selectedFrameValue` comes from `formData.frame`.
                // But I might have named it something else?
                // In products.ts I didn't verify the ID mapping for Sectional.
                // I put them in `frames` array in pricingRules.ts.
                // But CalculatorForm uses `formData.frame` for the frame select.
                // So I need to ensure the Sectional Gates use `frame` for Lift Type?
                // Or I should treat Lift Type as just another Option?
                // Existing UI renders "Frame" section separately. 
                // Let's assume Lift Type IS the Frame equivalent for Sectional.
                // `formData.frame` will hold 'standard', 'low', etc.
                const val = formData.frame;
                if (val === f.value) {
                    multipliers += f.priceValue;
                }
            });
        }

        // Apply multipliers from OPTIONS logic? 
        // Standard checks options later. 
        // But Color is an option. 
        // Let's let the option logic handle specific multipliers.
        // BUT Frame needs to be handled here if it's separated.
        // Current code: `let structurePrice = dimensionPrice * frameMultiplier;`

        // So for Area:
        structurePrice = structurePrice * (1 + multipliers);
    }

    // 3. Options (Shared Logic) -> But need to ensure Multipliers apply to the NEW structurePrice
    // Existing logic: 
    // `optionsPrice += (structurePrice * selected.price)` -> This works.

    // So if options (Color Black) has `price: 0.08` (multiplier), it adds `structurePrice * 0.08`.
    // Total = Structure + (Structure * 0.08) = Structure * 1.08. Correct.


    // 3. Options
    let optionsPrice = 0;
    if (rule.options) {
        rule.options.forEach(opt => {
            const value = formData[opt.id];
            if (!value) return;

            // Special case for 'awnings-production' global quantity - skip from options sum
            if (currentProduct.id === 'awnings-production' && opt.id === 'quantity') return;

            // Handle Select
            if (opt.type === 'select' && opt.options) {
                const selected = opt.options.find(o => o.value === value);
                if (selected) {
                    if (opt.priceType === 'fixed') {
                        optionsPrice += selected.price;
                    } else if (opt.priceType === 'multiplier') {
                        optionsPrice += (structurePrice * selected.price);
                    }
                }
            }

            if ((opt.type === 'number' || opt.type === 'input') && opt.priceType === 'quantity') {
                const quantity = parseFloat(value || '0');
                if (!isNaN(quantity)) {
                    let pricePerUnit = opt.pricePerUnit || 0;

                    if (opt.dependsOn && opt.dependentPriceRules) {
                        const dependentValue = formData[opt.dependsOn];
                        if (dependentValue && opt.dependentPriceRules[dependentValue] !== undefined) {
                            pricePerUnit = opt.dependentPriceRules[dependentValue];
                        }
                    }

                    if (pricePerUnit) {
                        optionsPrice += quantity * pricePerUnit;
                    }
                }
            }
        });
    }

    let result = structurePrice + optionsPrice;

    // 4. Global Multipliers and Special Formulas
    if (currentProduct.id === 'awnings-production') {
        const qty = parseFloat(formData.quantity || '1');
        if (!isNaN(qty) && qty > 0) {
            result *= qty;
        }
    } else if (currentProduct.id === 'umbrellas-production') {
        // Formula: Total = (Price_for_size * quantity) + unaccounted_costs
        // In our PRICING_RULES, 'unaccounted_costs' is in options.
        // We need to re-calculate to separate them.

        let priceForSize = 0;
        const sizeOpt = rule.options?.find(o => o.id === 'selected_size');
        if (sizeOpt && sizeOpt.options) {
            const selectedVal = formData['selected_size'];
            const selected = sizeOpt.options.find(o => o.value === selectedVal);
            if (selected) priceForSize = selected.price;
        }

        const qty = parseFloat(formData.quantity || '1');
        const unaccounted = parseFloat(formData.unaccounted_costs || '0');

        result = (priceForSize * qty) + unaccounted;
    } else if (currentProduct.id === 'ready-made-awnings' || currentProduct.id === 'ready-made-umbrellas-3x3-light') {
        const qty = parseFloat(formData.quantity || '1');
        if (!isNaN(qty) && qty > 0) {
            result *= qty;
        }
    } else if (currentProduct.id === 'pergolas-production') {
        // Special logic: Area is width * length.
        // optionsPrice already includes fixed additions (anchors, cable, etc. which are quantity-based in rules)
        // and it also includes the model select price (which we currently have as price_per_m2).
        // So we need to re-calculate: (Area * ModelPrice) + (OtherOptions)

        const areaM2 = (width * length) / 1000000;
        let modelPricePerM2 = 0;
        const modelOpt = rule.options?.find(o => o.id === 'model');
        if (modelOpt && modelOpt.options) {
            const selectedVal = formData['model'];
            const selected = modelOpt.options.find(o => o.value === selectedVal);
            if (selected) modelPricePerM2 = selected.price;
        }

        // We need to subtract the 'model' fixed price from optionsPrice if it was added there,
        // or just calculate from scratch.
        // Standard logic: optionsPrice += selected.price (if fixed).
        // Since model is 'fixed', it's in optionsPrice.

        // Let's recalculate correctly:
        // total = (area * modelPrice) + (anchors * 700) + (cable * 180) + (chipping * 500) + unaccounted

        // Re-read options logic: 
        // anchors, cable, chipping, unaccounted are 'quantity' type.
        // and they are added to optionsPrice.

        structurePrice = areaM2 * modelPricePerM2;

        // Subtract model price from optionsPrice to avoid double counting
        const currentOptionsPrice = optionsPrice - modelPricePerM2;

        result = structurePrice + currentOptionsPrice;

        const qty = parseFloat(formData.quantity || '1');
        if (!isNaN(qty) && qty > 0) {
            result *= qty;
        }
    } else if (currentProduct.id === 'ready-made-bioclimatic-pergolas') {
        const qty = parseFloat(formData.quantity || '1');
        const selectedSize = formData['selected_size'];

        let priceOfSelectedSize = 0;
        let totalM2 = 0;

        const sizeOpt = rule.options?.find(o => o.id === 'selected_size');
        if (sizeOpt && sizeOpt.options) {
            const selected = sizeOpt.options.find(o => o.value === selectedSize);
            if (selected) {
                priceOfSelectedSize = selected.price;
                // Extract m2 from value (e.g. "3x3" -> 9)
                const dims = selected.value.split('x').map(d => parseFloat(d));
                if (dims.length === 2) {
                    totalM2 = dims[0] * dims[1];
                }
            }
        }

        const step1 = priceOfSelectedSize * qty;

        let step2 = 0;
        if (formData['installation_required'] === 'yes') {
            step2 = totalM2 * 3600;
        }

        // step3 (additional works) and step4 (misc) are already in optionsPrice 
        // since we defined them as options with quantity price type.
        // However, standard logic adds ALL options. 
        // We need to re-calculate to be precise.

        const anchors = parseFloat(formData.chemical_anchors || '0');
        const cable = parseFloat(formData.power_cable || '0');
        const chasing = parseFloat(formData.wall_chasing || '0');
        const unaccounted = parseFloat(formData.unaccounted_sum || '0');

        const step3 = (anchors * 700) + (cable * 180) + (chasing * 500);
        const step4 = unaccounted;

        result = step1 + step2 + step3 + step4;
    } else if (currentProduct.id === 'bloom-zip') {
        const qty = parseFloat(formData.quantity || '1');
        if (!isNaN(qty) && qty > 0) {
            result *= qty;
        }
    } else if (currentProduct.id === 'frameless-glazing') {
        const w = parseFloat(formData.width_mm || '0');
        const h = parseFloat(formData.height_mm || '0');
        const holes = parseFloat(formData.holes_count || '0');
        const overhead = parseFloat(formData.overhead_costs || '0');

        const area = (w / 1000) * (h / 1000);

        // Total = (Area * 8900) + (Area * 1500) + (holes * 2500) + overhead
        result = (area * 8900) + (area * 1500) + (holes * 2500) + overhead;
    } else if (currentProduct.id === 'soft-windows') {
        const wb = parseFloat(formData.width_bottom || '0');
        const wt = parseFloat(formData.width_top || '0');
        const hl = parseFloat(formData.height_left || '0');
        const hr = parseFloat(formData.height_right || '0');

        const area = (((wb + wt) / 2) * ((hl + hr) / 2)) / 1000000;

        const zippers = parseFloat(formData.zipper_quantity || '0');
        const frameAdd = parseFloat(formData.frame_additional_cost || '0');
        const miscAdd = parseFloat(formData.miscellaneous_additional_cost || '0');

        // Total = (Area_m2 * film_price_per_m2[2700]) + (zipper_quantity * zipper_price_per_unit[2000]) + frame_additional_cost + miscellaneous_additional_cost
        result = (area * 2700) + (zippers * 2000) + frameAdd + miscAdd;
    }

    return Math.round(result);
};
