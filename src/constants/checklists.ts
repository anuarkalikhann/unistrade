import { ProductChecklist } from '@/types';

export const CHECKLISTS: Record<string, ProductChecklist> = {
    'sliding-gates': {
        productId: 'sliding-gates',
        questions: [
            { id: 'foundation_poured', text: 'Тумба залита?', type: 'select', options: ['да', 'нет'] },
            { id: 'perpendicularity', text: 'Перпендикулярность двух тумб (забора) соблюдена?', type: 'select', options: ['да', 'нет'] },
            { id: 'power_supply', text: 'Электропитание', type: 'select', options: ['с подключением', 'от заказчика'] },
            { id: 'zero_point', text: 'Нулевая точка выставлена?', type: 'select', options: ['нет', 'есть'] },
        ],
    },
    'swing-gates': {
        productId: 'swing-gates',
        questions: [
            { id: 'foundation_poured', text: 'Тумба залита?', type: 'select', options: ['да', 'нет'] },
            { id: 'perpendicularity', text: 'Перпендикулярность двух тумб (забора) соблюдена?', type: 'select', options: ['да', 'нет'] },
            { id: 'power_supply', text: 'Электропитание', type: 'select', options: ['с подключением', 'от заказчика'] },
            { id: 'zero_point', text: 'Нулевая точка выставлена?', type: 'select', options: ['нет', 'есть'] },
            { id: 'stand_level', text: 'Уровень тумб (стояк) проверен?', type: 'select', options: ['есть', 'нет'] },
            { id: 're_measure', text: 'Требуется повторный замер?', type: 'select', options: ['да', 'нет'] },
        ]
    },
    'sectional-gates': {
        productId: 'sectional-gates',
        questions: [
            { id: 'ground_level', text: 'Уровень земли готов?', type: 'select', options: ['да', 'нет'] },
            { id: 'stand_level', text: 'Уровень тумб (стояк) проверен?', type: 'select', options: ['да', 'нет'] },
            { id: 'lintel_ready', text: 'Притолка готова?', type: 'select', options: ['есть', 'нет'] },
            { id: 're_measure', text: 'Требуется повторный замер?', type: 'select', options: ['да', 'нет'] },
            { id: 'zero_point', text: 'Нулевая точка выставлена?', type: 'select', options: ['нет', 'есть'] },
            { id: 'plot_slope', text: 'Есть уклон участка?', type: 'select', options: ['есть', 'нет'] },
        ]
    },
    'barrier-anti-vandal': {
        productId: 'barrier-anti-vandal',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'barrier': {
        productId: 'barrier',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'sliding-rework': {
        productId: 'sliding-rework',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'sliding-automation': {
        productId: 'sliding-automation',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'swing-automation': {
        productId: 'swing-automation',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'sectional-repair': {
        productId: 'sectional-repair',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'turnstile': {
        productId: 'turnstile',
        questions: [
            { id: 'tech_nuances', text: 'Есть технические нюансы?', type: 'select', options: ['нет', 'указал в примечании'] },
        ]
    },
    'wicket': {
        productId: 'wicket',
        questions: [
            { id: 'gap_height', text: 'Щель по высоте допустима/согласована?', type: 'select', options: ['да', 'нет'] },
        ]
    }
};
