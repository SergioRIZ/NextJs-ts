import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
    categorias: string;
}

export const useTareas = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [tarea, setTarea] = useState<string>('');
    const [error, setError] = useState<string>('');

    const nuevaTarea = (categoriaSeleccionada: string) => {
        if(tarea.trim() === '') {
            setError('¡Escribe algo antes de crear la tarea!');
            return;
        }

        if(tareas.some(tareaExistente => {
            return tareaExistente.texto.toLowerCase() === tarea.trim().toLowerCase()
        })) {
            setError('¡Esta tarea ya existe!');
            return
        }

        setError('')
        const nuevaTareaObj = {
            id: tareas.length + 1,
            texto: tarea,
            completada: false,
            categorias: categoriaSeleccionada
        };
        setTareas([...tareas, nuevaTareaObj]);
        setTarea('')
    }

    const toggleCompletada = (id: number) => {
        setTareas(tareas.map(tarea => 
            tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        ));
    }

    const eliminarTarea = (id: number) => {
        setTareas(tareas.filter(tarea => tarea.id !== id));
    }

    // LocalStorage para tareas
    useEffect(() => {
        const tareasGuardadas = localStorage.getItem('tareas');
        if(tareasGuardadas){
            setTareas(JSON.parse(tareasGuardadas));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);

    return {
        tareas,
        setTareas: setTareas as Dispatch<SetStateAction<Tarea[]>>,
        tarea,
        setTarea,
        error,
        nuevaTarea,
        toggleCompletada,
        eliminarTarea
    };
};