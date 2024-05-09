import React, { useState, useEffect, useContext } from 'react'; // Agrega 'useContext' a los import de React
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
import EditaPerfil from './EditaPerfil';
import MenuRol, { MenuUsuario } from './menus/Menus';
import { useUserRole } from './Context'; 
import { useUserId } from './Context'; 
import AñadirRecinto from './AñadirRecinto';
import ErrorPage from './Error';

function Header() {
  const [userData, setUserData] = useState({});
  const [role, setRole] = useState({});
  const { userRole } = useUserRole(); 
  const { userId } = useUserId()
  useEffect(() => {
    const fetchData = async () => {
      const userResult = await MenuUsuario();
      setUserData(userResult);
    };

    const fetchRole = async () => {
      const roleResult = await MenuRol();
      setRole(roleResult);
    };

    fetchData();
    fetchRole();

    const interval = setInterval(() => {
      fetchData();
      fetchRole();
      
    }, 1000); // Lanzar la función cada segundo

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');
  };

  return (
    <>
      <Router>
        <header className='pb-5'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
            
              <Link className="navbar-brand d-flex mt-2 me-lg-auto" to="/"> {/* Alinea el logo y el título a la izquierda en pantallas grandes */}
                <img
                  src="/logo-blanco.png" // cambiar el color de este icono a blanco??
                  alt=""
                  width="30"
                  height="35"
                  className=""
                />
                <p className="mx-3 text-bg-dark d-none d-lg-block ">SRED - Sistema Reserva Espacios Deportivos</p>
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
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                {userData === undefined && (
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li>
                      <Link to="/signin" className='nav-link text-bg-dark me-3'>Login</Link>
                    </li>
                    <li>
                      <Link to="/signup" className='nav-link text-bg-dark '>Registrarse</Link>
                    </li>
                  </ul>
                )}
                {userRole == 'registrado' && (
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li>
                      <Link to="/reservas" className='nav-link text-bg-dark me-3'>Reservas</Link>
                    </li>
                  </ul>
                )}
                {userRole === 'propietario' && (
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li>
                      <Link to="/recintos" className='nav-link text-bg-dark me-3'>Recintos</Link>
                    </li>
                    <li>
                      <Link to="/misrecintos" className='nav-link text-bg-dark me-3'>Mis Recintos</Link>
                    </li>
                    <li>
                      <Link to="/nuevorecinto" className='nav-link text-bg-dark me-3'>Añadir Recinto</Link>
                    </li>
                  </ul>
                )}
                {userData !== undefined && (
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/perfil"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={userData.imagen || ''} alt={userData.imagen || ''} width="45" height="45" className='rounded-circle me-2 ' />
                      </a>
                      <ul className="dropdown-menu border-0 me-0">
                        <li className="dropdown-item p-2 ps-3">{userData.name || ''} <span className='small fst-italic fw-light'>({userRole})</span></li>
                        <li><hr className="dropdown-divider border-white" /></li>
                        {userRole === 'admin' && (
                          <>
                            <li><Link to="/adminusuarios" className="dropdown-item">Administrador de Usuarios</Link></li>
                            <li><Link to="/adminrecinto" className="dropdown-item">Administrador de Recintos</Link></li>
                          </>
                        )}
                        <li><Link to={`/editarperfil/${userId}`} className="dropdown-item">Mi perfil</Link></li>
                        <li><Link to="/signin" onClick={handleLogout} className="dropdown-item">Cerrar sesión</Link></li>
                      </ul>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </header>

        <Routes>
        {userData !== undefined && (
          <Route path="/" element={<Recintos />} />
        )}
        {userData == undefined && (
          <Route path="/" element={<Home />} />
        )}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adminrecinto" element={<AdminRecinto />} />
          <Route path="/adminusuarios" element={<AdminUsuario />} />
          <Route path="/misrecintos" element={<Recintos />} />
          <Route path="/recintos" element={<Recintos />} />
          <Route path="/detalle-recinto/:id" element={<DetalleRecinto/>} />
          <Route path="/reservarecinto/:id" element={<Reservar />} />
          <Route path="/reservas" element={<MisReservas />} />
          <Route path="/nuevorecinto" element={<AñadirRecinto />} />
          <Route path="/editarperfil/:id" element={<EditaPerfil />} />
          <Route path="/editarecinto/:id" element={<EditaRecinto />} />

           {/* Ruta para la página de error 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default Header;
