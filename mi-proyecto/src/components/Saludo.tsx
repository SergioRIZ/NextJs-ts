interface SaludoProps {
    nombre: string;
    edad?: number;
    dni?: string;
}

const Saludo: React.FC<SaludoProps> = ({ nombre, edad}) => {
    return (
        <div className="p-4 bg-white border rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-800">
                ¡Hola, {nombre}!
            </h2>
            {edad && (
                <p className="text-blue-600 mt-2">
                    Tienes {edad} años.
                </p>
            )}
        </div>
    )
}

export default Saludo;