'use client';
import React, { useState } from 'react';

const Perfil: React.FC = () => {

const [nombre, setNombre] = useState<string>('');
const [edad, setEdad] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [perfil, setPerfil] = useState<{nombre: string, edad: string, email: string} | null>(null);
const [mostrarPerfil, setMostrarPerfil] = useState(false);
const [mensaje, setMensaje] = useState<{texto: string, tipo: 'success' | 'error'} | null>(null);
const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false);

const saveProfile = () => {
    if (nombre && edad && email) {
        setPerfil({nombre, edad, email})
        setMostrarPerfil(true);
        setNombre('');
        setEdad('');
        setEmail('');
        setMensaje({texto: 'Perfil guardado exitosamente', tipo: 'success'});
        setMostrarMensaje(true);

        setTimeout(() => setMostrarMensaje(false), 2000);

        setTimeout(() => setMensaje(null), 3000);
    }
    else {  
        setMensaje({texto: 'Por favor, complete todos los campos', tipo: 'error'});
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 2000);
        setTimeout(() => setMensaje(null), 2200);
    }
}

const showProfile = () => {
    if (mostrarPerfil) {
        setMostrarPerfil(false);
        setMensaje({texto: 'Perfil oculto', tipo: 'success'});
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 2000);
        setTimeout(() => setMensaje(null), 2200);
    } else {
        setMostrarPerfil(true);
        setMensaje({texto: 'Perfil mostrado', tipo: 'success'});
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 2000);
        setTimeout(() => setMensaje(null), 2200);
    }
}

const editProfile = () => {
    setMostrarPerfil(false);
    setMensaje({texto: 'Modo edición activado', tipo: 'success'});
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 2000);
    setTimeout(() => setMensaje(null), 2200);
}

return(
    <div className='bg-white p-6 rounded-lg shadow-md text-black'>
        {mostrarPerfil && perfil ? (
            // Vista del perfil guardado
            <div>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>
                
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="font-bold text-gray-600">Nombre:</span>
                        <p className="text-lg">{perfil.nombre}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="font-bold text-gray-600">Edad:</span>
                        <p className="text-lg">{perfil.edad} años</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="font-bold text-gray-600">Email:</span>
                        <p className="text-lg">{perfil.email}</p>
                    </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                    <button 
                        type="button"
                        className="flex-1 rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-200 hover:scale-105 p-2"
                        onClick={editProfile}
                    >
                        Editar Perfil
                    </button>
                    
                    <button 
                        type="button"
                        className="flex-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition-all duration-200 hover:scale-105 p-2"
                        onClick={showProfile}
                    >
                        Ocultar Perfil
                    </button>
                </div>
            </div>
        ) : (
            // Vista del formulario
            <form action="">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {perfil ? 'Editar Perfil' : 'Crear Perfil'}
                </h2>

                <div className='flex flex-col gap-4'>
                    <input 
                    type="text" 
                    placeholder='Introduzca su nombre' 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                    className='border border-gray-300 p-2 rounded'
                    />
                    <input 
                    type="text" 
                    pattern='[0-9]' 
                    value={edad} 
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder='Introduzca su edad'
                    className='border border-gray-300 p-2 rounded'
                    />
                    <input 
                    type="text"
                    placeholder='Introduzca su email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-300 p-2 rounded'
                    />
                </div>
                <div className='flex flex-col gap-4 mt-4'>
                    
                <button
                    type="button"  
                    className='rounded bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 p-2' 
                    onClick={saveProfile}
                >
                    {perfil ? 'Actualizar Perfil' : 'Guardar Perfil'}
                </button>

                {perfil && (
                    <button 
                        type="button"  
                        className='rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-200 hover:scale-105 p-2'
                        onClick={showProfile}
                    >
                        Mostrar Perfil
                    </button>
                )}
                </div>
            </form>
        )}
        
        {mensaje && (
            <div className={`mt-4 p-3 rounded shadow-lg transition-opacity duration-500 ${
                mostrarMensaje ? 'opacity-100' : 'opacity-0'
            } ${
                mensaje.tipo === 'success' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-800 text-white'
            }`}>
                <div className="flex items-center">
                    {mensaje.tipo === 'success' ? (
                        <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    )}
                    {mensaje.texto}
                </div>
            </div>
        )}
        
    </div>
)

};

export default Perfil;