import Perfil from '@/components/Perfil';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="space-y-8 max-w-md mx-auto">
        <Perfil />
      </div>
    </main>
  );
}