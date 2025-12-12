export type ProductId =
    | 'sliding-gates'
    | 'swing-gates'
    | 'sectional-gates'
    | 'barrier-anti-vandal'
    | 'barrier'
    | 'sliding-rework'
    | 'sliding-automation'
    | 'swing-automation'
    | 'sectional-repair'
    | 'turnstile'
    | 'wicket';

export interface Product {
    id: ProductId;
    name: string;
    image?: string; // Path to image or icon component name
}

// Pricing Rules Types
export interface DimensionsConfig {
    baseWidth: number;
    baseHeight: number;
    basePrice: number;
    widthStep: number;
    widthPricePerStep: number;
    heightStep: number;
    heightPricePerStep: number;
}

export interface FrameOption {
    label: string;
    value: string;
    priceType: 'fixed' | 'multiplier' | 'per-meter'; // multiplier is 1.07 for +7%
    priceValue: number;
}

export interface AdditionalOption {
    id: string;
    section?: string; // Grouping section title
    label: string;
    type: 'boolean' | 'select' | 'input' | 'number';
    priceType: 'fixed' | 'multiplier' | 'per-meter' | 'per-item' | 'quantity';
    priceValue?: number;
    pricePerUnit?: number;
    unit?: string;
    options?: { label: string; value: string; price: number }[]; // For select types
    dependsOn?: string; // ID of the option this price depends on
    dependentPriceRules?: Record<string, number>; // Map value of dependent option -> price per unit
}

export interface PricingRule {
    productId: ProductId;
    hideDimensions?: boolean; // New flag to hide width/height inputs
    pricingStrategy?: 'standard' | 'area';
    basePricePerSqm?: number;
    areaPriceRules?: { maxArea: number; price: number }[];
    dimensions?: DimensionsConfig;
    frames?: FrameOption[];
    options?: AdditionalOption[];
}

// Checklist Types
export interface ChecklistQuestion {
    id: string;
    text: string;
    type: 'yes-no' | 'select' | 'input';
    options?: string[]; // For select type
}

export interface ProductChecklist {
    productId: ProductId;
    questions: ChecklistQuestion[];
}

// Store Types
export interface CalculatorState {
    currentProduct: Product | null;
    formData: Record<string, any>;
    checklistData: Record<string, any>;
    totalPrice: number;
    setProduct: (product: Product) => void;
    updateFormData: (data: Record<string, any>) => void;
    updateChecklistData: (data: Record<string, any>) => void;
    reset: () => void;
}
