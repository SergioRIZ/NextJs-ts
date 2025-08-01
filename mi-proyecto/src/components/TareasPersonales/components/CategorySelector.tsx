interface CategorySelectorProps {
    creandoCategoria: boolean;
    nuevaCategoria: string;
    setNuevaCategoria: (value: string) => void;
    setCreandoCategoria: (value: boolean) => void;
    guardarNuevaCategoria: () => void;
    categoriaSeleccionada: string;
    setCategoriaSeleccionada: (value: string) => void;
    categorias: string[];
}

const CategorySelector = ({
    creandoCategoria,
    nuevaCategoria,
    setNuevaCategoria,
    setCreandoCategoria,
    guardarNuevaCategoria,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    categorias
}: CategorySelectorProps) => {
    return (
        <div className="mb-6">
            {creandoCategoria ? (
                <input 
                    type="text" 
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    placeholder="Nombre de la nueva categoria..."
                    onBlur={() => {
                        setCreandoCategoria(false);
                        setNuevaCategoria('');
                    }}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            guardarNuevaCategoria()
                        } else if(e.key === 'Escape'){
                            setCreandoCategoria(false);
                            setNuevaCategoria('');
                        }
                    }}
                    className="w-full mb-4 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                />
            ) : (
                <select 
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="w-full mb-4 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-lg font-medium cursor-pointer hover:bg-white/15"
                >
                    {categorias.map(categoria => (
                        <option 
                            key={categoria} 
                            value={categoria}
                            className="bg-slate-800 text-white"
                        >
                            {categoria === 'Trabajo' ? '🏢' : 
                            categoria === 'Personal' ? '🏠' : 
                            categoria === 'Urgente' ? '🚨' : 
                            categoria === 'Proyectos' ? '🎯': '🧭'} {categoria}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CategorySelector;