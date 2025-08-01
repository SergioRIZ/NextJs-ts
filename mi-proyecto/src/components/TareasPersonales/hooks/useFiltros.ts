import { useState } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
    categorias: string;
}

export const useFiltros = (tareas: Tarea[]) => {
    const [filtrar, setFiltrar] = useState<string>('todas');
    const [filtrarCategoria, setFiltrarCategoria] = useState<string>('todas');
    const [busqueda, setBusqueda] = useState<string>('');
    const [dropdownAbierto, setDropdownAbierto] = useState<boolean>(false);

    const tareasFiltradas = tareas.filter(tarea => {    
        const cumpleEstado = filtrar === 'todas' || (filtrar === 'pendientes' && !tarea.completada) || (filtrar === 'completadas' && tarea.completada);
        const cumpleCategoria = filtrarCategoria === 'todas' || tarea.categorias === filtrarCategoria;
        const cumpleBusqueda = busqueda === '' || tarea.texto.toLowerCase().includes(busqueda.toLowerCase());
        
        return cumpleEstado && cumpleBusqueda && cumpleCategoria;
    });

    return {
        filtrar,
        setFiltrar,
        filtrarCategoria,
        setFiltrarCategoria,
        busqueda,
        setBusqueda,
        dropdownAbierto,
        setDropdownAbierto,
        tareasFiltradas
    };
};