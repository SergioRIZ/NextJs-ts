interface FilterPillsProps {
    filtrar: string;
    setFiltrar: (value: string) => void;
}

const FilterPills = ({ filtrar, setFiltrar }: FilterPillsProps) => {
    return (
        <div className="flex gap-3 flex-wrap">
            {[
                { value: 'todas', label: '📋 Todas', icon: '📋' },
                { value: 'pendientes', label: '⏳ Pendientes', icon: '⏳' },
                { value: 'completadas', label: '✅ Completadas', icon: '✅' }
            ].map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => setFiltrar(filter.value)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        filtrar === filter.value
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default FilterPills;