import React, { useState } from 'react';

function Reservar() {
  const [formData, setFormData] = useState({
    selectedRecinto: "Recinto 1",
    selectedEntrada: "08:00",
    selectedSalida: "10:00",
    selectedFecha: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
    <div className="col-12 pt-5 mt-5">
      <div className="row">
        <form action="" className="col-6 d-flex flex-column p-5">
          <label htmlFor="recinto" className="h2">Recinto</label>
          <select name="selectedRecinto" id="recinto" className="form-control" onChange={handleChange} value={formData.selectedRecinto}>
            <option value="Recinto 1">Recinto 1</option>
            <option value="Recinto 2">Recinto 2</option>
            <option value="Recinto 3">Recinto 3</option>
          </select>
          <div className="col-12 d-flex">
            <div className="col-3">
              <label htmlFor="entrada" className="h2 mt-5">Entrada</label>
              <select name="selectedEntrada" id="entrada" className="form-control" onChange={handleChange} value={formData.selectedEntrada}>
                <option value="08:00">08:00</option>
                <option value="10:30">10:30</option>
                <option value="12:30">12:30</option>
              </select>
            </div>
            <div className="offset-6 col-3">
              <label htmlFor="salida" className="h2 mt-5">Salida</label>
              <select name="selectedSalida" id="salida" className="form-control" onChange={handleChange} value={formData.selectedSalida}>
                <option value="10:00">10:00</option>
                <option value="12:30">12:30</option>
                <option value="14:30">14:30</option>
              </select>
            </div>
          </div>
          <label htmlFor="fecha" className="h2 mt-5">Fecha</label>
          <input type="date" name="selectedFecha" id="fecha" className="form-control" onChange={handleChange} value={formData.selectedFecha} />
          <button type="button" className="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Reservar
          </button>
        </form>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Reserva realizada con éxito</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Su reserva para el recinto {formData.selectedRecinto} el día {formData.selectedFecha}, de {formData.selectedEntrada} hasta {formData.selectedSalida} está confirmada
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

