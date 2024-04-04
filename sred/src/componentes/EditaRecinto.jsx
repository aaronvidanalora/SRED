import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function EditaRecinto() {
  const { id } = useParams(); // Obtener el ID del recinto de los parámetros de la URL
  const [recinto, setRecinto] = useState(null);

  useEffect(() => {
    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
    const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
    const supabase = createClient(supabaseUrl, supabaseKey);

    async function fetchRecinto() {
      try {
        const { data, error } = await supabase.from('recintos').select().eq('id', id).single();
        if (error) {
          console.error('Error fetching recinto:', error);
        } else {
          setRecinto(data);
        }
      } catch (error) {
        console.error('Error fetching recinto:', error);
      }
    }

    fetchRecinto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecinto((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos actualizados al servidor
  };

  return (
    <main>
      <div className="container">
        <h1 className="mt-5">Edita Recinto</h1>
        <div className="d-flex justify-content-end">
          <Link to="/adminrecinto" className="btn btn-outline-secondary mt-5">
            <FaArrowLeft style={{ fontSize: '1em' }} />
            Volver
          </Link>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-md-4 pt-2 mb-3">
            <img src={recinto?.imagen} alt="" className="img-fluid d-block " />
            <label className="form-label mt-3" htmlFor="img"><strong>URL imagen: </strong></label>
            <input
              type="text"
              name="imagen"
              value={recinto?.imagen || ''}
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
                value={recinto?.nombre || ''}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="propietario"><strong>Propietario: </strong></label>
              <input
                id="propietario"
                type="text"
                name="propietario"
                value={recinto?.propietario || ''}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="cap"><strong>Capacidad: </strong></label>
              <input
                id="cap"
                type="text"
                name="capacidad"
                value={recinto?.capacidad || ''}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="ubi"><strong>Ubicación: </strong></label>
              <input
                id="ubi"
                type="text"
                name="ubicacion"
                value={recinto?.ubicacion || ''}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="dep"><strong>Deportes: </strong></label>
              <input
                id="dep"
                type="text"
                name="deportes"
                value={recinto?.deportes || ''}
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-control"
                rows="4"
                value={recinto?.descripcion || ''}
                onChange={handleChange}
              />

              <input type="submit" className="btn btn-success mt-3 me-2" value="Actualizar" />
              <input type="submit" className="btn btn-warning mt-3 me-2" value="Cancelar" />
              <input type="submit" className="btn btn-danger mt-3" value="Eliminar" />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditaRecinto;
