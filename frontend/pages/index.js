import { use, useState } from "react";
import Tabela from "@/components/Tabela"
import TelaLoading from "@/components/TelaLoading";


export default function Home() {

  let [pesquisa, setPesquisa] = useState(null);
  let [estado, setEstado] = useState(null);
  let [resultado, setResultado] = useState("");
  let [loading, setLoading] = useState(false)
  let [tabela, setTabela] = useState(false)
 
  const estados = {
    "Todos os Estados": "Todos os Estados",
    "AC": "Acre",
    "AL": "Alagoas",
    "AP": "Amapá",
    "AM": "Amazonas",
    "BA": "Bahia",
    "CE": "Ceará",
    "DF": "Distrito Federal",
    "ES": "Espírito Santo",
    "GO": "Goiás",
    "MA": "Maranhão",
    "MT": "Mato Grosso",
    "MS": "Mato Grosso do Sul",
    "MG": "Minas Gerais",
    "PA": "Pará",
    "PB": "Paraíba",
    "PR": "Paraná",
    "PE": "Pernambuco",
    "PI": "Piauí",
    "RJ": "Rio de Janeiro",
    "RN": "Rio Grande do Norte",
    "RS": "Rio Grande do Sul",
    "RO": "Rondônia",
    "RR": "Roraima",
    "SC": "Santa Catarina",
    "SP": "São Paulo",
    "SE": "Sergipe",
    "TO": "Tocantins"
  };

  const enviarDados = async (e) => {
    e.preventDefault();

    setLoading(true)
    const response = await fetch("http://localhost:8000/pesquisa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pesquisa,
        estado
      })
    });

    const data = await response.json()
    
    setResultado(data.resultado)
    setLoading(false)
    setTabela(true)
  };

  return (
    
      <div>
        {!loading && !tabela &&(
        <div className="relative h-screen flex justify-center items-center">
        <div 
          className="absolute inset-0 bg-[url('/olx-104.png')] bg-cover bg-center opacity-20 z-0"
        ></div>
        
        <div className="relative z-10 p-10 flex flex-col bg-black rounded-lg max-w-md bg-opacity-80">
          <h1 className="text-transparent text-center text-4xl bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">
            Bem-vindo(a) ao Web Scrapper da OLX
          </h1>
          <form onSubmit={enviarDados} className="flex flex-col mt-5 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="pesquisa" className="text-sm text-gray-300">
                Digite o que deseja pesquisar:
              </label>
              <input 
                type="text" 
                id="pesquisa" 
                value={pesquisa} 
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-80 bg-gray-800 border border-gray-300 p-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="estado" className="text-sm text-gray-300">
                Escolha o estado:
              </label>
              <select 
                id="estado" 
                value={estado} 
                onChange={(e) => setEstado(e.target.value)}
                className="w-80 border text-gray-300 border-gray-300 p-3 bg-gray-800 focus:border-none focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                {Object.values(estados).map((estado) => (
                  <option key={estado}>{estado}</option>
                ))}
              </select>
            </div>
            <button 
              type="submit" 
              className="mt-4 p-4 font-bold text-white rounded-lg hover:scale-105 cursor-pointer bg-gradient-to-l from-blue-700 to-purple-700"
            >
              Enviar Pesquisa
            </button>
          </form>
        </div>
      </div>
        )}
        {!loading && tabela && (
        <Tabela resultado={resultado}></Tabela>
        )}
        {loading && !tabela &&(
          <TelaLoading></TelaLoading>
        )}
      </div>
  );
}
