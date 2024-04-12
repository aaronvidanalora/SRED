import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'; // Reemplaza esto con tu clave Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

function EditaPerfil() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const { data, error } = await supabase.from('usuarios').select().eq('id', id).single();
        if (error) {
          console.error('Error fetching usuario:', error);
        } else {
          setUsuario(data);
          setNombre(data.name || '');
          setApellidos(data.apellidos || '');
          setDni(data.dni || '');
          setEmail(data.email || '');
          setRol(data.rol || '');
          setImagenUrl(data.imagen || '');
        }
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleImagenChange = (event) => {
    setImagenUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .update({ name: nombre, apellidos, dni, email, rol, imagen: imagenUrl })
        .eq('id', id);
      if (error) {
        console.error('Error actualizando usuario:', error);
      } else {
        // Redirigir al usuario a la página de administración después de la actualización
        window.location.href = '/adminusuarios';
      }
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  if (!usuario) {
    return <div>No se encuentra el usuario</div>;
  }

  return (
    <main>
      <div className="container mt-5">
        <h1>Edición de perfil</h1>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input required id="nombre" type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                <input id="apellidos" type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI:</label>
                <input id="dni" type="text" className="form-control" value={dni} onChange={(e) => setDni(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input required id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label">Contraseña:</label>
                <input required minLength="6" id="pass" type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-success me-2">Actualizar</button>
                <Link to="/adminusuarios" className="btn btn-outline-dark">Volver</Link>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="mb-3 d-flex flex-column align-items-center">
              <img src={imagenUrl} alt="" className="img-fluid mb-3" style={{ width: '350px', height: '350px', objectFit: 'cover' }} />
              <label htmlFor="imagen" className="form-label">URL imagen:</label>
              <input id="imagen" type="url" className="form-control" value={imagenUrl} onChange={handleImagenChange} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditaPerfil;
