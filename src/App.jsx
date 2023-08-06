import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

import api from './services/api';



function App() {

  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});

  //adicionar um verificação para o cep
  async function handleSearch() {
    if (cep === "") {
      alert("Digite um CEP");
      return;
    }

    //01310930

    try {
      const response = await api.get(`/${cep}/json`);
      setAddress(response.data);
      setCep("");
    } catch {
      alert("Erro ao buscar CEP");
      setCep("");
    }
  }


  return (
    <>
      <div className="container">
        <h1 className="title">Buscador de CEP</h1>

        <div className="containerInput">
          <input type="text" placeholder="Digite o CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />

          <button className="buttonSearch" type="button" onClick={handleSearch}>
            <SearchIcon size={12} color="#000" />
          </button>

        </div>

        {Object.keys(address).length > 0 && (
          <main className="main">
            <h2>CEP: {address.cep}</h2>

            <span>Logradouro: {address.logradouro}</span>
            <span>Complemento: {address.complemento}</span>
            <span>Bairro: {address.bairro}</span>
            <span>Localidade: {address.localidade} - {address.uf}</span>
          </main>
        )}


      </div>



    </>
  )
}

export default App
