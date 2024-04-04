import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import { createClient } from '@supabase/supabase-js';

function Recinto() {
  const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
  const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [recintos, setRecintos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('recintos').select();
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          console.log('Data:', data);
          setRecintos(data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llama a fetchData solo cuando el componente se monta
    fetchData();
  }, []); // El array vacío asegura que se ejecute solo después del montaje inicial

  return (
    <div id="recintos">
      {recintos.map((recinto) => (
        <div key={recinto.id} className="col-12 mb-5">
          <div className="card">
            <div className="d-flex row g-0">
              <div className="col-4">
                <img
                  src={recinto.imagen}
                  alt={recinto.nombre}
                  className="recintos-img"
                  style={{ maxWidth: '100%', objectFit: 'cover', width: '380px', height: '200px' }}
                />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{recinto.nombre}</h5>
                  <p className="card-text">
                    Capacidad: {recinto.capacidad}<br />
                    Ubicación: {recinto.ubicacion}<br />
                    Descripción: {recinto.descripcion}
                  </p>
                  <Link to={`/detalle-recinto/${recinto.id}`} className="recinto-link">

                <button className="btn btn-sm btn-outline-primary">
                  Ver Más
                </button>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recinto;
