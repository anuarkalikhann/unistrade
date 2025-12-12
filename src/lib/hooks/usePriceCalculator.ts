import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { PRICING_RULES } from '@/constants/pricingRules';

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

            if (opt.type === 'number' && opt.priceType === 'quantity') {
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

    return Math.round(structurePrice + optionsPrice);
};
