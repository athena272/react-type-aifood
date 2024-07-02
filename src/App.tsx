import { Routes, Route } from 'react-router-dom';
import AdminHeader from 'componentes/AdminHeader';
import Home from 'paginas/Home';
import VitrineRestaurantes from 'paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from 'paginas/Administracao/Restaurantes';
import FormRestaurante from 'paginas/Administracao/Restaurantes/FormRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminHeader />}>
        <Route index element={<AdministracaoRestaurantes />} />
        <Route path="novo" element={<FormRestaurante />} />
        <Route path=":id" element={<FormRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
