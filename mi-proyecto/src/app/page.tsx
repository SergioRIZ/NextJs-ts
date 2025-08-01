import Tareas from "@/components/TareasPersonales/Tareas";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
      <Tareas/>
      </div>
    </main>
  );
}