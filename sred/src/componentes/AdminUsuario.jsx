import React, { useEffect, useState } from 'react';
import { BiSearch, BiX, BiPencil, BiTrash, BiCaretDown } from 'react-icons/bi';
import { createClient } from '@supabase/supabase-js';
import {  Link } from 'react-router-dom';

const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
  const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
const supabase = createClient(supabaseUrl, supabaseKey);

function AdminUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState({}); // State to track selected roles

  

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

    fetchData();
  }, [supabase]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('usuarios').delete().eq('id', id);
      if (error) {
        console.error('Error deleting usuario:', error);
      } else {
        // Remove the deleted user from the state
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      }
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  };

  const handleRoleChange = async (id, event) => {
    const newRole = event.target.value;
  
    console.log(`Handling role change for user ${id}. Selected role: ${selectedRoles[id]}. New role: ${newRole}`);
  
    // Check if the role has actually changed
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
          // Update the role in the state
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
  
  
  
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario?.rol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario?.dni?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid">
        <h1 className="mt-5">Panel de administración</h1>
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item w-50">
              <Link to="/adminusuarios" className="nav-link">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item w-50">
                <Link to="/adminrecintos" className="nav-link active">
                  Recintos
                </Link>
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
                  aria-label="Username"
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
                    Nombre <span><BiCaretDown /></span>
                  </th>
                  <th>
                    Email <span><BiCaretDown /></span>
                  </th>
                  <th>
                    Rol <span><BiCaretDown /></span>
                  </th>
                  <th>
                    ID <span><BiCaretDown /></span>
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
                    <td><i className="btn btn-outline-primary"><BiPencil /></i></td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
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
