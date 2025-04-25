export default function TelaLoading () {
    return(
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <h1 className="font-bold text-black text-2xl mb-4">Carregando Dados</h1>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}