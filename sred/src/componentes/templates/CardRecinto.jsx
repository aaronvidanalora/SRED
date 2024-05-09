import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import { supabase } from '../supabase/Supabase';

function Recinto({ id }) {
  // esta funcion recibe un id, si es null, pinta todos los recintos y si es un numero pinta los recintos de ese id
  const [recintos, setRecintos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('recintos').select();
        if (error) {
          console.error('Error fetching data:', error);
        } else {
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
              <div className="col-lg-4 col-12">
                <img
                  src={recinto.imagen}
                  alt={recinto.nombre}
                  className="rounded-2 "
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />
              </div>
              <div className="col-lg-8">
                <div className="card-body">
                  <h5 className="card-title">{recinto.nombre}</h5>
                  <p className="card-text">
                    Capacidad: {recinto.capacidad}<br />
                    Ubicación: {recinto.ubicacion}<br />
                    Descripción: {recinto.descripcion}
                  </p>
                  <Link to={`/detalle-recinto/${recinto.id}`} className="d-lg-block d-flex justify-content-end text-decoration-none ">
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
