import { useState, Dispatch, SetStateAction } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
    categorias: string;
}

export const useEdicion = (tareas: Tarea[], setTareas: Dispatch<SetStateAction<Tarea[]>>) => {
    const [editarTarea, setEditarTarea] = useState<{id: number, texto: string} | null>(null);
    const [errorEdicion, setErrorEdicion] = useState<string>('');

    const empezarEdicion = (id: number, descripcionActual: string) => {
        setEditarTarea({
            id: id,
            texto: descripcionActual
        });
    };

    const confirmarEdicion = () => {
        if(editarTarea?.texto.trim() === ''){
            setErrorEdicion('Te has dejado el texto en blanco!!!')
            return
        }
        setErrorEdicion('')
        setTareas(tareas.map(tarea =>
            tarea.id === editarTarea?.id ? {...tarea, texto: editarTarea.texto}: tarea
        ))
        setEditarTarea(null)
    };

    const cancelarEdicion = () => {
        setEditarTarea(null)
        setErrorEdicion('')
    };

    return {
        editarTarea,
        setEditarTarea,
        errorEdicion,
        empezarEdicion,
        confirmarEdicion,
        cancelarEdicion
    };
};