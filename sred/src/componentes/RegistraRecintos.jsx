import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const RegistroRecintos = () => {
  const [recintoData, setRecintoData] = useState({
    nombre: '',
    propietario: '',
    capacidad: '',
    ubicacion: '',
    deportes: '',
    descripcion: '',
    imagen: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecintoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data, error } = await supabase.from('recintos').insert([recintoData]);
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted:', data);
        // Optionally, you can redirect to another page or perform other actions upon successful submission
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registrar Recintos</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del Recinto
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={recintoData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="propietario" className="form-label">
            Propietario
          </label>
          <input
            type="text"
            className="form-control"
            id="propietario"
            name="propietario"
            value={recintoData.propietario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacidad" className="form-label">
            Capacidad
          </label>
          <input
            type="number"
            className="form-control"
            id="capacidad"
            name="capacidad"
            value={recintoData.capacidad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ubicacion" className="form-label">
            Ubicación
          </label>
          <input
            type="text"
            className="form-control"
            id="ubicacion"
            name="ubicacion"
            value={recintoData.ubicacion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deportes" className="form-label">
            Deportes
          </label>
          <input
            type="text"
            className="form-control"
            id="deportes"
            name="deportes"
            value={recintoData.deportes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={recintoData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">
            URL de la Imagen
          </label>
          <input
            type="text"
            className="form-control"
            id="imagen"
            name="imagen"
            value={recintoData.imagen}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar Recinto
        </button>
      </form>
    </div>
  );
};

export default RegistroRecintos;
