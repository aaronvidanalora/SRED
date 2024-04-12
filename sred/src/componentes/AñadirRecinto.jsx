import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function AñadirRecinto() {
  const [recinto, setRecinto] = useState({
    nombre: '',
    propietario: '',
    capacidad: '',
    ubicacion: '',
    deportes: '',
    descripcion: '',
    imagen: ''
  });
  const [supabase] = useState(createClient('https://sdyghacdmxuoytrtuntm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecinto((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('recintos').insert([recinto]);
      if (error) {
        console.error('Error al añadir recinto:', error.message);
      } else {
        console.log('Recinto añadido exitosamente:', data);
        // Redirige a /adminrecinto después de la inserción
        window.location.href = '/recintos';
      }
    } catch (error) {
      console.error('Error al añadir recinto:', error.message);
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="mt-5">Añadir Recinto</h1>
        <div className="d-flex justify-content-end">
          <Link to="/adminrecinto" className="btn btn-outline-secondary mt-5">
            <FaArrowLeft style={{ fontSize: '1em' }} />
            Volver
          </Link>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-md-4 pt-2 mb-3">
            <img src={recinto.imagen} alt="" className="img-fluid" />
            <label className="form-label mt-3" htmlFor="img"><strong>URL imagen: </strong></label>
            <input
              type="text"
              name="imagen"
              value={recinto.imagen}
              className="form-control mt-1"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-8">
            <form onSubmit={handleSubmit} className="form">
              <label className="form-label" htmlFor="nombre"><strong>Nombre: </strong></label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={recinto.nombre}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="propietario"><strong>Propietario: </strong></label>
              <input
                id="propietario"
                type="text"
                name="propietario"
                value={recinto.propietario}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="cap"><strong>Capacidad: </strong></label>
              <input
                id="cap"
                type="text"
                name="capacidad"
                value={recinto.capacidad}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="ubi"><strong>Ubicación: </strong></label>
              <input
                id="ubi"
                type="text"
                name="ubicacion"
                value={recinto.ubicacion}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="dep"><strong>Deportes: </strong></label>
              <input
                id="dep"
                type="text"
                name="deportes"
                value={recinto.deportes}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-control"
                rows="4"
                value={recinto.descripcion}
                onChange={handleChange}
              />

              <input type="submit" className="btn btn-success mt-3 me-2" value="Añadir" />
              <Link to="/adminrecinto" className="btn btn-warning mt-3 me-2">Cancelar</Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AñadirRecinto;
