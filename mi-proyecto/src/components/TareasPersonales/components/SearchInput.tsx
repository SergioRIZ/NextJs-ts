interface SearchInputProps {
    busqueda: string;
    setBusqueda: (value: string) => void;
}

const SearchInput = ({ busqueda, setBusqueda }: SearchInputProps) => {
    return (
        <div className="mb-4">
            <input 
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="🔍 Buscar tareas..."
                className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
        </div>
    );
};

export default SearchInput;