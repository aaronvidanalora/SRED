import React from 'react';
import Recinto from './templates/CardRecinto';

function Recintos() {
  return (
    <>
    <div className="container">
      <h1 className="my-5 text-light ">Todos los Recintos</h1>
      <div className="border rounded shadow p-4">
        <h2 className="mb-3 text-light">Recintos</h2>
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

