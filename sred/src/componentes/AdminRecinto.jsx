import React, { useEffect, useState } from 'react';
import { BiSearch, BiX, BiPencil, BiTrash, BiCaretDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function AdminRecinto() {
  const [recintos, setRecintos] = useState([]);

  useEffect(() => {
    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
    const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';

    const supabase = createClient(supabaseUrl, supabaseKey);

    async function fetchRecintos() {
      const { data, error } = await supabase
        .from('recintos')
        .select('*');

      if (error) {
        console.error('Error al obtener datos de Supabase:', error);
      } else {
        setRecintos(data);
      }
    }

    fetchRecintos();
  }, []);

  const handleDeleteRecinto = async (recintoId) => {
    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
    const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from('recintos')
      .delete()
      .eq('id', recintoId);

    if (error) {
      console.error('Error al eliminar recinto:', error.message);
    } else {
      // Si la eliminación es exitosa, actualiza el estado para reflejar los cambios
      setRecintos(recintos.filter(recinto => recinto.id !== recintoId));
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Panel de administración</h1>
      {/* Tabs */}
      <div className="row mt-5">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item w-50">
              <Link to="/adminusuarios" className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item w-50">
              <Link to="/adminrecinto" className="nav-link active">
                Recintos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Tabla Recintos */}
      <div className="border border-top-0 p-3">
        {/* Buscador */}
        <div className="row">
          <div className="d-flex col-12 col-md-6 mb-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                <BiSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscador"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
              <span className="input-group-text" id="addon-wrapping">
                <BiX />
              </span>
            </div>
          </div>
        </div>

        {/* Tabla Recintos */}
        <div className="col-12" style={{ overflowX: 'auto' }}>
          <table className="table table-striped table-bordered table-hover align-middle mt-3">
            <thead className="table-dark">
              <tr>
                <th></th>
                <th>
                  Nombre <span><BiCaretDown /></span>
                </th>
                <th>
                  Descripción <span><BiCaretDown /></span>
                </th>
                <th>
                  Propietario <span><BiCaretDown /></span>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {recintos.map((recinto) => (
                <tr key={recinto.id}>
                  <td className="text-center">
                    <div >
                      <img width="80px" src={recinto.imagen} alt="" />
                    </div>
                  </td>
                  <td>{recinto.nombre}</td>
                  <td>{recinto.descripcion}</td>
                  <td>{recinto.propietario}</td>
                  <td className="text-center">
                    <Link to="/editarecinto">
                      <button className="btn btn-outline-primary"><BiPencil /></button>
                    </Link>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-outline-danger" onClick={() => handleDeleteRecinto(recinto.id)}><BiTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminRecinto;
