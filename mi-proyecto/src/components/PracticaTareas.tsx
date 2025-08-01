'use client';

import { useState } from 'react';

const Tareas = () => {

    const [tareas, setTareas] = useState<{id: number, texto: string, completada: boolean}[]>([]);
    const [tarea, setTarea] = useState('');
    const [filtro, setFiltro] = useState('todas');

    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = tareas.filter(t => !t.completada).length;
    const total = tareas.length;

    const agregarTarea = () => {
        if (tarea.trim() === '') return;

        const nuevaTarea = {
            id: Date.now(),
            texto: tarea,
            completada: false
        };
        setTareas([...tareas, nuevaTarea]);
        setTarea('');
    }

    const deletetask = (id:number) => {
        setTareas(tareas.filter(tarea => tarea.id !==id))
    }

    const toggleCompletada = (id:number) => {
        setTareas(tareas.map( t => 
            t.id === id ? {...t, completada: !t.completada} :t ));
    }

    const tareasFiltradas = tareas.filter(tarea => {
        if (filtro === 'todas') {
                return true;
        }
        if (filtro === 'pendientes'){
                return !tarea.completada
        }
        if(filtro === 'completadas') {
                return tarea.completada
        }
    })

    const progreso = total > 0 ? (completadas / total) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        ✅ TaskFlow
                    </h1>
                    <p className="text-gray-600">Organiza tu día, alcanza tus metas</p>
                </div>

                {/* Card principal */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-8 space-y-8">
                    
                    {/* Barra de progreso */}
                    {total > 0 && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Progreso del día</span>
                                <span>{Math.round(progreso)}% completado</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 ease-out"
                                    style={{ width: `${progreso}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Input para nueva tarea */}
                    <div className="relative">
                        <div className="flex gap-3">
                            <div className="relative flex-grow">
                                <input 
                                    type="text" 
                                    placeholder="¿Qué quieres lograr hoy?"
                                    value={tarea}
                                    onChange={(e) => setTarea(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
                                    className="w-full pl-12 text-black pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </div>
                            </div>
                            <button 
                                onClick={agregarTarea}
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                            <div className="text-2xl font-bold text-blue-600">{total}</div>
                            <div className="text-sm text-blue-600">Total</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                            <div className="text-2xl font-bold text-amber-600">{pendientes}</div>
                            <div className="text-sm text-amber-600">Pendientes</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                            <div className="text-2xl font-bold text-emerald-600">{completadas}</div>
                            <div className="text-sm text-emerald-600">Completadas</div>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="flex justify-center">
                        <select 
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className="px-6 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-medium text-gray-700"
                        >
                            <option value="todas">📋 Todas las tareas</option>
                            <option value="pendientes">⏳ Pendientes</option>
                            <option value="completadas">✅ Completadas</option>
                        </select>
                    </div>

                    {/* Lista de tareas */}
                    <div className="space-y-3">
                        {tareasFiltradas.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🎯</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    {filtro === 'todas' ? '¡Comienza agregando tu primera tarea!' : 
                                     filtro === 'pendientes' ? '¡Genial! No tienes tareas pendientes' :
                                     '¡Aún no has completado ninguna tarea!'}
                                </h3>
                                <p className="text-gray-500">
                                    {filtro === 'todas' ? 'Organiza tu día y alcanza tus objetivos' : 
                                     filtro === 'pendientes' ? 'Tiempo perfecto para relajarte' :
                                     'Completa algunas tareas para ver tu progreso'}
                                </p>
                            </div>
                        ) : (
                            tareasFiltradas.map((tarea) => (
                                <div 
                                    key={tarea.id}
                                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md ${
                                        tarea.completada 
                                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' 
                                            : 'bg-white border-gray-200 hover:border-indigo-300'
                                    }`}
                                >
                                    {/* Checkbox personalizado */}
                                    <label className="relative flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={tarea.completada}
                                            onChange={() => toggleCompletada(tarea.id)}
                                            className="sr-only"
                                        />
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                            tarea.completada 
                                                ? 'bg-emerald-500 border-emerald-500' 
                                                : 'border-gray-300 hover:border-indigo-400'
                                        }`}>
                                            {tarea.completada && (
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                                                </svg>
                                            )}
                                        </div>
                                    </label>

                                    {/* Texto de la tarea */}
                                    <span className={`flex-grow text-lg transition-all duration-200 ${
                                        tarea.completada 
                                            ? 'line-through text-gray-500' 
                                            : 'text-gray-800'
                                    }`}>
                                        {tarea.texto}
                                    </span>

                                    {/* Botón eliminar */}
                                    <button 
                                        onClick={() => deletetask(tarea.id)}
                                        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                                        title="Eliminar tarea"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer motivacional */}
                    {total > 0 && (
                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-gray-600">
                                {completadas === total && total > 0 
                                    ? "🎉 ¡Increíble! Has completado todas tus tareas del día" 
                                    : `💪 ¡Sigue así! Te quedan ${pendientes} tareas por completar`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tareas;