// Header.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DetalleRecinto from './DetalleRecinto';
import AdminRecinto from './AdminRecinto';
import EditaRecinto from './EditaRecinto';

function Header() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Registrarse</Link>
          </li>
          <li>
            <Link to="/detallerecinto">Detalle Recinto</Link>
          </li>
          <li>
            <Link to="/adminrecinto">Admin Recinto</Link>
          </li>
          <li>
            <Link to="/editarecinto">Edita Recinto</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detallerecinto" element={<DetalleRecinto />} />
        <Route path="/adminrecinto" element={<AdminRecinto />} />
        <Route path="/editarecinto" element={<EditaRecinto />} />
      </Routes>
    </Router>
  );
}

export default Header;
