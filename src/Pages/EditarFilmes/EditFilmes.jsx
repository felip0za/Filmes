import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../API/API";
import "./EditFilmes.css";

const EditFilmes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({
    titulo: "",
    descricao: "",
    dataCriacao: "",
    tempo: "",
    imagemBase64: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilme = async () => {
      try {
        const response = await api.get(`/filmes/${id}`);
        setFilme(response.data);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilme();
  }, [id]);

  const handleChange = (e) => {
    setFilme({ ...filme, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilme((prev) => ({
        ...prev,
        imagemBase64: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/filmes/${id}`, filme);
      alert("Filme atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar o filme:", error);
      alert("Erro ao atualizar o filme.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este filme?")) {
      try {
        await api.delete(`/filmes/${id}`);
        alert("Filme excluído com sucesso!");
        navigate("/");
      } catch (error) {
        console.error("Erro ao excluir o filme:", error);
        alert("Erro ao excluir o filme.");
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="editar-filme-container">
      <button className="back-button" onClick={handleBack}>← Voltar</button>
      <h2>Editar Filme</h2>
      <form className="editar-filme-form" onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={filme.titulo}
          onChange={handleChange}
          required
        />

        <label>Descrição</label>
        <textarea
          name="descricao"
          value={filme.descricao}
          onChange={handleChange}
          required
        />

        <label>Ano</label>
        <input
          type="text"
          name="dataCriacao"
          value={filme.dataCriacao}
          onChange={handleChange}
          required
        />

        <label>Duração</label>
        <input
          type="number"
          name="tempo"
          value={filme.tempo}
          onChange={handleChange}
          required
        />

        <label>Imagem</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {filme.imagemBase64 && (
          <img
            src={filme.imagemBase64}
            alt="Preview"
            className="preview-image"
          />
        )}

         <div className="form-buttons">
    <button type="submit" className="save-button">Salvar Alterações</button>
    <button
      type="button"
      onClick={handleDelete}
      className="delete-button"
    >
      🗑️ Excluir Filme
    </button>
        </div>
      </form>
    </div>
  );
};

export default EditFilmes;
