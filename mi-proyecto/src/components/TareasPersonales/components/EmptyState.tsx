interface EmptyStateProps {
    filtrar: string;
}

const EmptyState = ({ filtrar }: EmptyStateProps) => {
    return (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">🌟</div>
            <p className="text-white/70 text-xl font-light">
                {filtrar === 'todas' ? 'Tu lienzo está en blanco. ¡Crea tu primera obra!' : 
                 filtrar === 'pendientes' ? '¡Increíble! Has conquistado todas tus tareas.' :
                 'Aún no has completado ninguna tarea. ¡El primer paso te espera!'}
            </p>
        </div>
    );
};

export default EmptyState;