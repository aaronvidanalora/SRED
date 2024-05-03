import React from 'react';
import Recinto from './templates/CardRecinto';

function Recintos() {
  return (
    <>
    <div className="container">

      <h1 className="mt-1 mt-lg-5">Todos los Recintos</h1>
      <div className="row mt-3 mt-lg-5">
        <div className="col-12">
          <ul className="nav nav-tabs">
            {/* Resto del código del nav-tabs */}
          </ul>
        </div>
      </div>
      <div className="border border-top-0 p-3">
        <div className="row">
          <div className="col-12 col-sm-4 mb-3">
            <h2 className="mb-3">Recintos</h2>
          </div>
          <div className="d-flex col-12 col-sm-8 mb-3">
            {/* Resto del contenido del filtro de búsqueda */}
          </div>
        </div>


        <div className="d-xl-block">
          <div className="row mb-5 ">
            <Recinto/>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
}

export default Recintos;

