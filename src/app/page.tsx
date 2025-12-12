import { ProductGrid } from '@/components/calculator/ProductGrid';
import { Header } from '@/components/ui/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 px-2">Выберите продукт</h2>
        <ProductGrid />
      </div>
    </main>
  );
}
