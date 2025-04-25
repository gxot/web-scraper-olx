export default function Tabela({ resultado }) {
    const titulos = Object.keys(resultado[0]);

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        {titulos.map((titulo) => (
                            <th key={titulo} className="px-4 py-3 text-left border-b border-gray-300">
                                {titulo}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resultado.map((row, i) => (
                        <tr
                            key={i}
                            className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100 transition"}
                        >
                            {titulos.map((titulo, j) => (
                                <td key={j} className="px-4 py-3 border-b border-gray-200 text-sm text-gray-800">
                                    {titulo.toLowerCase() === "link" ? (
                                        <a
                                            href={row[titulo]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                        >
                                            {row[titulo]}
                                        </a>
                                    ) : (
                                        row[titulo]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
