import React from 'react';
import { useLocation } from 'react-router-dom';
import Recinto from './templates/CardRecinto';

function Recintos() {
  // mirar si viene de /recintos o /misrecintos
  const location = useLocation()

  const isMisRecintos = location.pathname === '/misrecintos';

  return (
    <>
    <div className="container">
      <h1 className="mt-1 mt-lg-5">{isMisRecintos ? 'Mis Recintos' : 'Todos los Recintos'}</h1>
      <div className="py-4">
        <div className="d-xl-block">
          <div className="row mb-5">
            <Recinto id={21}/>
            {/* enviar id */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Recintos;

