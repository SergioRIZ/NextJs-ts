const Header = () => {
    return (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 text-center mb-4">
            TaskFlow
        </h1>
            <p className="text-center text-white/70 text-lg font-light">
                Organiza tu día con estilo
            </p>
        </div>
    );
};

export default Header;