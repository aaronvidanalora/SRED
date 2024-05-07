import React from 'react';
import Recinto from './templates/CardRecinto';

function Recintos() {
  return (
    <>
    <div className="container">
      <h1 className="mt-1 mt-lg-5">Todos los Recintos</h1>
      <div className="py-4">
        <div className="d-xl-block">
          <div className="row mb-5">
            <Recinto/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Recintos;

