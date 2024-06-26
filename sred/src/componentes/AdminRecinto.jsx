import React, { useEffect, useState } from 'react';
import { BiSearch, BiX, BiPencil, BiTrash, BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useUserRole } from './Context';
import { supabase } from './supabase/Supabase';

function AdminRecinto() {
  const navigate = useNavigate()
  
  const { userRole } = useUserRole()
  const [recintos, setRecintos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
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

    if(userRole == 'admin'){
      fetchRecintos();
    } else {
      navigate('*')
    }
  }, []);

  const handleDeleteRecinto = async (recintoId) => {
    try {
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
    } catch (error) {
      console.error('Error al eliminar recinto:', error.message);
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

  const sortedRecintos = [...recintos].sort((a, b) => {
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

  const filteredRecintos = sortedRecintos.filter(
    (recinto) =>
      recinto?.imagen?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recinto?.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recinto?.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recinto?.propietario?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container ">
        <h1 className="mt-5">Panel de administración</h1>
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs bg-secondary bg-gradient rounded-top-2">
              <li className="nav-item w-50 ">
                <Link to="/adminusuarios" className="nav-link rounded-0 text-light rounded-top-2">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item w-50">
                <Link to="/adminrecinto" className="nav-link active rounded-0 rounded-top-2">
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
                <th></th>
                <th onClick={() => requestSort('nombre')}>
                  Nombre <span>{getClassNamesFor('nombre') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                </th>
                <th onClick={() => requestSort('propietario')}>
                Propietario <span>{getClassNamesFor('propietario') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                </th>
                <th onClick={() => requestSort('capacidad')}>
                Capacidad <span>{getClassNamesFor('capacidad') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                </th>
                <th onClick={() => requestSort('ubicacion')}>
                Ubicacion <span>{getClassNamesFor('ubicacion') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                </th>
                <th onClick={() => requestSort('deportes')}>
                  Deportes <span>{getClassNamesFor('deportes') === 'ascending' ? <BiCaretUp /> : <BiCaretDown />}</span>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredRecintos.map((recinto) => (
                <tr key={recinto.id}>
                  <td className="text-center">
                    <div>
                      <Link to={`/detalle-recinto/${recinto.id}`}>
                        <img width="80px" src={recinto.imagen} alt={recinto.imagen} />
                      </Link>
                    </div>
                  </td>
                  <td>{recinto.nombre}</td>
                  <td>{recinto.propietario}</td>
                  <td>{recinto.capacidad}</td>
                  <td>{recinto.ubicacion}</td>
                  <td>{recinto.deportes}</td>
                  <td className="text-center">
                    <Link to={`/editarecinto/${recinto.id}`}>
                      <button className="shadow btn btn-outline-primary"><BiPencil /></button>
                    </Link>
                  </td>
                  <td className="text-center">
                    <button className="shadow btn btn-outline-danger" onClick={() => handleDeleteRecinto(recinto.id)}><BiTrash /></button>
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
