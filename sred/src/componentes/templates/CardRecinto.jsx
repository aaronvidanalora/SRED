import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import { supabase } from '../supabase/Supabase';

function Recinto() {
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

    fetchData();
  }, []);

  return (
    <div id="recintos">
      {recintos.map((recinto) => (
        <div key={recinto.id} className="col-12 mb-5">
          <div className="card rounded-3 shadow-sm">
            <div className="d-flex row g-0">
              <div className="col-lg-4 col-12">
                <img
                  src={recinto.imagen}
                  alt={recinto.nombre}
                  className="rounded-start-2 " 
                  style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover', width: '380px', height: '200px' }}
                  />
                {/* className="recintos-img" */}
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
                    <button className="shadow btn btn-sm btn-outline-primary ">
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
