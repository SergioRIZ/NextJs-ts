interface TaskItemProps {
    tarea: {id: number, texto: string, completada: boolean, categorias: string};
    position: number;
    toggleCompletada: (id: number) => void;
    editarTarea: {id: number, texto: string} | null;
    setEditarTarea: (value: {id: number, texto: string} | null) => void;
    empezarEdicion: (id: number, descripcionActual: string) => void;
    confirmarEdicion: () => void;
    cancelarEdicion: () => void;
    errorEdicion: string;
    eliminarTarea: (id: number) => void;
}

const TaskItem = ({
    tarea,
    position,
    toggleCompletada,
    editarTarea,
    setEditarTarea,
    empezarEdicion,
    confirmarEdicion,
    cancelarEdicion,
    errorEdicion,
    eliminarTarea
}: TaskItemProps) => {
    return (
        <div 
            className={`group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl ${
                tarea.completada 
                    ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30' 
                    : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/30'
            }`}
            style={{
                animationDelay: `${position * 0.1}s`
            }}
        >
            <div className="flex items-center gap-6">
                <div className="relative">
                    <input 
                        type="checkbox" 
                        checked={tarea.completada}
                        onChange={() => toggleCompletada(tarea.id)}
                        className="sr-only"
                    />
                    <div 
                        onClick={() => toggleCompletada(tarea.id)}
                        className={`w-7 h-7 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                            tarea.completada 
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 shadow-lg shadow-green-400/50' 
                                : 'border-white/30 hover:border-purple-400 bg-white/5'
                        }`}
                    >
                        {tarea.completada && (
                            <svg className="w-4 h-4 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>
                
                <div className="flex-1">
                    {editarTarea && editarTarea.id === tarea.id ? (
                        <div className="relative">
                            <input 
                                type="text" 
                                value={editarTarea.texto}
                                onChange={(e) => setEditarTarea({...editarTarea, texto: e.target.value})}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        confirmarEdicion();
                                    } else if (e.key === 'Escape') {
                                        cancelarEdicion();
                                    }
                                }}
                                onBlur={() => cancelarEdicion()}
                                className={`flex-1 text-lg font-medium bg-white/20 border rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                    errorEdicion ? 'border-red-400 focus:ring-red-400' : 'border-purple-400/50 focus:ring-purple-400'
                                }`}
                                autoFocus
                            />
                            {errorEdicion && (
                                <p className="text-red-300 text-xs mt-1">⚠️ {errorEdicion}</p>
                            )}
                        </div>
                    ): (
                        <span 
                            onDoubleClick={() => empezarEdicion(tarea.id, tarea.texto)}
                            className={`text-lg font-medium transition-all duration-300 cursor-pointer hover:text-purple-200 ${
                                tarea.completada 
                                    ? 'line-through text-white/50' 
                                    : 'text-white group-hover:text-purple-200'
                            }`}
                        >
                            {tarea.texto}
                        </span>
                    )}
                </div>
                
                <div className="flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${
                        tarea.categorias === 'Trabajo' ? 'bg-blue-400/20 text-blue-300 border border-blue-400/30' :
                        tarea.categorias === 'Personal' ? 'bg-purple-400/20 text-purple-300 border border-purple-400/30' :
                        tarea.categorias === 'Urgente' ? 'bg-red-400/20 text-red-300 border border-red-400/30' :
                        'bg-green-400/20 text-green-300 border border-green-400/30'
                    }`}>
                        {tarea.categorias === 'Trabajo' ? '🏢' : 
                        tarea.categorias === 'Personal' ? '🏠' : 
                        tarea.categorias === 'Urgente' ? '🚨' : '🎯'} {tarea.categorias}
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${
                        tarea.completada 
                            ? 'bg-green-400/20 text-green-300 border border-green-400/30' 
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    }`}>
                        {tarea.completada ? '✨ Completada' : '🚀 En progreso'}
                    </div>
                </div>
                
                <button 
                    onClick={() => eliminarTarea(tarea.id)}
                    className="group/btn p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 transform hover:scale-110"
                    title="Eliminar tarea"
                >
                    <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;