import React, { useState, useEffect } from 'react';
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
import RegistroRecintos from './RegistraRecintos';
import EditaPerfil from './EditaPerfil';
import MenuRol, { MenuUsuario } from './menus/Menus';

function Header() {
  const [userData, setUserData] = useState({})
  const [role, setRole] = useState({})

  useEffect(() => {
    async function fetchData() {
      const userResult = await MenuUsuario();
      setUserData(userResult);
    }

    async function fetchRole() {
      const roleResult = await MenuRol();
      setRole(roleResult);
    }

    fetchData();
    fetchRole();

    return () => {};
  }, []);


  return (
    <>
    <Router>
      <header className='pb-5'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand d-flex mt-2" to="/">
              <img
                src="/logo.jpg"
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
            
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
              {role === '' && (
                <ul className="navbar-nav d-flex justify-content-end mb-2 mb-lg-0">
                  <li>
                    <Link to="/signin" className='nav-link text-bg-dark me-3'>Login</Link>
                  </li>
                  <li>
                    <Link to="/signup" className='nav-link text-bg-dark '>Registrarse</Link>
                  </li>
                </ul>
              )}
              {role === 'registrado' && (
                <ul className="navbar-nav d-flex justify-content-end mb-2 mb-lg-0">
                  <li>
                    <Link to="/reservas" className='nav-link text-bg-dark me-3'>Reservas</Link>
                  </li>
                </ul>
              )}
              {role === 'propietario' && (
                <ul className="navbar-nav d-flex justify-content-end mb-2 mb-lg-0">
                  <li>
                    <Link to="/recintos" className='nav-link text-bg-dark me-3'>Recintos</Link>
                  </li>
                </ul>
              )}
            </div>
            <div>
              <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                  className="nav-link dropdown-toggle"
                  href="/perfil"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >
                    <img src={userData.imagen || ''} alt="" width="45" height="45" className='rounded-circle me-2 ' /> {/* {userData.imagen} */}
                  </a>
                  <ul className="dropdown-menu me-0">
                      <li className="p-2 ps-3">{userData.name || ''}</li> {/* {userData.name} */}
                      <li><hr className="dropdown-divider"/></li>
                      { userData.rol === 'admin' && (
                          <>
                            <li><Link to="/adminusuarios" className="dropdown-item">Administrador de Usuarios</Link></li>
                            <li><Link to="/adminrecinto" className="dropdown-item">Administrador de Recintos</Link></li>
                          </>
                      )}
                      <li><Link to="/perfil" className="dropdown-item">Mi perfil</Link></li>
                      {/* <li><hr className="dropdown-divider" /></li> */}
                      <li><Link to="/logout" className="dropdown-item">Cerrar sesión</Link></li>
                  </ul>
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
        <Route path="/adminrecinto" element={<AdminRecinto />} />
        <Route path="/adminusuarios" element={<AdminUsuario />} />
        <Route path="/recintos" element={<Recintos />} />
        <Route path="/detalle-recinto/:id" element={<DetalleRecinto/>} />
        <Route path="/editarecinto" element={<EditaRecinto />} />
        <Route path="/registrarecinto" element={<RegistroRecintos />} />
        <Route path="/reservarecinto" element={<Reservar />} />
        <Route path="/reservas" element={<MisReservas />} />
        <Route path="/editarperfil/:id" element={<EditaPerfil />} />
        <Route path="/editarecinto/:id" element={<EditaRecinto />} />
      </Routes>
    </Router>
    </>
  );
}

export default Header;