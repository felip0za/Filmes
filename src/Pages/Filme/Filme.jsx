import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Filme.css";
import api from "../../API/API";

const Filme = () => {
  const { id } = useParams(); // Pega o id da URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/filmes/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!movie) return <p>Filme não encontrado.</p>;

  return (
    <div className="movies-card">
      <img
        className="movies-poster"
        src={movie.imagemBase64}
        alt={movie.titulo}
      />
      <div className="movies-info">
        <h1>{movie.titulo}</h1>
        <p><strong>Ano:</strong> {movie.dataCriacao}</p>
        <p>Duraçao: {movie.tempo} Minutos</p>
        <p className="movies-description">Descrição: {movie.descricao}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          ⬅ Voltar
        </button>
      </div>
    </div>
  );
};

export default Filme;
