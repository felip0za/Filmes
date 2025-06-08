import { Routes, Route } from 'react-router-dom';
import ListarFilmes from './Pages/ListarFilmes/ListarFilmes';
import Filme from './Pages/Filme/Filme';
import AddFilme from './Pages/AddFilmes/AddFilme';
import EditFilmes from './Pages/EditarFilmes/EditFilmes';
import Checkout from './Pages/Pagamentos/Checkout';

function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<ListarFilmes />} />
      <Route path='/filmes/:id' element={<Filme />} />
      <Route path='/addfilmes' element={<AddFilme />} />
      <Route path='/editfilme/:id' element={<EditFilmes />} />

      {/* Rota de teste para a tela de checkout */}
      <Route
        path='/checkout'
        element={
          <Checkout
            filme={{
              id: 1,
              titulo: 'Filme de Teste',
              preco: 14.99
            }}
          />
        }
      />
    </Routes>
  );
}

export default MainRoutes;