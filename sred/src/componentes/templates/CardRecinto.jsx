import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import { supabase } from '../supabase/Supabase';

function Recinto({ id }) {
  const [recintos, setRecintos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (id > 0) {
          response = await supabase
          .from('recintos')
          .select()
          .eq('propietarioID', id)
        } else {
          response = await supabase
          .from('recintos')
          .select();
        }

        if (response.error) {
          console.error('Error fetching data:', response.error);
        } else {
          setRecintos(response.data || []);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

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
                  {id > 0 ? (
                    <Link to={`/editarecinto/${recinto.id}`} className="d-lg-block d-flex justify-content-end text-decoration-none ">
                      <button className="btn btn-sm btn-outline-primary">
                        Ver Más
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/detalle-recinto/${recinto.id}`} className="d-lg-block d-flex justify-content-end text-decoration-none ">
                      <button className="btn btn-sm btn-outline-primary">
                        Ver Más
                      </button>
                    </Link>
                  )}
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
