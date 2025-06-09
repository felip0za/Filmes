import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetalhesPagamentos.css";

export default function DetalhesPagamento() {
  const { id } = useParams();
  const [pagamento, setPagamento] = useState(null);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || "https://servicedepagamento.onrender.com"}/pagamentos/${id}`)
      .then((res) => setPagamento(res.data))
      .catch((err) => setErro("Erro ao carregar detalhes do pagamento."));
  }, [id]);

  if (erro) return <p className="erro">{erro}</p>;
  if (!pagamento) return <p className="carregando">Carregando...</p>;

  return (
    <div className="detalhes-container">
      <button className="voltar" onClick={() => navigate(-1)}>← Voltar</button>
      <h1>Detalhes do Pagamento</h1>
      <p><strong>ID:</strong> {pagamento.id}</p>
      <p><strong>Valor:</strong> R$ {(pagamento.valor / 100).toFixed(2)}</p>
      <p><strong>Método:</strong> {pagamento.metodo}</p>
      <p><strong>Data:</strong> {new Date(pagamento.dataPagamento).toLocaleString()}</p>
      <p><strong>Nome:</strong> {pagamento.nome || "—"}</p>
      <p><strong>Email:</strong> {pagamento.email || "—"}</p>
    </div>
  );
}
