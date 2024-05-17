/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabase/Supabase';

function EditaPerfil() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [imagenFile, setImagenFile] = useState(null);

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
        }
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleImagenChange = (event) => {
    setImagenFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let imageUrl = usuario.imagen; // Conservar la imagen existente por defecto
  
      if (imagenFile) {
        const timestamp = new Date().getTime();
        const imageName = `user_${id}_${timestamp}`;
  
        const { data: fileData, error: fileError } = await supabase.storage.from('usuarios').upload(imageName, imagenFile, {
          cacheControl: '3600',
        });
  
        if (fileError) {
          console.error('Error uploading image:', fileError);
          return;
        }
  
        imageUrl = `${supabase.storageUrl}/object/public/usuarios/${imageName}`;
      }
  
      const { error } = await supabase
        .from('usuarios')
        .update({ imagen: imageUrl, name: nombre, apellidos, dni, email, rol })
        .eq('id', id);
  
      if (error) {
        console.error('Error updating usuario:', error);
      } else {
        window.history.back(); // Volver a la página anterior
      }
    } catch (error) {
      console.error('Error updating usuario:', error);
    }
  };
  

  if (!usuario) {
    return <div>No se encuentra el usuario</div>;
  }

  return (
    <div className="container mt-lg-5 mt-0 text-light ">
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
              <label htmlFor="imagen" className="form-label">Seleccionar imagen:</label>
              <input id="imagen" type="file" accept="image/*" className="form-control" onChange={handleImagenChange} />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-success bg-gradient me-2">Actualizar</button>
              <button type="button" onClick={() => window.history.back()} className="btn btn-secondary bg-gradient">Volver</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditaPerfil;
