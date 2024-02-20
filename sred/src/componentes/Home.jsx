// Home.jsx
import '../App.css';

function Home() {
  return (
    <>
   <div>
   <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex mt-2" href="#">
            <img
              src="/src/images/logo.jpg"
              alt=""
              width="50"
              height="30"
              className="d-inline-block align-text-top"
            />
            <p className="mx-3">SRED - Sistema Reserva Espacios Deportivos</p>
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Recintos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="ms-2 btn btn-success">
                  Iniciar sesión <i className="bi bi-box-arrow-in-right"></i>
                </button>
              </li>
              <li className="nav-item">
                <button className="ms-2 btn btn-light">
                  Regístrate <i className="bi bi-box-arrow-in-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
   </div>
    </>
  );
}

export default Home;
