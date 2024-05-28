import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../componentes/supabase/Supabase';
import { useUserId, useUserRole } from './Context';

function EditaRecinto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recinto, setRecinto] = useState(null);
  const [reservas, setReservas] = useState([]);

  const { userRole } = useUserRole();
  const { userId } = useUserId();

  useEffect(() => {
    if (userRole == 'propietario' || userRole == 'admin') { // userId == recinto?.propietarioID
      fetchRecinto();
      fetchReservas();
    } else {
      navigate('*');
    }

    async function fetchRecinto() {
      try {
        const { data, error } = await supabase.from('recintos').select().eq('id', id).single();
        if (error) {
          console.error('Error fetching recinto:', error);
        } else {
          setRecinto(data);
        }
      } catch (error) {
        console.error('Error fetching recinto:', error);
      }
    }

    async function fetchReservas() {
      try {
        const { data: reservasData, error: reservasError } = await supabase
          .from('reservas')
          .select()
          .eq('recintoID', id);

        if (reservasError) {
          console.error('Error fetching reservas:', reservasError);
        } else {
          fetchNombresUsuarios(reservasData);
        }
      } catch (error) {
        console.error('Error fetching reservas:', error);
      }
    }

    async function fetchNombresUsuarios(reservasData) {
      try {
        const userIDs = reservasData.map(reserva => reserva.userID);
        const { data: usuariosData, error: usuariosError } = await supabase
          .from('usuarios')
          .select('name, id')
          .in('id', userIDs);

        if (usuariosError) {
          console.error('Error fetching usuarios:', usuariosError);
        } else {
          const reservasActualizadas = reservasData.map(reserva => {
            const usuario = usuariosData.find(usuario => usuario.id === reserva.userID);
            return { ...reserva, nombreUsuario: usuario ? usuario.name : 'Usuario no encontrado' };
          });

          setReservas(reservasActualizadas);
        }
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    }

  }, [id, userRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecinto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('recintos')
        .update({
          nombre: recinto.nombre,
          propietario: recinto.propietario,
          capacidad: recinto.capacidad,
          ubicacion: recinto.ubicacion,
          deportes: recinto.deportes,
          descripcion: recinto.descripcion,
          imagen: recinto.imagen,
        })
        .eq('id', id);

      if (error) {
        console.error('Error actualizando recinto:', error.message);
      } else {
        console.log('Recinto actualizado exitosamente:', data);
        window.history.back();
      }
    } catch (error) {
      console.error('Error actualizando recinto:', error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este recinto?')) {
      try {
        const { error } = await supabase
          .from('recintos')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error al eliminar recinto:', error.message);
        } else {
          window.history.back();
        }
      } catch (error) {
        console.error('Error al eliminar recinto:', error.message);
      }
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (!recinto) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pb-5 py-md-0 text-light">
      <h1 className="mt-lg-5 p">Edita Recinto</h1>
      <div className="d-flex justify-content-end">
        <div onClick={() => window.history.back()} className="btn btn-secondary bg-gradient">
          <FaArrowLeft style={{ fontSize: '1em', marginRight: '5px' }} />
          Volver
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-12 col-md-4 pt-2 mb-3">
          <img src={recinto.imagen} alt="" className="img-fluid d-block rounded-4" />
          <label className="form-label mt-3" htmlFor="imagen"><strong>URL imagen: </strong></label>
          <input
            type="text"
            name="imagen"
            value={recinto.imagen || ''}
            className="form-control mt-1"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-8">
          <form onSubmit={handleSubmit} className="form">
            <label className="form-label" htmlFor="nombre"><strong>Nombre: </strong></label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={recinto.nombre || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="propietario"><strong>Propietario: </strong></label>
            <input
              id="propietario"
              type="text"
              name="propietario"
              value={recinto.propietario || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="capacidad"><strong>Capacidad: </strong></label>
            <input
              id="capacidad"
              type="text"
              name="capacidad"
              value={recinto.capacidad || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="ubicacion"><strong>Ubicación: </strong></label>
            <input
              id="ubicacion"
              type="text"
              name="ubicacion"
              value={recinto.ubicacion || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="deportes"><strong>Deportes: </strong></label>
            <input
              id="deportes"
              type="text"
              name="deportes"
              value={recinto.deportes || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows="4"
              value={recinto.descripcion || ''}
              onChange={handleChange}
            />

            <input type="submit" className="shadow btn btn-success bg-gradient mt-3 me-2" value="Actualizar" />
            <button type="button" className="shadow btn btn-warning bg-gradient mt-3 me-2" onClick={handleCancel}>Cancelar</button>
            <button type="button" className="shadow btn btn-danger bg-gradient mt-3" onClick={handleDelete}>Eliminar</button>
          </form>
        </div>
      </div>

      {reservas.length > 0 && (
        <div className="mt-5">
          <h2>Reservas</h2>
          <table className="table table-bordered table-striped table-hover rounded">
            <thead className="thead-dark rounded">
              <tr>
                <th>Fecha</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.fechaReserva}</td>
                  <td>{reserva.entrada}</td>
                  <td>{reserva.salida}</td>
                  <td>{reserva.nombreUsuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EditaRecinto;
