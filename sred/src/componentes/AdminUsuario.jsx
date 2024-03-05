import React, { useEffect, useState } from 'react';
import { BiSearch, BiX, BiPencil, BiTrash, BiCaretDown } from 'react-icons/bi';
import { createClient } from '@supabase/supabase-js';

function AdminUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const supabaseUrl = 'https://your-supabase-url.supabase.co';
  const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const { data, error } = await supabase.from('usuarios').select();
        if (error) {
          console.error('Error fetching usuarios:', error);
        } else {
          setUsuarios(data || []);
        }
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <h1 className="mt-5">Panel de administración</h1>
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item w-50">
                <a className="nav-link active" aria-current="page" href="#">
                  Usuarios
                </a>
              </li>
              <li className="nav-item w-50">
                <a className="nav-link" href="#">
                  Recintos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border border-top-0 p-3">
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
                  aria-label="Buscador"
                  aria-describedby="addon-wrapping"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="input-group-text" id="addon-wrapping">
                  <BiX />
                </span>
              </div>
            </div>
          </div>

          <div className="col-12" style={{ overflowX: 'auto' }}>
            <table className="table table-striped table-bordered table-hover align-middle mt-3">
              <thead className="table-dark">
                <tr>
                  <th></th>
                  <th>
                    Nombre <span><BiCaretDown /></span>
                  </th>
                  <th>
                    Email <span><BiCaretDown /></span>
                  </th>
                  <th>
                    Rol <span><BiCaretDown /></span>
                  </th>
                  <th>
                    Fecha <span><BiCaretDown /></span>
                  </th>
                  <th>
                    DNI <span><BiCaretDown /></span>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <div className="containerImagen">
                        <img width="50px" src={usuario.imagen} alt="" />
                      </div>
                    </td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.fecha}</td>
                    <td>{usuario.dni}</td>
                    <td>
                      <i className="btn btn-outline-primary">
                        <BiPencil />
                      </i>
                    </td>
                    <td>
                      <i className="btn btn-outline-danger">
                        <BiTrash />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsuario;
