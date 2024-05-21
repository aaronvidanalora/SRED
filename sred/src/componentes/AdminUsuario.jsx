import React, { useEffect, useState } from 'react';
import { BiSearch, BiX, BiPencil, BiTrash, BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useUserRole } from './Context';
import { supabase } from './supabase/Supabase';

function AdminUsuario() {
  const { userRole } = useUserRole()
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const rol = localStorage.getItem('rol')

  useEffect(() => {
    const fetchData = async () => {
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
    
    if(rol == 'admin'){
      fetchData();
    } else {
      navigate('*')
    }
  }, [supabase]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('usuarios').delete().eq('id', id);
      if (error) {
        console.error('Error deleting usuario:', error);
      } else {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      }
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  };

  const handleRoleChange = async (id, event) => {
    const newRole = event.target.value;

    if (selectedRoles[id] !== newRole) {
      try {
        const { error } = await supabase.from('usuarios').upsert([
          {
            id,
            rol: newRole,
            name: '', // Provide a non-null value for the "name" column
          },
        ]);
        if (error) {
          console.error('Error updating usuario role:', error);
        } else {
          setSelectedRoles((prevRoles) => ({
            ...prevRoles,
            [id]: newRole,
          }));
        }
      } catch (error) {
        console.error('Error updating usuario role:', error);
      }
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortedUsuarios = [...usuarios].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return -1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return -1;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return 1;
      }
      return 0;
    }
  });

  const filteredUsuarios = sortedUsuarios.filter(
    (usuario) =>
      usuario?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario?.rol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario?.dni?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <h1 className="mt-5">Panel de administración</h1>
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs bg-secondary bg-gradient rounded-top-2">
              <li className="nav-item w-50">
                <Link to="/adminusuarios" className="nav-link active rounded-0 rounded-top-2">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item w-50">
                <Link to="/adminrecinto" className="nav-link rounded-0 text-light rounded-top-2">
                  Recintos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border border-top-0 rounded-bottom-2 p-3">
          <div className="row">
            <div className="d-flex col-12 col-md-6 mb-3">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <BiSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar"
                  aria-label="Usuario"
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
                  <th>
                  </th>
                  <th onClick={() => requestSort('name')}>
                    Nombre <span>{getClassNamesFor('name') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                  </th>
                  <th onClick={() => requestSort('email')}>
                    Email <span>{getClassNamesFor('email') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                  </th>
                  <th onClick={() => requestSort('rol')}>
                    Rol <span>{getClassNamesFor('rol') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                  </th>
                  <th onClick={() => requestSort('id')}>
                    ID <span>{getClassNamesFor('id') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                  </th>
                  <th onClick={() => requestSort('dni')}>
                    DNI <span>{getClassNamesFor('dni') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <img
                        src={usuario.imagen}
                        alt={usuario.imagen}
                        className="avatar"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <select
                        value={selectedRoles[usuario.id] || usuario.rol}
                        onChange={(e) => handleRoleChange(usuario.id, e)}
                        className="form-select"
                      >
                        <option value="registrado">Registrado</option>
                        <option value="propietario">Propietario</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>{usuario.id}</td>
                    <td>{usuario.dni}</td>
                    <td>
                      <Link to={`/editarperfil/${usuario.id}`}>
                        <button className="btn btn-outline-primary"><BiPencil /></button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="shadow btn btn-outline-danger"
                        onClick={() => handleDelete(usuario.id)}
                      >
                        <BiTrash />
                      </button>
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
