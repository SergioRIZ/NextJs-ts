interface TaskInputProps {
    tarea: string;
    setTarea: (value: string) => void;
    nuevaTarea: () => void;
    error: string;
}

const TaskInput = ({ tarea, setTarea, nuevaTarea, error }: TaskInputProps) => {
    return (
        <div className="flex gap-4 mb-6 items-start">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)} 
                    placeholder="¿Qué necesitas hacer hoy?"
                    className={`w-full px-6 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 text-lg ${
                        error ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400/50'
                    }`}
                />
                {error && (
                    <p className="text-red-300 text-sm mt-1">⚠️ {error}</p>
                )}
            </div>
            <button 
                onClick={nuevaTarea}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
            >
                <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Crear
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
    );
};

export default TaskInput;