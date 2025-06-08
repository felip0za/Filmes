import { useState } from 'react';
import "./Checkout.css";
import axios from 'axios';

export default function Checkout({ filme }) {
  const [metodo, setMetodo] = useState('pix');
  const [campos, setCampos] = useState({ nome: '', numero: '', validade: '', cvv: '', cpf: '', email: '' });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  };

  const camposValidos = () => {
    if (metodo === 'pix') return campos.cpf && campos.email;
    if (metodo === 'boleto') return campos.nome && campos.cpf && campos.email;
    if (metodo === 'cartao') return campos.nome && campos.numero && campos.validade && campos.cvv;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setSucesso(false);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/pagamentos`, {
        id: filme.id,
        valor: filme.preco,
        metodo,
        datapagamento: new Date().toISOString(),
      });
      setSucesso(true);
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao processar o pagamento.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="titulo">Alugar: {filme.titulo}</h2>
      <p className="preco">Preço: R$ {filme.preco.toFixed(2)}</p>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="metodos">
          {['pix', 'cartao', 'boleto'].map((value) => (
            <label key={value} className={`metodo ${metodo === value ? 'ativo' : ''}`}>
              <input type="radio" name="metodo" value={value} checked={metodo === value} onChange={() => setMetodo(value)} />
              {value.toUpperCase()}
            </label>
          ))}
        </div>

        {metodo === 'pix' && (
          <>
            <input type="text" name="cpf" placeholder="CPF" value={campos.cpf} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={campos.email} onChange={handleChange} />
          </>
        )}

        {metodo === 'boleto' && (
          <>
            <input type="text" name="nome" placeholder="Nome completo" value={campos.nome} onChange={handleChange} />
            <input type="text" name="cpf" placeholder="CPF" value={campos.cpf} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={campos.email} onChange={handleChange} />
          </>
        )}

        {metodo === 'cartao' && (
          <>
            <input type="text" name="nome" placeholder="Nome no cartão" value={campos.nome} onChange={handleChange} />
            <input type="text" name="numero" placeholder="Número do cartão" value={campos.numero} onChange={handleChange} />
            <input type="text" name="validade" placeholder="Validade (MM/AA)" value={campos.validade} onChange={handleChange} />
            <input type="text" name="cvv" placeholder="CVV" value={campos.cvv} onChange={handleChange} />
          </>
        )}

        <button type="submit" disabled={carregando || !camposValidos()}>
          {carregando ? 'Processando...' : 'Confirmar Pagamento'}
        </button>

        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">Pagamento realizado com sucesso!</p>}
      </form>
    </div>
  );
}
