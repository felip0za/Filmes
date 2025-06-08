import React, { useEffect, useState } from "react";
import api from "../../API/API";
import "./ListarFilmes.css";
import { useNavigate } from "react-router-dom";

const ListarFilmes = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/filmes/${id}`);
  };

  const handleAdd = () => {
    navigate(`/addFilmes`);
  };

  const handleEdit = (id) => {
    navigate(`/editfilme/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/filmes/listar");
        setMovies(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="loader"></div>
        <div className="loading-text">Carregando filmes...</div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      <h1>Lista de Filmes</h1>
      <button className="add-button" onClick={handleAdd}>
        ➕ Adicionar Filme
      </button>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div
              onClick={() => handleClick(movie.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={movie.imagemBase64} alt={movie.titulo} />
              <div className="movie-info">
                <h2>{movie.titulo}</h2>
                <h2>({movie.dataCriacao})</h2>
                <p>{movie.descricao}</p>
              </div>
            </div>
            <button
              className="edit-button"
              onClick={() => handleEdit(movie.id)}
            >
              ✏️ Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarFilmes;
