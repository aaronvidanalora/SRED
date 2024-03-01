import React from 'react';
import { Link } from 'react-router-dom';

function Recinto() {
  return (
    <>
    <div className="col-6">
        <div className="card">
        <div className="row g-0">
            <div className="col-4" style={{ backgroundImage: 'url(./src/assets/logo.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
            <div className="col-8">
            <div className="card-body">
                <h5 className="card-title">Ejemplo</h5>
                <p className="card-text">Capacidad: Ejemplo<br />Ubicación: Ejemplo<br />Descripción: Ejemplo</p>
                <Link to="/detalleRecinto" className="btn btn-sm btn-outline-primary">
                  Ver Más
                </Link>
            </div>
            </div>
        </div>
        </div>
    </div>
    </>
  );
}

export default Recinto;

