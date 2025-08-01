interface CategoryDropdownProps {
    filtrarCategoria: string;
    setFiltrarCategoria: (value: string) => void;
    dropdownAbierto: boolean;
    setDropdownAbierto: (value: boolean) => void;
    categorias: string[];
    eliminarCategoria: (categoria: string) => void;
    setCreandoCategoria: (value: boolean) => void;
}

const CategoryDropdown = ({
    filtrarCategoria,
    setFiltrarCategoria,
    dropdownAbierto,
    setDropdownAbierto,
    categorias,
    eliminarCategoria,
    setCreandoCategoria
}: CategoryDropdownProps) => {
    return (
        <div className="w-full">
            <button
                onClick={() => setDropdownAbierto(!dropdownAbierto)}
                className="px-4 py-3 rounded-xl font-medium bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 cursor-pointer"
            >
                🏷️ {filtrarCategoria === 'todas' ? 'Todas las categorías' : filtrarCategoria} ▼
            </button>
            
            {dropdownAbierto && (
                <div className="mt-2 w-full bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div
                        onClick={() => {
                            setFiltrarCategoria('todas');
                            setDropdownAbierto(false);
                        }}
                        className="px-4 py-3 text-white hover:bg-white/10 cursor-pointer border-b border-white/10 transition-colors duration-200"
                    >
                        🏷️ Todas las categorías
                    </div>
                    
                    {categorias.map(categoria => (
                        <div key={categoria} className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 border-b border-white/10 transition-colors duration-200">
                            <span
                                onClick={() => {
                                    setFiltrarCategoria(categoria);
                                    setDropdownAbierto(false);
                                }}
                                className="flex-1 cursor-pointer"
                            >
                            {categoria === 'Trabajo' ? '🏢' : 
                            categoria === 'Personal' ? '🏠' : 
                            categoria === 'Urgente' ? '🚨' : 
                            categoria === 'Proyectos' ? '🎯': '🧭'} {categoria}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    eliminarCategoria(categoria);
                                }}
                                className="ml-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded p-1 transition-colors"
                                title={`Eliminar ${categoria}`}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                    
                    <div
                        onClick={() => {
                            setCreandoCategoria(true);
                            setDropdownAbierto(false);
                        }}
                        className="px-4 py-3 text-white hover:bg-white/10 cursor-pointer transition-colors duration-200"
                    >
                        ➕ Crear nueva categoria...
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;