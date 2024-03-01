import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DetalleRecinto from './DetalleRecinto';
import AdminRecinto from './AdminRecinto';
import EditaRecinto from './EditaRecinto';
import Reservar from './Reservar';
import Recintos from './Recintos';
import AdminUsuario from './AdminUsuario';
import MisReservas from './MisReservas';

function Header() {
  
  return (
    <>
    <Router>
      <header className='pb-5'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand d-flex mt-2" to="/">
              <img
                src="./src/assets/logo.jpg"
                alt=""
                width="50"
                height="30"
                className="d-inline-block align-text-top"
              />
              <p className="mx-3 text-bg-dark ">SRED - Sistema Reserva Espacios Deportivos</p>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Link to="/reservarecinto" className='nav-link text-bg-dark '>reservarecinto</Link>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav d-flex justify-content-end mx-auto mb-2 mb-lg-0">
                <li>
                  <Link to="/signin" className='nav-link text-bg-dark me-3'>Login</Link>
                </li>
                <li>
                  <Link to="/signup" className='nav-link text-bg-dark '>Registrarse</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recintos" element={<Recintos />} />
        <Route path="/detallerecinto" element={<DetalleRecinto />} />
        <Route path="/editarecinto" element={<EditaRecinto />} />
        <Route path="/adminrecinto" element={<AdminRecinto />} />
        <Route path="/adminusuarios" element={<AdminUsuario />} />
        <Route path="/reservarecinto" element={<Reservar />} />
        <Route path="/reservas" element={<MisReservas />} />
      </Routes>
    </Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
      </Router>  */}
    </>
  );
}

export default Header;