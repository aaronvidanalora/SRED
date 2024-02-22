import React from 'react';

function Reservar() {
  return (
    <>
    <div className="col-12 pt-5 mt-5">
      <div className="row">
        <form action="" className="col-6 d-flex flex-column p-5">
          <label htmlFor="recinto" className="h2">Recinto</label>
          <select name="recinto" id="recinto" className="form-control">
            <option value="value1" selected>Ejemplo recinto 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </select>
          <div className="col-12 d-flex">
            <div className="col-3">
              <label htmlFor="entrada" className="h2 mt-5">Entrada</label>
              <select name="entrada" id="entrada" className="form-control">
                <option value="value1">Ejemplo 1</option>
                <option value="value2" selected>08:00</option>
                <option value="value3">Value 3</option>
              </select>
            </div>
            <div className="offset-6 col-3">
              <label htmlFor="salida" className="h2 mt-5">Salida</label>
              <select name="salida" id="salida" className="form-control">
                <option value="value1">Ejemplo 1</option>
                <option value="value2" selected>19:00</option>
                <option value="value3">Value 3</option>
              </select>
            </div>
          </div>
          <label htmlFor="fecha" className="h2 mt-5">Fecha</label>
          <input type="date" name="fecha" id="fecha" className="form-control" />
          <button type="button" className="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Reservar
          </button>
        </form>

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Reserva realizada con éxito</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Su reserva para el recinto XXXX el día XX, desde las XX hasta las XX está confirmada
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Reservar;

