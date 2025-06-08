import React, { useState } from "react";
import api from "../../API/API";
import "./AddFilme.css";
import { useNavigate } from "react-router-dom";

const AddFilme = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataCriacao, setDataCriacao] = useState("");
  const [imagemBase64, setImagemBase64] = useState("");
  const [tempo, setTempo] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // ou: navigate("/") para voltar à lista
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemBase64(reader.result); // converte para base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filme = {
        titulo,
        descricao,
        tempo,
        dataCriacao,
        imagemBase64,
      };

      await api.post("/filmes", filme);
      navigate("/");
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      alert("Erro ao adicionar filme. Verifique os dados.");
    }
  };

  return (
    <div className="add-filme-container"><button className="back-button" onClick={handleBack}>← Voltar</button>
      <h1>Adicionar Novo Filme</h1>
      <form onSubmit={handleSubmit} className="add-filme-form">
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <label>Duração:</label>
        <input
          type="integer"
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
          required
        />

        <label>Data de Criação:</label>
        <input
          type="integer"
          value={dataCriacao}
          onChange={(e) => setDataCriacao(e.target.value)}
          required
        />

        

        <label>Imagem:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        {imagemBase64 && (
          <img src={imagemBase64} alt="Preview" className="preview-img" />
        )}

        <button type="submit" className="submit-button">
          Salvar Filme
        </button>
      </form>
    </div>
  );
};

export default AddFilme;
