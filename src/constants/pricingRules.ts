import { PricingRule } from '@/types';

export const PRICING_RULES: Record<string, PricingRule> = {
    'sliding-gates': {
        productId: 'sliding-gates',
        dimensions: {
            baseWidth: 4000,
            baseHeight: 2000,
            basePrice: 90000,
            widthStep: 500,
            widthPricePerStep: 7500,
            heightStep: 100,
            heightPricePerStep: 7500,
        },
        frames: [
            { label: '60x40 (2мм)', value: '60x40_2mm', priceType: 'multiplier', priceValue: 0 },
            { label: '60x60 (2мм)', value: '60x60_2mm', priceType: 'multiplier', priceValue: 0 }, // Assuming 0 based on user input, or maybe similar to base? User said 60x40 base.
            { label: '80x40 (2мм) +7%', value: '80x40_2mm', priceType: 'multiplier', priceValue: 0.07 },
            { label: '80x80 (2мм) +15%', value: '80x80_2mm', priceType: 'multiplier', priceValue: 0.15 },
            { label: '100x100 (2мм) +25%', value: '100x100_2mm', priceType: 'multiplier', priceValue: 0.25 },
            { label: 'Другое', value: 'other', priceType: 'multiplier', priceValue: 0 }
        ],
        options: [
            // Размеры и Каркас (tail fields)
            {
                id: 'tail_size',
                section: 'Размеры и Каркас',
                label: 'Хвост (размер)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0 // "не влияет на цену"
            },
            {
                id: 'tail_shape',
                section: 'Размеры и Каркас',
                label: 'Хвост (форма)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Квадрат', value: 'square', price: 0 },
                    { label: 'Треугольник', value: 'triangle', price: 0 }
                ]
            },

            // Монтаж и Тип
            {
                id: 'installation_works',
                section: 'Монтаж и Тип',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 0 },
                ]
            },
            {
                id: 'mounting_type',
                section: 'Монтаж и Тип',
                label: 'Тип монтажа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Внутри', value: 'inside', price: 0 },
                    { label: 'Снаружи', value: 'outside', price: 0 }
                ]
            },
            {
                id: 'manipulator',
                section: 'Монтаж и Тип',
                label: 'Манипулятор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Не нужен', value: 'no', price: 0 },
                    { label: 'Нужен', value: 'yes', price: 7000 }
                ]
            },
            {
                id: 'cantilever_system',
                section: 'Монтаж и Тип',
                label: 'Консольная система',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Старт про', value: 'start_pro', price: 0 },
                    { label: 'Эко', value: 'eco', price: 0 },
                    { label: 'Евро', value: 'euro', price: 0 }
                ]
            },

            // Стойки и Зашивка
            {
                id: 'posts_size',
                section: 'Стойки и Зашивка',
                label: 'Стойки (размер)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '80x80 (2мм)', value: '80x80_2mm', price: 0 },
                    { label: '100x100 (2 мм)', value: '100x100_2mm', price: 0 },
                    { label: '120x120 (3 мм)', value: '120x120_3mm', price: 0 },
                    { label: '80x80 (3 мм)', value: '80x80_3mm', price: 0 },
                    { label: '100x100 (3 мм)', value: '100x100_3mm', price: 0 }
                ]
            },
            {
                id: 'posts_type',
                section: 'Стойки и Зашивка',
                label: 'Стойки (тип)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Одиночные', value: 'single', price: 0 },
                    { label: 'П образные', value: 'u_shape', price: 3000 },
                    { label: 'Смешанный', value: 'mixed', price: 1500 }
                ]
            },
            {
                id: 'extra_post_80x80_2mm',
                section: 'Стойки и Зашивка',
                label: 'Доп стойки 80x80 (2мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 400,
                unit: 'м'
            },
            {
                id: 'extra_post_100x100_2_5mm',
                section: 'Стойки и Зашивка',
                label: 'Доп стойки 100x100 (2,5 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 600,
                unit: 'м'
            },
            {
                id: 'extra_post_120x120_3mm',
                section: 'Стойки и Зашивка',
                label: 'Доп стойки 120x120 (3 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 700,
                unit: 'м'
            },
            {
                id: 'extra_post_80x80_3mm',
                section: 'Стойки и Зашивка',
                label: 'Доп стойки 80x80 (3 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 450,
                unit: 'м'
            },
            {
                id: 'extra_post_100x100_3mm',
                section: 'Стойки и Зашивка',
                label: 'Доп стойки 100x100 (3 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'opening_direction',
                section: 'Стойки и Зашивка',
                label: 'Напр открытие (вид снаружи)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Влево', value: 'left', price: 0 },
                    { label: 'Вправо', value: 'right', price: 0 }
                ]
            },
            {
                id: 'cladding',
                section: 'Стойки и Зашивка',
                label: 'Зашивка',
                type: 'select',
                priceType: 'multiplier',
                options: [
                    { label: 'Лист 1 мм', value: 'sheet_1mm', price: 0 },
                    { label: 'Сайдинг 0,45 мм (+10%)', value: 'siding', price: 0.10 },
                    { label: 'Панель 40 мм (+30%)', value: 'panel_40mm', price: 0.30 },
                    { label: 'Решетка (+10%)', value: 'grid', price: 0.10 }
                ]
            },
            {
                id: 'custom_cladding',
                section: 'Стойки и Зашивка',
                label: 'Доп индивидуальная зашивка',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },

            // Автоматика и Электроника
            {
                id: 'drive_motor',
                section: 'Автоматика и Электроника',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '600кг 220v', value: '600kg_220v', price: 0 },
                    { label: '1000кг 220v', value: '1000kg_220v', price: 0 },
                    { label: 'S800кг 24v', value: 's800kg_24v', price: 0 },
                    { label: 'S1300кг 24v', value: 's1300kg_24v', price: 0 }
                ]
            },
            {
                id: 'color',
                section: 'Автоматика и Электроника',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Антрацит RAL 7016', value: 'ral7016', price: 0 },
                    { label: 'RAL 8017 Коричневый', value: 'ral8017', price: 0 },
                    { label: 'Другое', value: 'other', price: 0 }
                ]
            },
            {
                id: 'gear_rack',
                section: 'Автоматика и Электроника',
                label: 'Доп зуб рейка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1000,
                unit: 'м'
            },
            {
                id: 'lamp',
                section: 'Автоматика и Электроника',
                label: 'Лампа',
                type: 'boolean',
                priceType: 'fixed',
                priceValue: 0 // "не влияет на цену"
            },
            {
                id: 'sensors',
                section: 'Автоматика и Электроника',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Проводной', value: 'wired', price: 1000 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Автоматика и Электроника',
                label: 'Доп пульты (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Автоматика и Электроника',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Автоматика и Электроника',
                label: 'Кнопка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 1500 }
                ]
            },
            {
                id: 'stabilizer',
                section: 'Автоматика и Электроника',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 6700 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Автоматика и Электроника',
                label: 'Детектор сирен',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 24000 }
                ]
            },

            // Дополнительные работы
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable_wiring',
                section: 'Дополнительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'dismantling',
                section: 'Дополнительные работы',
                label: 'Демонтаж (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'unaccounted',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Дополнительные работы',
                label: 'Примечание',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Все стандартно', value: 'standard', price: 0 },
                    { label: 'Есть нюансы', value: 'nuances', price: 0 }
                ]
            }
        ],
    },
    'swing-gates': {
        productId: 'swing-gates',
        dimensions: {
            baseWidth: 4000,
            baseHeight: 2000,
            basePrice: 90000,
            widthStep: 500,
            widthPricePerStep: 7500,
            heightStep: 500,
            heightPricePerStep: 7500,
        },
        frames: [
            { label: '60x40 (2мм)', value: '60x40_2mm', priceType: 'multiplier', priceValue: 0 },
            { label: '60x60 (2мм)', value: '60x60_2mm', priceType: 'multiplier', priceValue: 0 },
            { label: '80x40 (2мм) +7%', value: '80x40_2mm', priceType: 'multiplier', priceValue: 0.07 },
            { label: '80x80 (2мм) +15%', value: '80x80_2mm', priceType: 'multiplier', priceValue: 0.15 },
            { label: '100x100 (2мм) +25%', value: '100x100_2mm', priceType: 'multiplier', priceValue: 0.25 },
            { label: 'Другое', value: 'other', priceType: 'multiplier', priceValue: 0 },
        ],
        options: [
            // Монтаж
            {
                id: 'installation_works',
                section: 'Монтаж',
                label: 'Монтажные работы',
                type: 'boolean', // "options: [есть]", logic: "есть": 11000.
                priceType: 'fixed',
                // Using explicit select options for robust boolean pricing mapping logic as decided
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 11000 }
                ]
            },
            {
                id: 'mounting_type',
                section: 'Монтаж',
                label: 'Тип монтажа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Внутри', value: 'inside', price: 0 },
                    { label: 'В проеме', value: 'in_opening', price: 0 },
                    { label: 'Снаружи', value: 'outside', price: 0 }
                ]
            },
            {
                id: 'manipulator',
                section: 'Монтаж',
                label: 'Манипулятор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Не нужен', value: 'no', price: 0 },
                    { label: 'Нужен', value: 'yes', price: 7000 }
                ]
            },

            // Стойки и Открывание
            {
                id: 'posts_standard',
                section: 'Стойки и Открывание',
                label: 'Стойки (стандарт 2 шт)',
                type: 'input', // Representing "static" as readonly input or similar.
                // Or "select" with single option.
                // Keeping it simple as a Disabled Input or Text? 
                // Let's use a Select with 1 option to be consistent with layout, price 0.
                priceType: 'fixed',
                options: [
                    { label: 'Включено в базу', value: 'included', price: 0 }
                ]
            },
            {
                id: 'extra_post_80x80_2mm',
                section: 'Стойки и Открывание',
                label: 'Доп стойки 80x80 (2мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 400,
                unit: 'м'
            },
            {
                id: 'extra_post_100x100_2_5mm',
                section: 'Стойки и Открывание',
                label: 'Доп стойки 100x100 (2.5 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 600,
                unit: 'м'
            },
            {
                id: 'extra_post_120x120_3mm',
                section: 'Стойки и Открывание',
                label: 'Доп стойки 120x120 (3 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 700,
                unit: 'м'
            },
            {
                id: 'extra_post_80x80_3mm',
                section: 'Стойки и Открывание',
                label: 'Доп стойки 80x80 (3 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 450,
                unit: 'м'
            },
            {
                id: 'extra_post_100x100_3mm',
                section: 'Стойки и Открывание',
                label: 'Доп стойки 100x100 (3 мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lintel',
                section: 'Стойки и Открывание',
                label: 'Перекладина',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 2000 }
                ]
            },
            {
                id: 'opening_direction',
                section: 'Стойки и Открывание',
                label: 'Напр открытие (вид снаружи)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Наружу', value: 'outward', price: 0 },
                    { label: 'Во внутрь', value: 'inward', price: 0 }
                ]
            },
            {
                id: 'opening_degree',
                section: 'Стойки и Открывание',
                label: 'Градус открывания',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '90', value: '90', price: 0 },
                    { label: '110', value: '110', price: 0 },
                    { label: '140', value: '140', price: 0 },
                    { label: '160', value: '160', price: 0 }
                ]
            },
            {
                id: 'cladding',
                section: 'Стойки и Открывание',
                label: 'Зашивка',
                type: 'select',
                priceType: 'multiplier',
                options: [
                    { label: 'Лист 1 мм', value: 'sheet_1mm', price: 0 },
                    { label: 'Сайдинг 0,45 мм (+10%)', value: 'siding', price: 0.10 },
                    { label: 'Панель 40 мм (+30%)', value: 'panel_40mm', price: 0.30 }
                ]
            },
            {
                id: 'custom_cladding',
                section: 'Стойки и Открывание',
                label: 'Доп индивидуальная зашивка',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },

            // Привод и Автоматика
            {
                id: 'drive',
                section: 'Привод и Автоматика',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Hercules kit T600 телескоп 24V', value: 'hercules_t600', price: 49000 },
                    { label: 'Hercules kit R800 рычажный 24V', value: 'hercules_r800', price: 58000 },
                    { label: 'Hercules kit R1200 рычажный 220V', value: 'hercules_r1200', price: 68000 },
                    { label: 'KAY RAY 600 24V', value: 'kay_ray_600', price: 58000 },
                    { label: 'KAY RAY 1000 24V', value: 'kay_ray_1000', price: 69500 }
                ]
            },
            {
                id: 'color',
                section: 'Привод и Автоматика',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Антрацит RAL 7016', value: 'ral7016', price: 0 },
                    { label: 'RAL 8017 Коричневый', value: 'ral8017', price: 0 },
                    { label: 'Другое', value: 'other', price: 0 }
                ]
            },
            {
                id: 'lamp',
                section: 'Привод и Автоматика',
                label: 'Лампа',
                type: 'boolean',
                priceType: 'fixed',
                priceValue: 0,
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'sensors',
                section: 'Привод и Автоматика',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Проводной', value: 'wired', price: 1000 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Привод и Автоматика',
                label: 'Доп пульты (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Привод и Автоматика',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Привод и Автоматика',
                label: 'Кнопка',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 1500 }
                ]
            },

            // Дополнительные работы
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable_wiring',
                section: 'Дополнительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Дополнительные работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'dismantling',
                section: 'Дополнительные работы',
                label: 'Демонтаж (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'stabilizer',
                section: 'Дополнительные работы',
                label: 'Стабилизатор',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 6700 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Дополнительные работы',
                label: 'Детектор сирен',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 24000 }
                ]
            },
            {
                id: 'unaccounted',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Дополнительные работы',
                label: 'Примечание',
                type: 'input', // Changed to input/text as per Swing Gate request "type: text"
                priceType: 'fixed',
                priceValue: 0
            }
        ],
    },
    'sectional-gates': {
        productId: 'sectional-gates',
        pricingStrategy: 'area',
        hideDimensions: true,
        areaPriceRules: [
            { maxArea: 8.5, price: 14500 },
            { maxArea: 999, price: 13500 }, // > 8.5
        ],
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [], // Not using default frames logic
        options: [
            // Размеры (Custom inputs replacing default)
            {
                id: 'width',
                section: 'Размеры',
                label: 'Ширина (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'height',
                section: 'Размеры',
                label: 'Высота (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'lintel',
                section: 'Размеры',
                label: 'Притолока (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },

            // Конфигурация и Тип подъема
            {
                id: 'lift_type',
                section: 'Конфигурация и Тип подъема',
                label: 'Тип подъема',
                type: 'select',
                priceType: 'multiplier',
                options: [
                    { label: 'Стандартный', value: 'standard', price: 0 },
                    { label: 'Пониженный (+10%)', value: 'low', price: 0.10 },
                    { label: 'Повышенный (+15%)', value: 'high', price: 0.15 },
                    { label: 'Прямой (вертикальный) (+20%)', value: 'vertical', price: 0.20 }
                ]
            },
            {
                id: 'mounting_type',
                section: 'Конфигурация и Тип подъема',
                label: 'Тип монтажа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Встроенный', value: 'embedded', price: 0 },
                    { label: 'Накладной', value: 'overlay', price: 0 }
                ]
            },
            {
                id: 'metal_frame_exist',
                section: 'Конфигурация и Тип подъема',
                label: 'Металлокаркас',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Только перекладина', value: 'crossbar_only', price: 0 }
                ]
            },
            {
                id: 'metal_frame_profile',
                section: 'Конфигурация и Тип подъема',
                label: 'Металлокаркас профиль',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '100x50 (2мм)', value: '100x50', price: 0 },
                    { label: '100x100 (2мм)', value: '100x100', price: 2000 }
                ]
            },

            // Стойки и Панели
            {
                id: 'extra_posts_80x80_2mm',
                section: 'Стойки и Панели',
                label: 'Доп стойки 80x80 (2мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 400,
                unit: 'м'
            },
            {
                id: 'extra_posts_100x100_2mm',
                section: 'Стойки и Панели',
                label: 'Доп стойки 100x100 (2мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 600,
                unit: 'м'
            },
            {
                id: 'extra_posts_100x50_2mm',
                section: 'Стойки и Панели',
                label: 'Доп стойки 100x50 (2мм) (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 400,
                unit: 'м'
            },
            {
                id: 'false_panel_l_gofr',
                section: 'Стойки и Панели',
                label: 'Фальш панель L-гофр (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 4300,
                unit: 'м'
            },
            {
                id: 'false_panel_microwave',
                section: 'Стойки и Панели',
                label: 'Фальш панель Микроволна (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 3800,
                unit: 'м'
            },
            {
                id: 'wicket_integrated',
                section: 'Стойки и Панели',
                label: 'Встроенная калитка',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 58000 }
                ]
            },

            // Дизайн и Цвет
            {
                id: 'design_type',
                section: 'Дизайн и Цвет',
                label: 'Дизайн',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Микроволна', value: 'microwave', price: 0 },
                    { label: 'L гофр', value: 'l_gofr', price: 0 },
                    { label: 'S гофр', value: 's_gofr', price: 0 }
                ]
            },
            {
                id: 'color',
                section: 'Дизайн и Цвет',
                label: 'Цвет',
                type: 'select',
                priceType: 'multiplier',
                options: [
                    { label: 'Антрацит', value: 'anthracite', price: 0 },
                    { label: 'Черный (+8%)', value: 'black', price: 0.08 },
                    { label: 'Белый', value: 'white', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 },
                    { label: 'Светло серый', value: 'light_gray', price: 0 }
                ]
            },

            // Автоматика
            {
                id: 'drive',
                section: 'Автоматика',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Потолочный цепной', value: 'chain', price: 15000 },
                    { label: 'Потолочный ремень', value: 'belt', price: 18000 },
                    { label: 'Вальный', value: 'shaft', price: 35000 },
                    { label: 'РЦП', value: 'rcp', price: 10000 }
                ]
            },
            {
                id: 'signal_lamp',
                section: 'Автоматика',
                label: 'Сигнальная лампа',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 2800 }
                ]
            },
            {
                id: 'motion_sensors',
                section: 'Автоматика',
                label: 'Датчики движения',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 4500 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Автоматика',
                label: 'Доп пульты (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Автоматика',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Автоматика',
                label: 'Кнопка',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 1500 }
                ]
            },
            {
                id: 'manual_handle',
                section: 'Автоматика',
                label: 'Ручка для ручного поднятия',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 0 }
                ]
            },

            // Монтаж и Работы
            {
                id: 'installation_fee',
                section: 'Монтаж и Работы',
                label: 'Монтажные работы',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 20000 }
                ]
            },
            {
                id: 'yard_wall',
                section: 'Монтаж и Работы',
                label: 'Дворовая стена',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Ровная', value: 'flat', price: 0 },
                    { label: 'Кривая', value: 'curved', price: 1000 }
                ]
            },
            {
                id: 'concrete_works',
                section: 'Монтаж и Работы',
                label: 'Доп бетонные работы (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing',
                section: 'Монтаж и Работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'pavers_lift',
                section: 'Монтаж и Работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable',
                section: 'Монтаж и Работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Монтаж и Работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'dismantling',
                section: 'Монтаж и Работы',
                label: 'Демонтаж (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'stabilizer',
                section: 'Монтаж и Работы',
                label: 'Стабилизатор',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 6700 }
                ]
            },
            {
                id: 'concrete_columns',
                section: 'Монтаж и Работы',
                label: 'Бетон в колоннах',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'unaccounted',
                section: 'Монтаж и Работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Монтаж и Работы',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ],
    },
    'wicket': {
        productId: 'wicket',
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0, // Base price driven by Filling Material
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Тип и Размеры
            {
                id: 'wicket_type',
                section: 'Тип и Размеры',
                label: 'Тип калитки',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Отдельная', value: 'separate', price: 0 },
                    { label: 'Встроенная', value: 'integrated', price: 0 }
                ]
            },
            {
                id: 'frame',
                section: 'Тип и Размеры',
                label: 'Каркас',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '60x40 (2мм)', value: '60x40_2mm', price: 0 },
                    { label: '60x60 (2мм)', value: '60x60_2mm', price: 0 }
                ]
            },
            {
                id: 'width',
                section: 'Тип и Размеры',
                label: 'Ширина',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'height',
                section: 'Тип и Размеры',
                label: 'Высота',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'gap',
                section: 'Тип и Размеры',
                label: 'Щель под калиткой',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },

            // Зашивка и Конструкция
            {
                id: 'cladding',
                section: 'Зашивка и Конструкция',
                label: 'Зашивка (Базовая стоимость)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Лист 1 мм', value: 'sheet_1mm', price: 33000 },
                    { label: 'Сайдинг 0,45 мм', value: 'siding_045mm', price: 37000 },
                    { label: 'Панель 40 мм', value: 'panel_40mm', price: 43000 }
                ]
            },
            {
                id: 'false_panel_present',
                section: 'Зашивка и Конструкция',
                label: 'Фальш (Да/Нет)',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 3500 }
                ]
            },
            {
                id: 'false_panel_size',
                section: 'Зашивка и Конструкция',
                label: 'Размер фальша',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'box_structure',
                section: 'Зашивка и Конструкция',
                label: 'Короб (Структура)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'П образный', value: 'u_shape', price: 0 },
                    { label: 'Стойки', value: 'posts', price: 0 }
                ]
            },
            {
                id: 'box_profile_size',
                section: 'Зашивка и Конструкция',
                label: 'Трубоквадрат короба',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '60x40 (2 мм)', value: '60x40_2mm', price: 0 },
                    { label: '60x60 (2мм)', value: '60x60_2mm', price: 0 }
                ]
            },
            {
                id: 'box_post_size',
                section: 'Зашивка и Конструкция',
                label: 'Размер стоек',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '60x60 (2мм)', value: '60x60_2mm', price: 0 },
                    { label: '80x80 (2мм)', value: '80x80_2mm', price: 2000 },
                    { label: '100x100 (2.5мм)', value: '100x100_25mm', price: 3500 }
                ]
            },
            {
                id: 'color',
                section: 'Зашивка и Конструкция',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Антрацит', value: 'anthracite', price: 0 },
                    { label: 'Черный', value: 'black', price: 0 },
                    { label: 'Белый', value: 'white', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 },
                    { label: 'Светло серый', value: 'light_gray', price: 0 }
                ]
            },
            {
                id: 'installation',
                section: 'Зашивка и Конструкция',
                label: 'Монтажные работы',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 }, // Assuming 'no' exists or just unchecked
                    { label: 'Есть', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'extra_strip',
                section: 'Зашивка и Конструкция',
                label: 'Доп нащельник (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 200,
                unit: 'м'
            },
            {
                id: 'opening_direction',
                section: 'Зашивка и Конструкция',
                label: 'Открытие (вид снаружи)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Наружу с лево на право', value: 'out_l_r', price: 0 },
                    { label: 'Наружу с право на лево', value: 'out_r_l', price: 0 },
                    { label: 'Внутрь с лево на право', value: 'in_l_r', price: 0 },
                    { label: 'Внутрь с право на лево', value: 'in_r_l', price: 0 }
                ]
            },

            // Фурнитура и Доступ
            {
                id: 'lock',
                section: 'Фурнитура и Доступ',
                label: 'Замок',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Стандартный комплект', value: 'standard', price: 0 },
                    { label: 'Стандартный комплект + электро защелка', value: 'standard_electric', price: 6800 },
                    { label: 'Электро защелка', value: 'electric', price: 4000 }
                ]
            },
            {
                id: 'handle',
                section: 'Фурнитура и Доступ',
                label: 'Ручка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Стандартная нажимная', value: 'standard', price: 0 },
                    { label: 'Готовая 30 см', value: 'ready_30cm', price: 1800 },
                    { label: 'Индивидуально сваренная', value: 'custom_welded', price: 2500 }
                ]
            },
            {
                id: 'door_closer',
                section: 'Фурнитура и Доступ',
                label: 'Доводчик + монтаж',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 6800 }
                ]
            },
            {
                id: 'code_panel',
                section: 'Фурнитура и Доступ',
                label: 'Кодовая панель + монтаж',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 7000 }
                ]
            },
            {
                id: 'intercom',
                section: 'Фурнитура и Доступ',
                label: 'Домофон',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Аналоговый', value: 'analog', price: 32000 },
                    { label: 'Цифровой', value: 'digital', price: 42000 }
                ]
            },
            {
                id: 'flexible_transition',
                section: 'Фурнитура и Доступ',
                label: 'Гибкий переход',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 0 }
                ]
            },

            // Питание и Кабели
            {
                id: 'power_supply',
                section: 'Питание и Кабели',
                label: 'Блок питание (5 ампер)',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'psu_box',
                section: 'Питание и Кабели',
                label: 'Короб для блок питание',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'poe_hub',
                section: 'Питание и Кабели',
                label: 'PoE хаб (5-8 портовый)',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'power_cable',
                section: 'Питание и Кабели',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Питание и Кабели',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'unaccounted',
                section: 'Питание и Кабели',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Питание и Кабели',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'barrier-anti-vandal': {
        productId: 'barrier-anti-vandal',
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Базовая конфигурация
            {
                id: 'size_class',
                section: 'Базовая конфигурация',
                label: 'Размер (класс)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'S (до 4 метров)', value: 's', price: 85000 },
                    { label: 'L (до 5 метров)', value: 'l', price: 95000 },
                    { label: 'M (до 6 метров)', value: 'm', price: 115000 },
                    { label: 'XL (до 7 метров)', value: 'xl', price: 125000 },
                    { label: 'XXL (до 8 метров)', value: 'xxl', price: 145000 }
                ]
            },
            {
                id: 'frame',
                section: 'Базовая конфигурация',
                label: 'Каркас',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '60x40 (2мм)', value: '60x40_2mm', price: 0 },
                    { label: '60x60 (2мм)', value: '60x60_2mm', price: 0 }
                ]
            },
            {
                id: 'width',
                section: 'Базовая конфигурация',
                label: 'Ширина',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'height',
                section: 'Базовая конфигурация',
                label: 'Высота',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
                // validation max 500 will be handled by UI or form validation logic if present, 
                // but for pricing rules we just define the field.
            },
            {
                id: 'installation_works',
                section: 'Базовая конфигурация',
                label: 'Монтажные работы',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 0 }
                ]
            },

            // Автоматика и Оснащение
            {
                id: 'drive',
                section: 'Автоматика и Оснащение',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '600кг 220v', value: '600kg_220v', price: 0 },
                    { label: '1000кг 220v', value: '1000kg_220v', price: 0 },
                    { label: 'S800кг 24v', value: 's800kg_24v', price: 0 }
                ]
            },
            {
                id: 'color',
                section: 'Автоматика и Оснащение',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Антрацит RAL 7016', value: 'ral7016', price: 0 },
                    { label: 'RAL 8017 Коричневый', value: 'ral8017', price: 0 },
                    { label: 'Другое', value: 'other', price: 0 }
                ]
            },
            {
                id: 'gear_rack',
                section: 'Автоматика и Оснащение',
                label: 'Доп зуб рейка (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1000,
                unit: 'шт' // "1 шт = 1 метру" per note, keeping unit as 'шт' or 'м' logic implies quantity multiplier
            },
            {
                id: 'lamp',
                section: 'Автоматика и Оснащение',
                label: 'Лампа',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 0 }
                ]
            },
            {
                id: 'sensors',
                section: 'Автоматика и Оснащение',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Проводной', value: 'wired', price: 1000 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Автоматика и Оснащение',
                label: 'Доп пульты (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Автоматика и Оснащение',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 } // "индивидуально" usually means 0 or custom input, keeping 0 as placeholder
                ]
            },
            {
                id: 'button',
                section: 'Автоматика и Оснащение',
                label: 'Кнопка',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 1500 }
                ]
            },
            {
                id: 'stabilizer',
                section: 'Автоматика и Оснащение',
                label: 'Стабилизатор',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 6700 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Автоматика и Оснащение',
                label: 'Детектор сирен',
                type: 'boolean',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 24000 }
                ]
            },

            // Дополнительные работы
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'demolition',
                label: 'Демонтаж (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'stabilizer',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 6700 }
                ]
            },
            {
                id: 'siren_detector',
                label: 'Детектор сирен',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Да', value: 'yes', price: 24000 }
                ]
            },
            {
                id: 'custom',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            // Info fields
            {
                id: 'width_info',
                label: 'Ширина (размер)',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'height_info',
                label: 'Высота (макс 500 мм)',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'color_info',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Антрацит', value: 'anthracite', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 },
                    { label: 'Другое', value: 'other', price: 0 }
                ]
            },
            {
                id: 'lamp_info',
                label: 'Лампа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 0 }
                ]
            }
        ]
    },
    'barrier': {
        productId: 'barrier',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Модель и Монтаж
            {
                id: 'model',
                section: 'Модель и Монтаж',
                label: 'Модель',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Hercules 24v', value: 'hercules_24v', price: 48000 },
                    { label: 'Hercules servo', value: 'hercules_servo', price: 115000 }
                ]
            },
            {
                id: 'quantity',
                section: 'Модель и Монтаж',
                label: 'Кол-во',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'installation_works',
                section: 'Модель и Монтаж',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 11000 }
                ]
            },
            {
                id: 'boom_length',
                section: 'Модель и Монтаж',
                label: 'Длина стрелы (метров)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '3', value: '3', price: 0 },
                    { label: '4', value: '4', price: 0 },
                    { label: '5', value: '5', price: 0 },
                    { label: '6', value: '6', price: 0 }
                ]
            },

            // Комплектующие стрелы
            {
                id: 'support_post',
                section: 'Комплектующие стрелы',
                label: 'Подпорка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'none', price: 0 },
                    { label: 'Стационарный', value: 'stationary', price: 2500 },
                    { label: 'Прикрепленный', value: 'attached', price: 2000 }
                ]
            },
            {
                id: 'concrete_base',
                section: 'Комплектующие стрелы',
                label: 'Заливка бетон подушки (есть ли готовая?)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 0 }, // Client has base -> 0 cost
                    { label: 'Нет', value: 'no', price: 3000 }  // Client has NO base -> 3000 cost
                ]
            },

            // Электроника и Автоматика
            {
                id: 'lamp',
                section: 'Электроника и Автоматика',
                label: 'Лампа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 2800 }
                ]
            },
            {
                id: 'sensors',
                section: 'Электроника и Автоматика',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'none', price: 0 },
                    { label: 'Проводной', value: 'wired', price: 2800 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Электроника и Автоматика',
                label: 'Доп пульты (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Электроника и Автоматика',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Электроника и Автоматика',
                label: 'Кнопка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 1500 }
                ]
            },
            {
                id: 'stabilizer',
                section: 'Электроника и Автоматика',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 6700 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Электроника и Автоматика',
                label: 'Детектор сирен',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 24000 }
                ]
            },

            // Дополнительные работы
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable_wiring',
                section: 'Дополнительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Дополнительные работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'dismantling',
                section: 'Дополнительные работы',
                label: 'Демонтаж (час)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'unaccounted',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Дополнительные работы',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'sliding-rework': {
        productId: 'sliding-rework',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            heightStep: 0,
            heightPricePerStep: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,

        },
        frames: [],
        options: [
            // Демонтаж и Подготовка
            {
                id: 'dismantling_type',
                section: 'Демонтаж и Подготовка',
                label: 'Демонтаж',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Ручной', value: 'manual', price: 10000 },
                    { label: 'Манипулятором', value: 'manipulator', price: 7000 }
                ]
            },
            {
                id: 'installation_works',
                section: 'Демонтаж и Подготовка',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 25000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'welding_works',
                section: 'Демонтаж и Подготовка',
                label: 'Сварочные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 15000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'transportation',
                section: 'Демонтаж и Подготовка',
                label: 'Транспортировка ворот',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 18000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'manipulator_service',
                section: 'Демонтаж и Подготовка',
                label: 'Манипулятор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 12000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },

            // Замена комплектующих
            {
                id: 'cantilever_system',
                section: 'Замена комплектующих',
                label: 'Консольная система',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Евро (35500)', value: 'euro', price: 35500 },
                    { label: 'Эко (24500)', value: 'eco', price: 24500 },
                    { label: 'Старт (8800)', value: 'start', price: 8800 },
                    { label: 'Старт Про (9800)', value: 'start_pro', price: 9800 }
                ]
            },
            // Additional Beam: "Composite" -> Flattened to Type + Quantity (Meters)
            {
                id: 'additional_beam_type',
                section: 'Замена комплектующих',
                label: 'Доп балка (Тип)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Евро (3000/м)', value: 'euro', price: 0 },
                    { label: 'Эко (2000/м)', value: 'eco', price: 0 },
                    { label: 'Старт (800/м)', value: 'start', price: 0 },
                    { label: 'Старт Про (800/м)', value: 'start_pro', price: 0 }
                ]
            },
            {
                id: 'additional_beam_meters',
                section: 'Замена комплектующих',
                label: 'Доп балка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0,
                dependsOn: 'additional_beam_type',
                dependentPriceRules: {
                    'euro': 3000,
                    'eco': 2000,
                    'start': 800,
                    'start_pro': 800
                },
                unit: 'м'
            },
            {
                id: 'counterweight',
                section: 'Замена комплектующих',
                label: 'Противовес',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нужен', value: 'yes', price: 2500 },
                    { label: 'Не нужен', value: 'no', price: 0 }
                ]
            },
            {
                id: 'adjusting_plate',
                section: 'Замена комплектующих',
                label: 'Регулировочная площадка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Ролтек', value: 'roltek', price: 2800 },
                    { label: 'Старт', value: 'start', price: 1000 }
                ]
            },

            // Автоматика
            {
                id: 'drive_motor',
                section: 'Автоматика',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '600кг 220v', value: '600_220', price: 26500 },
                    { label: '1000кг 220v', value: '1000_220', price: 28500 },
                    { label: 'S800кг 24v', value: 'S800_24', price: 36500 },
                    { label: 'S1300кг 24v', value: 'S1300_24', price: 43500 }
                ]
            },
            {
                id: 'gear_rack_included',
                section: 'Автоматика',
                label: 'Зуб рейки (в комплекте)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'extra_gear_rack',
                section: 'Автоматика',
                label: 'Доп зуб рейка (шт=м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1000,
                unit: 'шт'
            },
            {
                id: 'lamp',
                section: 'Автоматика',
                label: 'Лампа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'sensors',
                section: 'Автоматика',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Проводной', value: 'wired', price: 1000 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Автоматика',
                label: 'Доп пульты (кол-во)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Автоматика',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'WiFi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Автоматика',
                label: 'Кнопка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 1500 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },

            // Строительные работы
            {
                id: 'concrete_platform',
                section: 'Строительные работы',
                label: 'Заливка бетонной платформы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 15000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            // Additional Posts: "Composite" -> Flattened using dependsOn
            {
                id: 'additional_posts_size',
                section: 'Строительные работы',
                label: 'Доп стойки (Тип)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '80x80 (2мм)', value: '80x80_2', price: 0 },
                    { label: '100x100 (2.5 мм)', value: '100x100_25', price: 0 },
                    { label: '120x120 (3 мм)', value: '120x120_3', price: 0 },
                    { label: '80x80 (3 мм)', value: '80x80_3', price: 0 },
                    { label: '100x100 (3 мм)', value: '100x100_3', price: 0 }
                ]
            },
            {
                id: 'additional_posts_meters',
                section: 'Строительные работы',
                label: 'Доп стойки (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0,
                dependsOn: 'additional_posts_size',
                dependentPriceRules: {
                    '80x80_2': 400,
                    '100x100_25': 600,
                    '120x120_3': 700,
                    '80x80_3': 450,
                    '100x100_3': 500
                },
                unit: 'м'
            },
            {
                id: 'extra_concrete_works',
                section: 'Строительные работы',
                label: 'Доп бетонные работы (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Строительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Строительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable_wiring',
                section: 'Строительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Строительные работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'stabilizer',
                section: 'Строительные работы',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 6700 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Строительные работы',
                label: 'Детектор сирен',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 24000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'unaccounted',
                section: 'Строительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Строительные работы',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'sliding-automation': {
        productId: 'sliding-automation',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Привод и Монтаж
            {
                id: 'drive_motor',
                section: 'Привод и Монтаж',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '600кг 220v', value: '600_220', price: 26500 },
                    { label: '1000кг 220v', value: '1000_220', price: 28500 },
                    { label: 'S800кг 24v', value: 'S800_24', price: 36500 },
                    { label: 'S1300кг 24v', value: 'S1300_24', price: 43500 }
                ]
            },
            {
                id: 'installation_works',
                section: 'Привод и Монтаж',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 11000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'gear_rack',
                section: 'Привод и Монтаж',
                label: 'Доп зуб рейка (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1000,
                unit: 'штук',
                // note: '1 шт = 1 метру' - assuming UI handles this or it's implicitly known
            },

            // Электроника и Управление
            {
                id: 'lamp',
                section: 'Электроника и Управление',
                label: 'Лампа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'sensors',
                section: 'Электроника и Управление',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Проводной', value: 'wired', price: 1000 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Электроника и Управление',
                label: 'Доп пульты (кол-во)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'кол-во'
            },
            {
                id: 'remote_control',
                section: 'Электроника и Управление',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Электроника и Управление',
                label: 'Кнопка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 1500 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },

            // Дополнительные работы
            // Posts: Composite -> Flattened
            {
                id: 'post_size',
                section: 'Дополнительные работы',
                label: 'Стойки (Тип)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '80x80 (2мм)', value: '80x80_2', price: 0 },
                    { label: '100x100 (2 мм)', value: '100x100_2', price: 0 },
                    { label: '120x120 (3 мм)', value: '120x120_3', price: 0 },
                    { label: '80x80 (3 мм)', value: '80x80_3', price: 0 },
                    { label: '100x100 (3 мм)', value: '100x100_3', price: 0 }
                ]
            },
            {
                id: 'post_meters',
                section: 'Дополнительные работы',
                label: 'Стойки (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0,
                dependsOn: 'post_size',
                dependentPriceRules: {
                    '80x80_2': 400,
                    '100x100_2': 600,
                    '120x120_3': 700,
                    '80x80_3': 450,
                    '100x100_3': 500
                },
                unit: 'м'
            },
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'кол-часов'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'кол- метров'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'кол- метров'
            },
            {
                id: 'power_cable_wiring',
                section: 'Дополнительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'кол- метров'
            },
            {
                id: 'utp_cable',
                section: 'Дополнительные работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'кол- метров'
            },
            {
                id: 'dismantling',
                section: 'Дополнительные работы',
                label: 'Демонтаж (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'кол-часов'
            },
            {
                id: 'stabilizer',
                section: 'Дополнительные работы',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 6700 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Дополнительные работы',
                label: 'Детектор сирен',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 24000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'unaccounted',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сумма'
            },
            {
                id: 'note',
                section: 'Дополнительные работы',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'swing-automation': {
        productId: 'swing-automation',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Привод
            {
                id: 'drive_model',
                section: 'Привод',
                label: 'Модель привода',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Hercules kit T600 телескоп 24V', value: 'hercules_t600', price: 49000 },
                    { label: 'Hercules kit R800 рычажный 24V', value: 'hercules_r800', price: 58000 },
                    { label: 'Hercules kit R1200 рычажный 220V', value: 'hercules_r1200', price: 68000 },
                    { label: 'KAY RAY 600 24V', value: 'kay_ray_600', price: 58000 },
                    { label: 'KAY RAY 1000 24V', value: 'kay_ray_1000', price: 69500 }
                ]
            },

            // Монтаж и Электроника
            {
                id: 'installation_works',
                section: 'Монтаж и Электроника',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 11000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'lamp',
                section: 'Монтаж и Электроника',
                label: 'Лампа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'sensors',
                section: 'Монтаж и Электроника',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Проводной', value: 'wired', price: 1000 },
                    { label: 'Беспроводной', value: 'wireless', price: 1000 },
                    { label: 'Радар', value: 'radar', price: 14000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Монтаж и Электроника',
                label: 'Доп пульты (кол-во)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Монтаж и Электроника',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'WiFi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Монтаж и Электроника',
                label: 'Кнопка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 1500 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'posts',
                section: 'Монтаж и Электроника',
                label: 'Стойки',
                type: 'input', // Static in JSON, using input for display
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'stabilizer',
                section: 'Монтаж и Электроника',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 6700 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'siren_detector',
                section: 'Монтаж и Электроника',
                label: 'Детектор сирен',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 24000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },

            // Дополнительные работы
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable_wiring',
                section: 'Дополнительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Дополнительные работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'dismantling',
                section: 'Дополнительные работы',
                label: 'Демонтаж (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'unaccounted',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сумма'
            },
            {
                id: 'note',
                section: 'Дополнительные работы',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'sectional-repair': {
        productId: 'sectional-repair',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Ремонтные работы
            {
                id: 'cable_repair',
                section: 'Ремонтные работы',
                label: 'Ремонт троса',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Одна сторона', value: 'one_side', price: 3000 },
                    { label: 'Обе стороны', value: 'both_sides', price: 6000 },
                    { label: 'Замена (одна сторона)', value: 'replace_one', price: 6000 },
                    { label: 'Замена (обе стороны)', value: 'replace_both', price: 12000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'rail_replacement',
                section: 'Ремонтные работы',
                label: 'Замена рейки',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Ремень', value: 'belt', price: 9000 },
                    { label: 'Цепь', value: 'chain', price: 7000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'rail_repair',
                section: 'Ремонтные работы',
                label: 'Ремонт рейки',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Ремень', value: 'belt', price: 5000 },
                    { label: 'Цепь', value: 'chain', price: 4000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            // Panel Replacement: Composite -> Flattened
            {
                id: 'panel_type',
                section: 'Ремонтные работы',
                label: 'Замена панели (50я) - Тип',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'none', price: 0 },
                    { label: 'L гофр', value: 'l_gofr', price: 0 },
                    { label: 'Микроволна', value: 'microwave', price: 0 }
                ]
            },
            {
                id: 'panel_meters_count',
                section: 'Ремонтные работы',
                label: 'Замена панели (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0,
                dependsOn: 'panel_type',
                dependentPriceRules: {
                    'l_gofr': 4300,
                    'microwave': 3800,
                    'none': 0
                },
                unit: 'м'
            },
            {
                id: 'color',
                section: 'Ремонтные работы',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Антрацит', value: 'anthracite', price: 0 },
                    { label: 'Черный', value: 'black', price: 0 },
                    { label: 'Белый', value: 'white', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 },
                    { label: 'Светло серый', value: 'light_gray', price: 0 }
                ]
            },

            // Автоматика и Доступ
            {
                id: 'drive',
                section: 'Автоматика и Доступ',
                label: 'Привод',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Потолочный цепной', value: 'ceiling_chain', price: 15000 },
                    { label: 'Потолочный ремень', value: 'ceiling_belt', price: 18000 },
                    { label: 'Вальный', value: 'shaft', price: 35000 },
                    { label: 'РЦП', value: 'rcp', price: 10000 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'manual_handle',
                section: 'Автоматика и Доступ',
                label: 'Ручка для ручного поднятия',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 4000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'extra_remotes',
                section: 'Автоматика и Доступ',
                label: 'Доп пульты (кол-во)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 900,
                unit: 'шт'
            },
            {
                id: 'remote_control',
                section: 'Автоматика и Доступ',
                label: 'Удаленное управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Wifi', value: 'wifi', price: 8000 },
                    { label: 'GSM', value: 'gsm', price: 23000 },
                    { label: '4G', value: '4g', price: 30000 },
                    { label: 'QR (индивидуально)', value: 'qr', price: 0 },
                    { label: 'Нет', value: 'none', price: 0 }
                ]
            },
            {
                id: 'button',
                section: 'Автоматика и Доступ',
                label: 'Кнопка',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 1500 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'stabilizer',
                section: 'Автоматика и Доступ',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 6700 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },

            // Дополнительные работы
            {
                id: 'extra_concrete_works',
                section: 'Дополнительные работы',
                label: 'Доп бетонные работы (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'час'
            },
            {
                id: 'chasing_grouting',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'lift_paving',
                section: 'Дополнительные работы',
                label: 'Поднять брусчатку "песок" (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 50,
                unit: 'м'
            },
            {
                id: 'power_cable_wiring',
                section: 'Дополнительные работы',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'utp_cable',
                section: 'Дополнительные работы',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'м'
            },
            {
                id: 'dismantling',
                section: 'Дополнительные работы',
                label: 'Демонтаж (кол-часов)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'час'
            },
            {
                id: 'unaccounted',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сумма'
            },
            {
                id: 'note',
                section: 'Дополнительные работы',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'turnstile': {
        productId: 'turnstile',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Выбор оборудования
            {
                id: 'turnstile_model',
                section: 'Выбор оборудования',
                label: 'Модель',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Traffic MM 520 (Моторизированный трипод)', value: 'traffic_mm_520', price: 0 },
                    { label: 'Traffic MM 480 (Моторизированный трипод)', value: 'traffic_mm_480', price: 0 },
                    { label: 'MT-T358 (Электромеханический)', value: 'mt_t358', price: 0 },
                    { label: 'MT-T480 (Электромеханический)', value: 'mt_t480', price: 0 },
                    { label: 'R800 (Распашной)', value: 'r800', price: 0 }
                ]
            },
            {
                id: 'quantity',
                section: 'Выбор оборудования',
                label: 'Кол-во',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0,
                dependsOn: 'turnstile_model',
                dependentPriceRules: {
                    'traffic_mm_520': 169600,
                    'traffic_mm_480': 180000,
                    'mt_t358': 55000,
                    'mt_t480': 90000,
                    'r800': 114000
                },
                unit: 'шт'
            },

            // Система и Идентификаторы
            {
                id: 'pc_software',
                section: 'Система и Идентификаторы',
                label: 'ПК (Программный комплекс)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 63000 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'ups',
                section: 'Система и Идентификаторы',
                label: 'УПС (Источник бесперебойного питания)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 13500 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'qr_id',
                section: 'Система и Идентификаторы',
                label: 'Qr ID (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0, // Price not specified
                unit: 'штук'
            },
            {
                id: 'face_id',
                section: 'Система и Идентификаторы',
                label: 'Face ID (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0, // Price not specified
                unit: 'штук'
            },
            {
                id: 'rfid',
                section: 'Система и Идентификаторы',
                label: 'Rfid считыватель (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0, // Price not specified
                unit: 'штук'
            },
            {
                id: 'cards',
                section: 'Система и Идентификаторы',
                label: 'Карты доступа (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 0, // Price not specified
                unit: 'штук'
            },
            {
                id: 'button',
                section: 'Система и Идентификаторы',
                label: 'Кнопка выхода (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1500,
                unit: 'штук'
            },

            // Монтажные работы и Кабель
            {
                id: 'chasing_grouting',
                section: 'Монтажные работы и Кабель',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'кол- метров'
            },
            {
                id: 'power_cable_wiring',
                section: 'Монтажные работы и Кабель',
                label: 'Доп подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'кол- метров'
            },
            {
                id: 'utp_cable',
                section: 'Монтажные работы и Кабель',
                label: 'UTP кабель (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 80,
                unit: 'кол- метров'
            },
            {
                id: 'stabilizer',
                section: 'Монтажные работы и Кабель',
                label: 'Стабилизатор',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Есть', value: 'yes', price: 6700 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'unaccounted',
                section: 'Монтажные работы и Кабель',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сумма'
            },
            {
                id: 'note',
                section: 'Монтажные работы и Кабель',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'awnings-production': {
        productId: 'awnings-production',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Модель и Размеры
            {
                id: 'model',
                section: 'Модель и Размеры',
                label: 'Модель',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Barcelona', value: 'BARCELONA', price: 0 },
                    { label: 'Bloom classic', value: 'BLOOM_CLASSIC', price: 0 },
                    { label: 'Bloom classic +', value: 'BLOOM_CLASSIC_PLUS', price: 0 },
                    { label: 'Bloom light', value: 'BLOOM_LIGHT', price: 0 },
                    { label: 'Bloom hard', value: 'BLOOM_HARD', price: 0 },
                    { label: 'Bloom window', value: 'BLOOM_WINDOW', price: 0 },
                    { label: 'Bloom window+', value: 'BLOOM_WINDOW_PLUS', price: 0 },
                    { label: 'Bloom vertical', value: 'BLOOM_VERTICAL', price: 0 },
                    { label: 'Bloom dome', value: 'bloom_dome', price: 0 },
                    { label: 'Bloom bascet', value: 'bloom_bascet', price: 0 },
                    { label: 'Bloom zip', value: 'BLOOM_ZIP', price: 0 },
                    { label: 'Bloom roll', value: 'bloom_roll', price: 0 }
                ],
                hidePriceInLabel: true
            },
            {
                id: 'fabric',
                section: 'Модель и Размеры',
                label: 'Ткань',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Docril', value: 'Docril', price: 0 }
                ],
                hidePriceInLabel: true
            },
            {
                id: 'angle',
                section: 'Модель и Размеры',
                label: 'Угол наклона',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '90°', value: '90', price: 0 },
                    { label: '160°', value: '160', price: 0 }
                ],
                hidePriceInLabel: true,
                visibleIf: {
                    optionId: 'model',
                    values: ['BLOOM_WINDOW', 'BLOOM_WINDOW_PLUS']
                }
            },
            {
                id: 'width',
                section: 'Модель и Размеры',
                label: 'Ширина (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'projection',
                section: 'Модель и Размеры',
                label: 'Вылет (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            // Оснащение
            {
                id: 'lighting',
                section: 'Оснащение',
                label: 'Освещение',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'none', price: 0 },
                    { label: 'Локоть до 2.5 м', value: 'arm_2_5', price: 12000 },
                    { label: 'Локоть до 3.5 м', value: 'arm_3_5', price: 18000 },
                    { label: 'Локоть 4 м', value: 'arm_4', price: 23500 }
                ]
            },
            {
                id: 'control_system',
                section: 'Оснащение',
                label: 'Управление',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Ручной', value: 'manual', price: 0 },
                    { label: 'С ару Hercules HGM45RM', value: 'hgm45rm', price: 12000 },
                    { label: 'Без ару Hercules HGM45R', value: 'hgm45r', price: 10000 },
                    { label: 'С ару и освещением Hercules HGM45RMD', value: 'hgm45rmd', price: 15000 }
                ]
            },
            {
                id: 'additional_remote',
                section: 'Оснащение',
                label: 'Доп пульт управления',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '1 канальный', value: 'chan_1', price: 1800 },
                    { label: '15 канальный', value: 'chan_15', price: 3800 }
                ]
            },
            {
                id: 'additional_crank',
                section: 'Оснащение',
                label: 'Доп вороток (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'шт'
            },
            {
                id: 'logo',
                section: 'Оснащение',
                label: 'Логотип',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'no', price: 0 },
                    { label: 'Есть', value: 'yes', price: 5500 }
                ]
            },
            {
                id: 'sensors',
                section: 'Оснащение',
                label: 'Датчики',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Нет', value: 'none', price: 0 },
                    { label: 'Датчик ветра', value: 'wind', price: 10000 },
                    { label: 'Датчик колебания', value: 'vibration', price: 7000 }
                ]
            },
            // Работы
            {
                id: 'installation_works',
                section: 'Работы',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'До 2.5 метров', value: 'up_to_2_5', price: 3000 },
                    { label: 'До 4.5 метра', value: 'up_to_4_5', price: 6000 },
                    { label: 'До 6 метров', value: 'up_to_6', price: 11000 }
                ]
            },
            {
                id: 'high_altitude_work',
                section: 'Работы',
                label: 'Высотная работа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'До 3.5 метра', value: 'up_to_3_5', price: 0 },
                    { label: 'До 4.5 метров', value: 'up_to_4_5', price: 3500 },
                    { label: 'До 6 метров', value: 'up_to_6', price: 6500 },
                    { label: 'Выше 6 метров', value: 'above_6', price: 15000 }
                ]
            },
            {
                id: 'chemical_anchors',
                section: 'Работы',
                label: 'Хим анкеры (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 700,
                unit: 'шт'
            },
            {
                id: 'power_cable',
                section: 'Работы',
                label: 'Подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'метр'
            },
            {
                id: 'wall_channeling',
                section: 'Работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'метр'
            },
            {
                id: 'unaccounted_expenses',
                section: 'Работы',
                label: 'Неучтенка (сом)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сум'
            },
            // Параметры
            {
                id: 'frame_color',
                section: 'Параметры',
                label: 'Цвет каркаса',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Белый', value: 'white', price: 0 },
                    { label: 'Антрацит', value: 'anthracite', price: 0 },
                    { label: 'Черный', value: 'black', price: 0 }
                ],
                hidePriceInLabel: true
            },
            {
                id: 'fabric_color_code',
                section: 'Параметры',
                label: 'Код цвета ткани',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'control_side',
                section: 'Параметры',
                label: 'Сторона управления',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Правая', value: 'right', price: 0 },
                    { label: 'Левая', value: 'left', price: 0 }
                ],
                hidePriceInLabel: true
            },
            {
                id: 'valance',
                section: 'Параметры',
                label: 'Волан',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ],
                hidePriceInLabel: true
            },
            {
                id: 'mounting_type',
                section: 'Параметры',
                label: 'Тип крепления',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Потолок', value: 'ceiling', price: 0 },
                    { label: 'Стена', value: 'wall', price: 0 }
                ],
                hidePriceInLabel: true
            },
            {
                id: 'wall_surface_chars',
                section: 'Параметры',
                label: 'Хар-ки поверхности стене',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Сары таш', value: 'sary_tash', price: 0 },
                    { label: 'Алюкобон', value: 'alucobond', price: 0 },
                    { label: 'Клинкер', value: 'clinker', price: 0 },
                    { label: 'Керамогранит', value: 'porcelain', price: 0 },
                    { label: 'Прочее', value: 'other', price: 0 }
                ]
            },
            {
                id: 'distance_from_facade',
                section: 'Параметры',
                label: 'Отступ от фасада (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'notes',
                section: 'Параметры',
                label: 'Примечания',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'quantity',
                section: 'Итого',
                label: 'Кол-во (штук)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'штук'
            }
        ]
    },
    'umbrellas-production': {
        productId: 'umbrellas-production',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            {
                id: 'selected_size',
                section: 'Параметры заказа',
                label: 'Размер',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '3x3', value: '3x3', price: 120300 },
                    { label: '3.5x3.5', value: '3.5x3.5', price: 156000 },
                    { label: '4x4', value: '4x4', price: 160000 },
                    { label: 'Двух куп 3x3', value: 'twin_3x3', price: 172500 },
                    { label: 'Двух куп 3.5x3.5', value: 'twin_3.5x3.5', price: 270000 },
                    { label: 'Двух куп 4x4', value: 'twin_4x4', price: 277600 }
                ]
            },
            {
                id: 'quantity',
                section: 'Параметры заказа',
                label: 'Кол-во',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'шт'
            },
            {
                id: 'fabric_color_code',
                section: 'Характеристики',
                label: 'Код цвета ткани',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'logo',
                section: 'Характеристики',
                label: 'Логотип',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'base',
                section: 'Характеристики',
                label: 'Основание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'unaccounted_costs',
                section: 'Дополнительно',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'unaccounted_description',
                section: 'Дополнительно',
                label: 'Описание неучтенки',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'notes',
                section: 'Дополнительно',
                label: 'Примечания',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'ready-made-awnings': {
        productId: 'ready-made-awnings',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Выбор модели
            {
                id: 'model_size',
                section: 'Выбор маркизы',
                label: 'Размер (Ширина x Вылет)',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '3 x 2.5', value: '3x2.5', price: 17100 },
                    { label: '3.5 x 2.5', value: '3.5x2.5', price: 18000 },
                    { label: '4 x 3', value: '4x3', price: 21600 },
                    { label: '5 x 3', value: '5x3', price: 24750 }
                ]
            },
            {
                id: 'color',
                section: 'Выбор маркизы',
                label: 'Цвет',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Беж', value: 'beige', price: 0 },
                    { label: 'Желтовато белый', value: 'yellowish_white', price: 0 }
                ]
            },
            // Работы и допы
            {
                id: 'installation_works',
                section: 'Работы',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Не требуется', value: 'none', price: 0 },
                    { label: 'До 2.5 метров', value: 'max_2.5', price: 3000 },
                    { label: 'До 4.5 метров', value: 'max_4.5', price: 6000 },
                    { label: 'До 6.0 метров', value: 'max_6.0', price: 11000 }
                ]
            },
            {
                id: 'unaccounted_expenses',
                section: 'Работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'unaccounted_description',
                section: 'Работы',
                label: 'Описание неучтенки',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            // Общее
            {
                id: 'quantity',
                section: 'Общее',
                label: 'Количество (шт)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'шт'
            }
        ]
    },
    'ready-made-umbrellas-3x3-light': {
        productId: 'ready-made-umbrellas-3x3-light',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 39000,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            {
                id: 'color',
                section: 'Параметры',
                label: 'Цвет ткани',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Бежевый', value: 'beige', price: 0 },
                    { label: 'Темно-красный', value: 'dark_red', price: 0 },
                    { label: 'Темно-зеленый', value: 'dark_green', price: 0 },
                    { label: 'Белый', value: 'white', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 }
                ]
            },
            {
                id: 'quantity',
                section: 'Параметры',
                label: 'Кол-во',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'шт'
            }
        ]
    },
    'pergolas-production': {
        productId: 'pergolas-production',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Модель и Размеры
            {
                id: 'model',
                section: 'Модель и Размеры',
                label: 'Модель',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Тентовая эко', value: 'tent_eco', price: 9400 },
                    { label: 'Тентовая авто', value: 'tent_auto', price: 24400 },
                    { label: 'Биоклимат 265 модель', value: 'bioclimat_265', price: 57600 },
                    { label: 'Биоклимат 240 модель сдвиж', value: 'bioclimat_240_sliding', price: 61600 }
                ]
            },
            {
                id: 'width',
                section: 'Модель и Размеры',
                label: 'Ширина (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'length',
                section: 'Модель и Размеры',
                label: 'Длина (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            // Оснащение и услуги
            {
                id: 'anchors_count',
                section: 'Оснащение и услуги',
                label: 'Хим анкеры (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 700,
                unit: 'шт'
            },
            {
                id: 'cable_meters',
                section: 'Оснащение и услуги',
                label: 'Подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'chipping_meters',
                section: 'Оснащение и услуги',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'unaccounted_sum',
                section: 'Оснащение и услуги',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            // Параметры
            {
                id: 'lighting',
                section: 'Параметры',
                label: 'Освещение',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            {
                id: 'mounting_type_general',
                section: 'Параметры',
                label: 'Вид крепления',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'wall_chars',
                section: 'Параметры',
                label: 'Характеристика стены/потолка',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'installation_type',
                section: 'Параметры',
                label: 'Тип монтажа',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'note',
                section: 'Параметры',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'quantity',
                section: 'Итого',
                label: 'Кол-во (штук)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'штук'
            }
        ]
    },
    'ready-made-bioclimatic-pergolas': {
        productId: 'ready-made-bioclimatic-pergolas',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Выбор модели
            {
                id: 'selected_size',
                section: 'Параметры заказа',
                label: 'Размер',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '3x3', value: '3x3', price: 169900 },
                    { label: '4x4', value: '4x4', price: 254880 },
                    { label: '3x4', value: '3x4', price: 173700 },
                    { label: '3x5', value: '3x5', price: 238950 },
                    { label: '4x6', value: '4x6', price: 382320 }
                ]
            },
            {
                id: 'quantity',
                section: 'Параметры заказа',
                label: 'Кол-во',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'шт'
            },
            // Услуги
            {
                id: 'installation_required',
                section: 'Монтаж',
                label: 'Монтажные работы',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Да', value: 'yes', price: 0 },
                    { label: 'Нет', value: 'no', price: 0 }
                ]
            },
            // Дополнительные работы
            {
                id: 'chemical_anchors',
                section: 'Дополнительные работы',
                label: 'Хим анкеры (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 700,
                unit: 'шт'
            },
            {
                id: 'power_cable',
                section: 'Дополнительные работы',
                label: 'Подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'м'
            },
            {
                id: 'wall_chasing',
                section: 'Дополнительные работы',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'м'
            },
            {
                id: 'unaccounted_sum',
                section: 'Дополнительные работы',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            }
        ]
    },
    'bloom-zip': {
        productId: 'bloom-zip',
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Технические параметры
            {
                id: 'width',
                section: 'Технические параметры',
                label: 'Ширина (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'height',
                section: 'Технические параметры',
                label: 'Высота (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'visibility',
                section: 'Технические параметры',
                label: '% видимости',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: '0%', value: '0', price: 0 },
                    { label: '1%', value: '1', price: 0 },
                    { label: '5%', value: '5', price: 0 },
                    { label: '10%', value: '10', price: 0 },
                    { label: '20%', value: '20', price: 0 },
                    { label: '30%', value: '30', price: 0 }
                ]
            },
            // Цвета
            {
                id: 'frame_color',
                section: 'Цвета',
                label: 'Цвет каркаса',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Черный', value: 'black', price: 0 },
                    { label: 'Темно-серый', value: 'dark_gray', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 },
                    { label: 'Светло-серый', value: 'light_gray', price: 0 }
                ]
            },
            {
                id: 'fabric_color',
                section: 'Цвета',
                label: 'Цвет полотна',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Белый', value: 'white', price: 0 },
                    { label: 'Бежевый', value: 'beige', price: 0 },
                    { label: 'Белый микс с серым', value: 'white_gray_mix', price: 0 },
                    { label: 'Светло-серый', value: 'light_gray', price: 0 },
                    { label: 'Темно-серый', value: 'dark_gray', price: 0 },
                    { label: 'Коричневый', value: 'brown', price: 0 },
                    { label: 'Белый микс с черным', value: 'white_black_mix', price: 0 },
                    { label: 'Черный', value: 'black', price: 0 }
                ]
            },
            // Дополнительные услуги
            {
                id: 'chemical_anchors',
                section: 'Дополнительные услуги',
                label: 'Хим анкеры (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 700,
                unit: 'шт'
            },
            {
                id: 'power_cable',
                section: 'Дополнительные услуги',
                label: 'Подводка силового кабеля (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 180,
                unit: 'метр'
            },
            {
                id: 'wall_chasing',
                section: 'Дополнительные услуги',
                label: 'Штробление + замазка (м)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 500,
                unit: 'метр'
            },
            // Прочее
            {
                id: 'unrecorded_costs',
                section: 'Прочее',
                label: 'Неучтенка (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'unrecorded_description',
                section: 'Прочее',
                label: 'Описание неучтенки',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'notes',
                section: 'Прочее',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'quantity',
                section: 'Итого',
                label: 'Количество (шт)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'шт'
            }
        ]
    },
    'frameless-glazing': {
        productId: 'frameless-glazing',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            {
                id: 'width_mm',
                section: 'Размеры',
                label: 'Ширина (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'height_mm',
                section: 'Размеры',
                label: 'Высота (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0,
                unit: 'мм'
            },
            {
                id: 'holes_count',
                section: 'Дополнительно',
                label: 'Количество отверстий',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2500,
                unit: 'шт'
            },
            {
                id: 'overhead_costs',
                section: 'Дополнительно',
                label: 'Накладные расходы (сумма)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'notes',
                section: 'Дополнительно',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    },
    'soft-windows': {
        productId: 'soft-windows',
        hideDimensions: true,
        dimensions: {
            baseWidth: 0,
            baseHeight: 0,
            basePrice: 0,
            widthStep: 0,
            widthPricePerStep: 0,
            heightStep: 0,
            heightPricePerStep: 0,
        },
        frames: [],
        options: [
            // Пленка и Размеры
            {
                id: 'film_type',
                section: 'Пленка и Размеры',
                label: 'Тип пленки',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Прозрачная', value: 'transparent', price: 0 },
                    { label: 'Затемненная', value: 'tinted', price: 0 }
                ]
            },
            {
                id: 'width_bottom',
                section: 'Пленка и Размеры',
                label: 'Ширина низ (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'width_top',
                section: 'Пленка и Размеры',
                label: 'Ширина верх (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'height_left',
                section: 'Пленка и Размеры',
                label: 'Высота лево (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'height_right',
                section: 'Пленка и Размеры',
                label: 'Высота право (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            // Конфигурация
            {
                id: 'zipper_quantity',
                section: 'Конфигурация',
                label: 'Молния (шт)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 2000,
                unit: 'шт'
            },
            {
                id: 'installation_side',
                section: 'Конфигурация',
                label: 'Сторона монтажа',
                type: 'select',
                priceType: 'fixed',
                options: [
                    { label: 'Снаружи', value: 'outside', price: 0 },
                    { label: 'Внутри', value: 'inside', price: 0 }
                ]
            },
            {
                id: 'skirt_width',
                section: 'Конфигурация',
                label: 'Ширина юбки (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            // Окантовка и Каркас
            {
                id: 'edging_color',
                section: 'Окантовка и Каркас',
                label: 'Цвет окантовки',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'lower_edging_height',
                section: 'Окантовка и Каркас',
                label: 'Высота нижней окантовки (мм)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'frame_profile',
                section: 'Окантовка и Каркас',
                label: 'Профиль каркаса (металл/дерево)',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'frame_color',
                section: 'Окантовка и Каркас',
                label: 'Цвет каркаса',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'frame_additional_cost',
                section: 'Окантовка и Каркас',
                label: 'Доп стоимость каркаса (сом)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            // Работы и Дополнительно
            {
                id: 'mounting_base',
                section: 'Работы и Дополнительно',
                label: 'Основание для монтажа',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'high_altitude_work',
                section: 'Работы и Дополнительно',
                label: 'Высотная работа (высота)',
                type: 'number',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'misc_description',
                section: 'Работы и Дополнительно',
                label: 'Описание неучтенки',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            },
            {
                id: 'miscellaneous_additional_cost',
                section: 'Работы и Дополнительно',
                label: 'Сумма неучтенки (сом)',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: 1,
                unit: 'сом'
            },
            {
                id: 'note',
                section: 'Работы и Дополнительно',
                label: 'Примечание',
                type: 'input',
                priceType: 'fixed',
                priceValue: 0
            }
        ]
    }
};
