import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function DetalleRecinto() {
  const { id } = useParams();
  const [recinto, setRecinto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
      const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';

      const supabase = createClient(supabaseUrl, supabaseKey);

      try {
        const { data, error } = await supabase.from('recintos').select().eq('id', id).single();
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setRecinto(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main>
      <div className="container">
        <h1 className="mt-5">{recinto ? recinto.nombre : 'Cargando...'}</h1>
        <div className="d-flex justify-content-end">
          <Link to="/recintos" className="btn btn-outline-secondary mt-5">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: '1em' }}></i>
            Volver
          </Link>
        </div>
        {recinto && (
          <div className="row mt-2">
            <div className="col-12 col-md-4 mb-3">
              <img src={recinto.imagen} alt={recinto.nombre} className="img-fluid mt-3" />
            </div>
            <div className="col-12 col-md-8">
              <p>
                <strong>Nombre: </strong>
                <span id="nombre">{recinto.nombre}</span>
              </p>
              <p>
                <strong>Propietario: </strong>
                <span id="nombre">{recinto.propietario}</span>
              </p>
              <p>
                <strong>Capacidad: </strong>
                <span id="nombre">{recinto.capacidad} personas</span>
              </p>
              <p>
                <strong>Ubicación: </strong>
                <span id="nombre">{recinto.ubicacion}</span>
              </p>
              <p>
                <strong>Deporte recomendado: </strong>
                <span id="nombre">{recinto.deportes}</span>
              </p>
              <p>
                <strong>Descripción: </strong>
                <span id="nombre">{recinto.descripcion}</span>
              </p>
            </div>
          </div>
        )}
        <div className="container fixed-bottom d-flex justify-content-end" style={{ padding: '0px 0px 100px 0px' }}>

          <Link to="/reservarecinto" className="btn btn-success fs-5 shadow">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: '1em' }}></i>
            Reservar
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DetalleRecinto;
