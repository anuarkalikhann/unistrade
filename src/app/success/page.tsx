'use client';

import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            <div className="max-w-md mx-auto py-20 px-4 flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Заказ отправлен!</h2>
                <p className="text-slate-600 mb-10">Данные успешно переданы менеджеру.</p>

                <Button size="lg" className="w-full bg-slate-900" onClick={() => router.push('/')}>
                    Новый расчет
                </Button>
            </div>
        </main>
    );
}
