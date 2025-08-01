import { useState, useEffect } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
    categorias: string;
}

export const useCategorias = (tareas: Tarea[]) => {
    const [categorias, setCategorias] = useState<string[]>([]);
    const [categoriasInicializadas, setCategoriasInicializadas] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [creandoCategoria, setCreandoCategoria] = useState<boolean>(false);
    const [nuevaCategoria, setNuevaCategoria] = useState<string>('');

    const guardarNuevaCategoria = () => {
        if (nuevaCategoria.trim() !== '') {
            setCategorias([...categorias, nuevaCategoria.trim()]);
            setCategoriaSeleccionada(nuevaCategoria.trim());
            setCreandoCategoria(false);
            setNuevaCategoria('');
        }
    };

    const eliminarCategoria = (categoriaAEliminar: string, setFiltrarCategoria: (value: string) => void) => {
        const tareasConCategoria = tareas.filter(tarea => tarea.categorias === categoriaAEliminar);
        
        if (tareasConCategoria.length > 0) {
            alert(`No puedes eliminar "${categoriaAEliminar}" porque hay ${tareasConCategoria.length} tarea(s) con esta categoría.`);
            return;
        }
        
        const nuevasCategorias = categorias.filter(categoria => categoria !== categoriaAEliminar);
        setCategorias(nuevasCategorias);
        
        // Si se elimina la categoría seleccionada, cambiar a la primera disponible
        if (categoriaSeleccionada === categoriaAEliminar) {
            setCategoriaSeleccionada(nuevasCategorias.length > 0 ? nuevasCategorias[0] : 'Personal');
        }
        
        setFiltrarCategoria('todas');
    };

    // LocalStorage para categorías
    useEffect(() => {
        const categoriasGuardadas = localStorage.getItem('categorias');
        
        if (categoriasGuardadas) {
            try {
                const categoriasParseadas = JSON.parse(categoriasGuardadas);
                if (Array.isArray(categoriasParseadas) && categoriasParseadas.length > 0) {
                    setCategorias(categoriasParseadas);
                    setCategoriaSeleccionada(categoriasParseadas[0]);
                } else {
                    // Si el array está vacío o corrupto, usar defaults
                    const categoriasDefault = ['Trabajo', 'Personal', 'Urgente', 'Proyectos'];
                    setCategorias(categoriasDefault);
                    setCategoriaSeleccionada('Personal');
                    localStorage.setItem('categorias', JSON.stringify(categoriasDefault));
                }
            } catch {
                // Si hay error al parsear, usar defaults
                const categoriasDefault = ['Trabajo', 'Personal', 'Urgente', 'Proyectos'];
                setCategorias(categoriasDefault);
                setCategoriaSeleccionada('Personal');
                localStorage.setItem('categorias', JSON.stringify(categoriasDefault));
            }
        } else {
            // Si no hay nada en localStorage, usar defaults
            const categoriasDefault = ['Trabajo', 'Personal', 'Urgente', 'Proyectos'];
            setCategorias(categoriasDefault);
            setCategoriaSeleccionada('Personal');
            localStorage.setItem('categorias', JSON.stringify(categoriasDefault));
        }
        
        setCategoriasInicializadas(true); 
    }, []); 

    useEffect(() => {
        if (categoriasInicializadas) { 
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }
    }, [categorias, categoriasInicializadas]);

    return {
        categorias,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        creandoCategoria,
        setCreandoCategoria,
        nuevaCategoria,
        setNuevaCategoria,
        guardarNuevaCategoria,
        eliminarCategoria
    };
};