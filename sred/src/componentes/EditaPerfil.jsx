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
      const timestamp = new Date().getTime(); // Obtener el timestamp actual en milisegundos
      const imageName = `user_${id}_${timestamp}`; // Generar un nombre de archivo único

      const { data: fileData, error: fileError } = await supabase.storage.from('usuarios').upload(imageName, imagenFile, {
        cacheControl: '3600', // opcional: establece la duración de la caché en segundos
      });

      if (fileError) {
        console.error('Error uploading image:', fileError);
        return;
      }

      // Obtener la URL de la imagen cargada
      const imageUrl = `${supabase.storageUrl}/object/public/usuarios/${imageName}`; // Corregir la ruta de la imagen

      // Actualizar la fila de usuario con la URL de la imagen cargada
      const { error } = await supabase
        .from('usuarios')
        .update({ imagen: imageUrl, name: nombre, apellidos, dni, email, rol })
        .eq('id', id);

      if (error) {
        console.error('Error updating usuario:', error);
      } else {
        window.location.reload(); // Recargar la página después de la actualización
      }
    } catch (error) {
      console.error('Error updating usuario:', error);
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
                <label htmlFor="imagen" className="form-label">Seleccionar imagen:</label>
                <input id="imagen" type="file" accept="image/*" className="form-control" onChange={handleImagenChange} />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-success bg-gradient me-2">Actualizar</button>
                <div onClick={() => history.back()} className="btn btn-outline-dark">Volver</div> 
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditaPerfil;
