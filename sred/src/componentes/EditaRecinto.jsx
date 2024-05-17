import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useUserRole } from './Context';

function EditaRecinto() {
  const navigate = useNavigate()
  const { id } = useParams(); // Obtener el ID del recinto de los parámetros de la URL
  const [recinto, setRecinto] = useState(null);
  const [supabase, setSupabase] = useState(null); // Variable de estado para supabase

  const { userRole } = useUserRole()

  useEffect(() => {
    if(userRole == 'propietario' || userRole == 'admin'){
      fetchRecinto();  
    } else {
      navigate('*')
    }

    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
    const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
    const client = createClient(supabaseUrl, supabaseKey);
    setSupabase(client); // Asignar supabase a la variable de estado

    async function fetchRecinto() {
      try {
        const { data, error } = await client.from('recintos').select().eq('id', id).single();
        if (error) {
          console.error('Error fetching recinto:', error);
        } else {
          setRecinto(data);
        }
      } catch (error) {
        console.error('Error fetching recinto:', error);
      }
    }

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecinto((prevState) => ({
      ...prevState,
      [name]: value
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
        })
        .eq('id', id);
  
      if (error) {
        console.error('Error actualizando recinto:', error.message);
      } else {
        console.log('Recinto actualizado exitosamente:', data);
        // Redirige a /adminrecinto después de la actualización
        // navigate('/adminrecinto')
        // window.location.href = '/adminrecinto';
        window.history.back()
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
          // Redirige a /adminrecinto después de eliminar el recinto
          // window.location.href = '/adminrecinto';
          window.history.back()
        }
      } catch (error) {
        console.error('Error al eliminar recinto:', error.message);
      }
    }
  };
  
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
          <img src={recinto?.imagen} alt="" className="img-fluid d-block rounded-4" />
          <label className="form-label mt-3" htmlFor="img"><strong>URL imagen: </strong></label>
          <input
            type="text"
            name="imagen"
            value={recinto?.imagen || ''}
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
              value={recinto?.nombre || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="propietario"><strong>Propietario: </strong></label>
            <input
              id="propietario"
              type="text"
              name="propietario"
              value={recinto?.propietario || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="cap"><strong>Capacidad: </strong></label>
            <input
              id="cap"
              type="text"
              name="capacidad"
              value={recinto?.capacidad || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="ubi"><strong>Ubicación: </strong></label>
            <input
              id="ubi"
              type="text"
              name="ubicacion"
              value={recinto?.ubicacion || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="dep"><strong>Deportes: </strong></label>
            <input
              id="dep"
              type="text"
              name="deportes"
              value={recinto?.deportes || ''}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows="4"
              value={recinto?.descripcion || ''}
              onChange={handleChange}
            />

            <input type="submit" className="shadow btn btn-success bg-gradient mt-3 me-2" value="Actualizar" />
            <input type="submit" className="shadow btn btn-warning bg-gradient mt-3 me-2" value="Cancelar" />
            <button type="button" className="shadow btn btn-danger bg-gradient mt-3" onClick={handleDelete}>Eliminar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditaRecinto;
