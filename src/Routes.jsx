import { Routes, Route } from 'react-router-dom';
import ListarFilmes from './Pages/ListarFilmes/ListarFilmes';
import Filme from './Pages/Filme/Filme';
import AddFilme from './Pages/AddFilmes/AddFilme';
import EditFilmes from './Pages/EditarFilmes/EditFilmes';
import ListarPagamentos from './Pages/ListarPagamentos/ListarPagamentos';
import Checkout from './Pages/Pagamentos/Checkout';
import DetalhesPagamento from './Pages/DetalhesPagamento/DetalhesPagamentos';

function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<ListarFilmes />} />
      <Route path='/filmes/:id' element={<Filme />} />
      <Route path='/addfilmes' element={<AddFilme />} />
      <Route path='/editfilme/:id' element={<EditFilmes />} />
      <Route path="/pagamentos/consultar" element={<ListarPagamentos />} />
      <Route path="/pagamentos/:id" element={<DetalhesPagamento />} />
    </Routes>
  );
}

export default MainRoutes;