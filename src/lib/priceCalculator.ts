import { PRICING_RULES } from '@/constants/pricingRules';
import { AWNINGS_PRICING_TABLE, EUR_TO_KGS, AwningPricingEntry } from '@/constants/awningsData';
import { Product } from '@/types';

export interface OrderItem {
    order?: number;
    description: string;
    quantity: string | number;
    price: number;
    sum: number;
}

export interface PriceCalculationResult {
    total: number;
    items: OrderItem[];
}

export const calculatePrice = (currentProduct: Product | null, formData: Record<string, any>): PriceCalculationResult => {
    if (!currentProduct) return { total: 0, items: [] };

    const rule = PRICING_RULES[currentProduct.id];
    if (!rule) return { total: 0, items: [] };

    const items: OrderItem[] = [];

    // --- 1. Global Dimensions & Quantity ---
    const width = parseFloat(formData.width || '0');
    const height = parseFloat(formData.height || '0');
    const projection = parseFloat(formData.projection || '0');
    const length = parseFloat(formData.length || '0');

    // Global Quantity: Default to 1
    // Some products like 'awnings-production' have a specific 'quantity' field logic
    // But usually formData.quantity is the main one.
    let globalQty = 1;
    if (formData.quantity) {
        const parsed = parseFloat(formData.quantity);
        if (!isNaN(parsed) && parsed > 0) globalQty = parsed;
    }

    // --- 2. Calculate Base Structure Unit Price ---
    let unitStructurePrice = 0;
    let structureDescription = `${currentProduct.name}`;

    // Strategy 1: Dimensions Step Logic (Default if not specified or 'standard')
    const strategy = rule.pricingStrategy || 'standard';

    if (strategy === 'standard') {
        let dimensionPrice = 0;
        if (rule.dimensions) {
            const { basePrice, baseWidth, baseHeight, widthStep, widthPricePerStep, heightStep, heightPricePerStep } = rule.dimensions;
            dimensionPrice = basePrice;

            if (width > baseWidth && widthStep > 0) {
                const widthDiff = width - baseWidth;
                const widthStepsCount = Math.ceil(widthDiff / widthStep);
                dimensionPrice += widthStepsCount * widthPricePerStep;
            }

            if (height > baseHeight && heightStep > 0) {
                const heightDiff = height - baseHeight;
                const heightStepsCount = Math.ceil(heightDiff / heightStep);
                dimensionPrice += heightStepsCount * heightPricePerStep;
            }
            // Add dimension info to description
            if (width > 0 || height > 0) {
                structureDescription += ` (${width}x${height})`;
            }
        }

        let frameMultiplier = 1;
        const selectedFrameValue = formData.frame;
        if (rule.frames && selectedFrameValue) {
            const frame = rule.frames.find(f => f.value === selectedFrameValue);
            if (frame) {
                if (frame.priceType === 'multiplier') {
                    frameMultiplier += frame.priceValue;
                }
                // We won't add frame to description here if we want it as a separate item?
                // But wait, frame applies a multiplier to the STRUCTURE.
                // The user wants "All fields".
                // Detailed breakdown:
                // Row 1: Structure (Price per unit).
                // Row 2: Frame Option (if it's a separate line?).
                // If Frame is a multiplier, it modifies the Base Price.
                // Usually, "Structure with Frame X" is one line item for the main product.
                // OR: Base Structure Price.
                // Frame Markup Price.
                // let's stick to modifying the structure price for now, but list it in description
                structureDescription += ` (Каркас: ${frame.label})`;
            }
        }

        unitStructurePrice = dimensionPrice * frameMultiplier;

        // SPECIAL OVERRIDE FOR AWNINGS PRODUCTION LOOKUP
        if (currentProduct.id === 'awnings-production') {
            const model = formData.model;
            // Model is usually the main selector.
            // We should put the model name in the description.
            if (model) {
                // Try to find label if possible, or just capitalize
                structureDescription = `Маркиза ${model.charAt(0).toUpperCase() + model.slice(1)}`;
            }

            const fabric = formData.fabric;
            const angle = formData.angle ? parseInt(formData.angle) : undefined;
            const rays = formData.rays ? parseInt(formData.rays) : undefined;
            const w_m = width / 100;
            const p_m = projection / 100;

            if (w_m > 0 && p_m > 0) {
                structureDescription += ` (${w_m}м x ${p_m}м)`;
            }

            const modelEntries = AWNINGS_PRICING_TABLE.filter((e: AwningPricingEntry) => {
                const matchesModel = e.model === model;
                const matchesFabric = e.fabric === fabric;
                const matchesAngle = e.angle ? e.angle === angle : true;
                const matchesRays = e.rays ? e.rays === rays : true;
                return matchesModel && matchesFabric && matchesAngle && matchesRays;
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
                            unitStructurePrice = entry.price_eur * EUR_TO_KGS;
                        }
                    }
                }
            }
        }

        // SPECIAL OVERRIDE FOR BLOOM ZIP
        if (currentProduct.id === 'bloom-zip') {
            const w_m = width / 1000; // mm to m
            const p_m = height / 1000; // mm to m (Height maps to Projection)

            structureDescription = `Bloom Zip`;
            if (w_m > 0 && p_m > 0) {
                structureDescription += ` (${w_m.toFixed(2)}м x ${p_m.toFixed(2)}м)`;
            }

            const modelEntries = AWNINGS_PRICING_TABLE.filter((e: AwningPricingEntry) => {
                return e.model === 'BLOOM_ZIP' && e.fabric === 'Docril';
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
                            unitStructurePrice = entry.price_eur * EUR_TO_KGS;
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
            structureDescription += ' (Черный + L-гофр)';
        } else if (rule.areaPriceRules) {
            const tier = rule.areaPriceRules.find(r => areaM2 <= r.maxArea);
            if (tier) {
                pricePerSqm = tier.price;
            } else {
                pricePerSqm = rule.areaPriceRules[rule.areaPriceRules.length - 1].price;
            }
        }

        let baseUnitCost = Math.ceil(areaM2 * pricePerSqm);
        let multipliers = 0;

        if (rule.frames) {
            rule.frames.forEach(f => {
                const val = formData.frame;
                if (val === f.value) {
                    multipliers += f.priceValue;
                    structureDescription += ` (${f.label})`;
                }
            });
        }

        unitStructurePrice = baseUnitCost * (1 + multipliers);
        structureDescription += ` (${areaM2.toFixed(2)} м²)`;
    }

    // --- Special Product Overrides for 'Structure' ---
    if (currentProduct.id === 'umbrellas-production') {
        const sizeOpt = rule.options?.find(o => o.id === 'selected_size');
        if (sizeOpt && sizeOpt.options) {
            const selectedVal = formData['selected_size'];
            const selected = sizeOpt.options.find(o => o.value === selectedVal);
            if (selected) {
                unitStructurePrice = selected.price;
                structureDescription = `Зонт ${selected.label}`;
            }
        }
    } else if (currentProduct.id === 'pergolas-production') {
        const areaM2 = (width * length) / 1000000;
        let modelPricePerM2 = 0;
        const modelOpt = rule.options?.find(o => o.id === 'model');
        let selectedLabel = '';
        if (modelOpt && modelOpt.options) {
            const selectedVal = formData['model'];
            const selected = modelOpt.options.find(o => o.value === selectedVal);
            if (selected) {
                modelPricePerM2 = selected.price;
                selectedLabel = selected.label;
            }
        }
        unitStructurePrice = areaM2 * modelPricePerM2;
        structureDescription = `Пергола ${selectedLabel} (${areaM2.toFixed(2)} м²)`;
    } else if (currentProduct.id === 'ready-made-bioclimatic-pergolas') {
        const selectedSize = formData['selected_size'];
        const sizeOpt = rule.options?.find(o => o.id === 'selected_size');
        if (sizeOpt && sizeOpt.options) {
            const selected = sizeOpt.options.find(o => o.value === selectedSize);
            if (selected) {
                unitStructurePrice = selected.price;
                structureDescription = `Биоклиматическая пергола ${selected.label}`;
            }
        }
    } else if (currentProduct.id === 'frameless-glazing') {
        const w = parseFloat(formData.width_mm || '0');
        const h = parseFloat(formData.height_mm || '0');
        const area = (w / 1000) * (h / 1000);
        // Base is area * 8900
        unitStructurePrice = area * 8900;
        structureDescription = `Безрамное остекление (${area.toFixed(2)} м²)`;
    } else if (currentProduct.id === 'soft-windows') {
        const wb = parseFloat(formData.width_bottom || '0');
        const wt = parseFloat(formData.width_top || '0');
        const hl = parseFloat(formData.height_left || '0');
        const hr = parseFloat(formData.height_right || '0');
        const area = (((wb + wt) / 2) * ((hl + hr) / 2)) / 1000000;

        unitStructurePrice = area * 2700;
        structureDescription = `Мягкие окна (${area.toFixed(2)} м²)`;
    } else if (['turnstile', 'barrier', 'barrier-anti-vandal'].includes(currentProduct.id)) {
        // Special logic: Price is defined in the 'quantity' option using dependentPriceRules
        const qtyOpt = rule.options?.find(o => o.id === 'quantity');
        if (qtyOpt && qtyOpt.dependsOn && qtyOpt.dependentPriceRules) {
            const dependentVal = formData[qtyOpt.dependsOn];
            // dependentPriceRules keys match the value of the 'dependsOn' select
            if (dependentVal && qtyOpt.dependentPriceRules[dependentVal]) {
                unitStructurePrice = qtyOpt.dependentPriceRules[dependentVal];

                // Update description with model name
                const modelOpt = rule.options?.find(o => o.id === qtyOpt.dependsOn);
                const selectedModel = modelOpt?.options?.find(o => o.value === dependentVal);
                if (selectedModel) {
                    // Extract simpler name if possible? Or use label.
                    structureDescription = `${currentProduct.name}: ${selectedModel.label}`;
                }
            }
        }
    }

    // --- 3. Add Main Item Row ---
    // If unitStructurePrice > 0 OR if it's the main product we always want it.
    items.push({
        description: structureDescription,
        quantity: globalQty,
        price: Math.round(unitStructurePrice),
        sum: Math.round(unitStructurePrice * globalQty)
    });

    let totalOptionsSum = 0;

    // --- 4. Iterate ALL Options (Full Data Coverage) ---
    if (rule.options) {
        rule.options.forEach(opt => {
            const val = formData[opt.id];

            // Skip ONLY if totally undefined/null/empty string AND strict checking?
            // "All fields on the form".
            // If the field is rendered, it usually has a default or selected value.
            // If val is undefined, maybe it's not visible/rendered?
            // But checking 'visibleIf' is hard without component logic.
            // Let's assume valid values are present in formData. 
            // If formData has the key, we show it.
            // If valid 'visibleIf' logic check:
            if (opt.visibleIf) {
                const parentVal = formData[opt.visibleIf.optionId];
                // If parent value doesn't match, we likely shouldn't show it as "0", 
                // effectively it's not part of the order.
                if (!opt.visibleIf.values.includes(parentVal)) {
                    return;
                }
            }

            // Also exclude 'width', 'height', 'projection' if they are top-level dimensions
            // (Used in structure description, not separate items usually).
            // But if defined as options? Usually they are not in `rule.options`, they are inputs.
            // Check pricingRules.ts -> some might be there.

            // Exclude 'model' if it was used for Structure Name (for awnings/pergolas)
            if ((currentProduct.id === 'awnings-production' || currentProduct.id === 'pergolas-production') && opt.id === 'model') return;

            // Exclude model options for turnstiles and barriers as they are now the Main Item Name
            if (currentProduct.id === 'turnstile' && opt.id === 'turnstile_model') return;
            if ((currentProduct.id === 'barrier' || currentProduct.id === 'barrier-anti-vandal') && opt.id === 'barrier_model') return;

            // Exclude structural options for bloom-zip to prevent duplicate/empty line items
            if (currentProduct.id === 'bloom-zip' && ['width', 'height', 'quantity'].includes(opt.id)) return;

            // Exclude 'selected_size' if used
            if ((currentProduct.id === 'umbrellas-production' || currentProduct.id === 'ready-made-bioclimatic-pergolas') && opt.id === 'selected_size') return;

            // Exclude 'include_tax' option from items list (it is handled separately)
            if (opt.id === 'include_tax') return;

            // Exclude 'quantity' option for products where it drives the Base Structure Price (to avoid double counting)
            if (['turnstile', 'barrier', 'barrier-anti-vandal'].includes(currentProduct.id) && opt.id === 'quantity') return;


            let displayLabel = opt.label;
            let displayValue = val;
            let itemUnitPrice = 0;
            let itemQuantity = 1; // Quantity of this option per GLOBAL Unit? Or Total?
            // Strategy: 
            // If option is 'quantity' based (e.g. 5 meters cable). Is it 5 m TOTAL? Or 5 m PER UNIT?
            // Usually form inputs 'quantity' type are totals or per unit? 
            // User context: "Turnstile X ... Qty 1". "Card Reader ... Qty 1".
            // If I order 3 turnstiles, I likely want 3 readers if I selected 1.
            // But some inputs are explicit "Total length".
            // Let's assume:
            // - Select/Boolean: 1 per Global Unit. Total Qty = Global Qty.
            // - Number/Input (Quantity type): The value IS the quantity. 
            //   - Is it per unit? "Holes count". If 10 holes. 3 windows. 30 holes?
            //   - Usually inputs are specific.
            //   Let's check `frameless-glazing`: `holes_count`.
            //   Logic: `holes * 2500`. 
            //   If I request multiple glazings? Usually frameless glazing is "Dimensions -> Area". 
            //   Quantity is implicitly 1 huge order? 
            //   Let's look at simple products. Turnstile.
            //   Option "Card Reader". Select "Yes".
            //   Logic: If global qty 5. we need 5 readers.
            //   So for Select/Boolean, Quantity = Global Qty.

            //   Option "Extra Cable (m)". Input "10".
            //   Is it 10m total? Or 10m per turnstile?
            //   Probably 10m total for the project.
            //   Let's assume Number/Input values are ABSOLUTE totals unless specific.

            if (val === undefined || val === null || val === '') {
                // Even if empty, if we need "All fields", maybe show "Not specified"?
                // But usually empty means untouched.
                // Let's skip truly empty.
                return;
            }

            // 1. SELECT / BOOLEAN
            if (opt.type === 'select' || opt.type === 'boolean') {
                const found = opt.options?.find(o => o.value === val);
                if (found) {
                    displayValue = found.label;

                    // Price Logic
                    if (opt.priceType === 'fixed') {
                        itemUnitPrice = found.price;
                    } else if (opt.priceType === 'multiplier') {
                        // Multiplier applies to STRUCTURE price.
                        // Price = (StructurePrice * Multiplier).
                        itemUnitPrice = unitStructurePrice * found.price;
                    }
                } else {
                    // Boolean fallback or direct value
                    if (val === 'yes') displayValue = 'Да';
                    else if (val === 'no') displayValue = 'Нет';
                }

                // For Select/Boolean, we assume 1 per Main Unit.
                // So Total Quantity = Global Qty.
                // Sum = Unit Price * Global Qty.
                items.push({
                    description: `${displayLabel}: ${displayValue}`,
                    quantity: globalQty,
                    price: Math.round(itemUnitPrice),
                    sum: Math.round(itemUnitPrice * globalQty)
                });
                totalOptionsSum += (itemUnitPrice * globalQty);
            }

            // 2. NUMBER / INPUT
            else if (opt.type === 'number' || opt.type === 'input') {
                // Correctly handle text inputs (like notes) where parsing as float fails
                if (opt.type === 'input') {
                    // For text inputs or 'input' type, we display the value as string.
                    // Assuming 'input' type is mostly used for "fixed" price info (priceValue=0) or just descriptions.
                    // If it has a priceValue, we add it. 
                    items.push({
                        description: `${displayLabel}: ${val}`,
                        quantity: globalQty,
                        price: opt.priceValue || 0,
                        sum: Math.round((opt.priceValue || 0) * globalQty)
                    });
                    totalOptionsSum += ((opt.priceValue || 0) * globalQty);
                    return;
                }

                const parsedVal = parseFloat(val);
                if (isNaN(parsedVal)) return;

                if (opt.priceType === 'quantity') {
                    let pricePerUnit = opt.pricePerUnit || 0;
                    if (opt.dependsOn && opt.dependentPriceRules) {
                        const dependentValue = formData[opt.dependsOn];
                        if (dependentValue && opt.dependentPriceRules[dependentValue] !== undefined) {
                            pricePerUnit = opt.dependentPriceRules[dependentValue];
                        }
                    }

                    // Here, parsedVal is the quantity (e.g. 10 meters).
                    // We assume this is TOTAL quantity for the order line.
                    items.push({
                        description: displayLabel,
                        quantity: parsedVal,
                        price: pricePerUnit,
                        sum: Math.round(parsedVal * pricePerUnit)
                    });
                    totalOptionsSum += (parsedVal * pricePerUnit);

                } else if (opt.priceType === 'fixed') {
                    // Allow 0 price items (removed check for opt.priceValue)
                    items.push({
                        description: `${displayLabel}: ${val}`,
                        quantity: globalQty,
                        price: opt.priceValue || 0,
                        sum: Math.round((opt.priceValue || 0) * globalQty)
                    });
                    totalOptionsSum += ((opt.priceValue || 0) * globalQty);
                }
            }
        });
    }

    // --- 5. Installation & Additional Works (Special Logic Products) ---
    // Some products like 'ready-made-bioclimatic-pergolas' have hardcoded logic not in 'options'.
    // We need to capture them.

    if (currentProduct.id === 'ready-made-bioclimatic-pergolas') {
        if (formData['installation_required'] === 'yes') {
            // We need size to calc installation
            // Re-finding size...
            // It was calculated in options? 
            // Wait, 'installation_required' IS an option in PRICING_RULES?
            // Let's check pricingRules.ts.
            // If it is in 'options', the loop above handled it?
            // Need to check if logic is generic or custom.
            // In 'ready-made-bioclimatic-pergolas', 'installation_required' is likely an option.
            // BUT cost is AREA * 3600.
            // The generic loop sees "Select: Yes". Price? 
            // If price is 0 in options config but calculated dynamically... 
            // Then the generic loop produced "Installation: Yes - 0".
            // We validly need to override or specifically handle Dynamic Prices that are not just simple multipliers/fixed.

            // Dynamic Handling:
            // Best way: check if we have specific logic.
            // For bioclimatic:
            const selectedSize = formData['selected_size']; // e.g. "3x3"
            let totalM2 = 0;
            if (selectedSize) {
                const dims = selectedSize.split('x').map((d: string) => parseFloat(d));
                if (dims.length === 2) totalM2 = dims[0] * dims[1];
            }
            const installPrice = totalM2 * 3600;

            // Find the item created by generic loop and update it?
            const installItem = items.find(i => i.description.includes('Монтаж'));
            if (installItem) {
                installItem.price = installPrice;
                installItem.sum = installPrice * globalQty;
                // Update totals?
                // The return total is re-calculated at end.
                totalOptionsSum += (installPrice * globalQty);
            } else {
                // Or add if missed (e.g. if 'installation_required' is not in options list but handled in code).
                // It IS in options likely.
                // But let's verify.
            }
        }
    } else if (currentProduct.id === 'frameless-glazing') {
        // Installation logic: Area * 1500.
        // Is there an option for it? Or mandatory?
        // In previous code: result += area * 1500.
        // Implies mandatory.
        // So we must manually add it.
        const w = parseFloat(formData.width_mm || '0');
        const h = parseFloat(formData.height_mm || '0');
        const area = (w / 1000) * (h / 1000);
        const installPrice = 1500;
        const qty = parseFloat(area.toFixed(2));

        items.push({
            description: 'Монтаж (м2)',
            quantity: qty,
            price: installPrice,
            sum: Math.round(qty * installPrice)
        });
        totalOptionsSum += (qty * installPrice);
    }


    // --- 6. Calculate Final Total ---
    // Total = (UnitStructurePrice * GlobalQty) + TotalOptionsSum
    // Do we need to recalc?
    // We already summed to `totalOptionsSum`.
    // Main Item sum is `unitStructurePrice * globalQty`.

    // Check if we didn't double count?
    // Generic loop adds correctly.
    // Special modifications updated items.

    // However, `totalOptionsSum` tracked in loop might be slightly off if we modify items later.
    // robust way: sum up `items.sum`.

    // --- 5.5. Tax Calculation ---
    // Re-sum all items first to get subtotal
    let finalTotal = items.reduce((acc, item) => acc + item.sum, 0);

    if (formData['include_tax'] === 'yes') {
        const taxAmount = finalTotal * 0.13;
        finalTotal += Math.round(taxAmount);

        // Use requested: Do NOT add tax item to list, but DO increase total price.
        /*
        items.push({
            description: 'НДС 12% и НСП 1%',
            quantity: 1,
            price: Math.round(taxAmount),
            sum: Math.round(taxAmount)
        });
        */
    }

    // Assign order/index to each item
    items.forEach((item, index) => {
        item.order = index + 1;
    });

    return {
        total: finalTotal,
        items: items
    };
};
