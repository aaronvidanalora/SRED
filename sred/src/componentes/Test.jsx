import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DetalleRecinto from './DetalleRecinto';
import AdminRecinto from './AdminRecinto';
import EditaRecinto from './EditaRecinto';
import Reservar from './Reservar';
import Recintos from './Recintos';
import AdminUsuario from './AdminUsuario';
import MisReservas from './MisReservas';

function Test() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/detallerecinto">Detalle Recinto</Link>
          </li>
          <li>
            <Link to="/adminrecinto">Admin Recinto</Link>
          </li>
          <li>
            <Link to="/editarecinto">Edita Recinto</Link>
          </li>
          <li>
            <Link to="/recintos">Recintos</Link>
          </li>
          <li>
            <Link to="/reservarecinto">Reservar Recinto</Link>
          </li>
          <li>
            <Link to="/adminusuarios">Admin Usuarios</Link>
          </li>
          <li>
            <Link to="/reservas">Mis Reservas</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/detallerecinto" element={<DetalleRecinto />} />
        <Route path="/adminrecinto" element={<AdminRecinto />} />
        <Route path="/editarecinto" element={<EditaRecinto />} />
        <Route path="/recintos" element={<Recintos />} />
        <Route path="/reservarecinto" element={<Reservar />} />
        <Route path="/adminusuarios" element={<AdminUsuario />} />
        <Route path="/reservas" element={<MisReservas />} />
      </Routes>
    </Router>
  );
}
export default Test;
