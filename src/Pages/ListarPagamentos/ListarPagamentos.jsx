import { useState } from 'react';
import axios from 'axios';
import './ListarPagamentos.css';
import { useNavigate } from "react-router-dom";

export default function ListarPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const listarPagamentos = async () => {
    setErro(null);
    setPagamentos([]);
    try {
      const res = await axios.get('http://localhost:8080/pagamentos/listar');
      setPagamentos(res.data);
    } catch (err) {
      setErro('Erro ao listar os pagamentos.');
    }
  };

  return (
    <div className="container-pagamentos">
      <h1 className="titulo-pagamentos">Lista de Pagamentos</h1>

      <div className="botao-container">
        <button onClick={listarPagamentos} className="botao-listar">
          Listar Pagamentos
        </button>
      </div>

      {erro && <p className="erro-texto">{erro}</p>}

      {pagamentos.length > 0 ? (
        <ul className="lista-pagamentos">
          {pagamentos.map((pagamento) => (
            <li key={pagamento.id} className="item-pagamento">
              <p><strong>ID:</strong> {pagamento.id}</p>
              <p><strong>Valor:</strong> R$ {(pagamento.valor / 100).toFixed(2)}</p>
              <p><strong>Método:</strong> {pagamento.metodo}</p>
              <p><strong>Data:</strong> {new Date(pagamento.dataPagamento).toLocaleString()}</p>
              <button
                onClick={() => navigate(`/pagamentos/${pagamento.id}`)}
                className="botao-detalhes"
              >
                Ver Detalhes
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="texto-vazio">Nenhum pagamento listado ainda.</p>
      )}
    </div>
  );
}
