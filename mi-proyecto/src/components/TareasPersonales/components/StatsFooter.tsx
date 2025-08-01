interface StatsFooterProps {
    tareas: {id: number, texto: string, completada: boolean, categorias: string}[];
}

const StatsFooter = ({ tareas }: StatsFooterProps) => {
    return (
        <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                        <span className="text-2xl">📊</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{tareas.length}</div>
                    <div className="text-white/60 text-sm font-medium">Total de tareas</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{tareas.filter(t => !t.completada).length}</div>
                    <div className="text-white/60 text-sm font-medium">Por completar</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl mb-3 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                        <span className="text-2xl">🎉</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{tareas.filter(t => t.completada).length}</div>
                    <div className="text-white/60 text-sm font-medium">Completadas</div>
                </div>
            </div>
        </div>
    );
};

export default StatsFooter;