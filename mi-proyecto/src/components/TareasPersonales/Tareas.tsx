'use client';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import TaskInput from './components/TaskInput';
import FilterPills from './components/FilterPills';
import CategoryDropdown from './components/CategoryDropdown';
import SearchInput from './components/SearchInput';
import TaskItem from './components/TaskItem';
import EmptyState from './components/EmptyState';
import StatsFooter from './components/StatsFooter';
import { useTareas } from './hooks/useTareas';
import { useCategorias } from './hooks/useCategories';
import { useFiltros } from './hooks/useFiltros';
import { useEdicion } from './hooks/useEdicion';

const Tareas = () => {
    // Hooks personalizados
    const {
        tareas,
        setTareas,
        tarea,
        setTarea,
        error,
        nuevaTarea,
        toggleCompletada,
        eliminarTarea
    } = useTareas();

    const {
        categorias,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        creandoCategoria,
        setCreandoCategoria,
        nuevaCategoria,
        setNuevaCategoria,
        guardarNuevaCategoria,
        eliminarCategoria
    } = useCategorias(tareas);

    const {
        filtrar,
        setFiltrar,
        filtrarCategoria,
        setFiltrarCategoria,
        busqueda,
        setBusqueda,
        dropdownAbierto,
        setDropdownAbierto,
        tareasFiltradas
    } = useFiltros(tareas);

    const {
        editarTarea,
        setEditarTarea,
        errorEdicion,
        empezarEdicion,
        confirmarEdicion,
        cancelarEdicion
    } = useEdicion(tareas, setTareas);

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="relative z-10 p-6">
                <div className="max-w-4xl mx-auto">
                    <Header />
                    
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 shadow-2xl">
                        <CategorySelector 
                            creandoCategoria={creandoCategoria}
                            nuevaCategoria={nuevaCategoria}
                            setNuevaCategoria={setNuevaCategoria}
                            setCreandoCategoria={setCreandoCategoria}
                            guardarNuevaCategoria={guardarNuevaCategoria}
                            categoriaSeleccionada={categoriaSeleccionada}
                            setCategoriaSeleccionada={setCategoriaSeleccionada}
                            categorias={categorias}
                        />
                        
                        <TaskInput 
                            tarea={tarea}
                            setTarea={setTarea}
                            nuevaTarea={() => nuevaTarea(categoriaSeleccionada)}
                            error={error}
                        />
                        
                        <div className="space-y-4">
                            <FilterPills 
                                filtrar={filtrar}
                                setFiltrar={setFiltrar}
                            />
                            
                            <CategoryDropdown 
                                filtrarCategoria={filtrarCategoria}
                                setFiltrarCategoria={setFiltrarCategoria}
                                dropdownAbierto={dropdownAbierto}
                                setDropdownAbierto={setDropdownAbierto}
                                categorias={categorias}
                                eliminarCategoria={(categoria) => eliminarCategoria(categoria, setFiltrarCategoria)}
                                setCreandoCategoria={setCreandoCategoria}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <SearchInput 
                            busqueda={busqueda}
                            setBusqueda={setBusqueda}
                        />
                        
                        {tareasFiltradas.length === 0 ? (
                            <EmptyState filtrar={filtrar} />
                        ) : (
                            tareasFiltradas.map((tarea, position) => (
                                <TaskItem 
                                    key={tarea.id}
                                    tarea={tarea}
                                    position={position}
                                    toggleCompletada={toggleCompletada}
                                    editarTarea={editarTarea}
                                    setEditarTarea={setEditarTarea}
                                    empezarEdicion={empezarEdicion}
                                    confirmarEdicion={confirmarEdicion}
                                    cancelarEdicion={cancelarEdicion}
                                    errorEdicion={errorEdicion}
                                    eliminarTarea={eliminarTarea}
                                />
                            ))
                        )}
                    </div>

                    <StatsFooter tareas={tareas} />
                </div>
            </div>
        </div>
    )
}

export default Tareas;