import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function AñadirRecinto() {
  const navigate = useNavigate();
  const [recinto, setRecinto] = useState({
    nombre: '',
    capacidad: '',
    ubicacion: '',
    deportes: '',
    descripcion: '', // Cambiado de resumen a descripcion
    info: '', // Cambiado de descripcionReservas a info
    imagen: '',
    imagen2: '',
    imagen3: '',
    imagen4: ''
  });
  const supabase = createClient('https://sdyghacdmxuoytrtuntm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecinto((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setRecinto((prevState) => ({
      ...prevState,
      imagen: file
    }));
  };

  const handleImagen2Change = (e) => {
    const file = e.target.files[0];
    setRecinto((prevState) => ({
      ...prevState,
      imagen2: file
    }));
  };

  const handleImagen3Change = (e) => {
    const file = e.target.files[0];
    setRecinto((prevState) => ({
      ...prevState,
      imagen3: file
    }));
  };

  const handleImagen4Change = (e) => {
    const file = e.target.files[0];
    setRecinto((prevState) => ({
      ...prevState,
      imagen4: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = ''; // Variable para almacenar la URL de la imagen principal
      if (recinto.imagen) { // Verificar si recinto.imagen tiene valor asignado
        const timestamp = new Date().getTime(); // Obtener el timestamp actual en milisegundos
        const imageName = `${timestamp}_${recinto.imagen.name}`; // Concatenar timestamp con nombre de imagen
        const { data, error } = await supabase.storage.from('recintos').upload(imageName, recinto.imagen, {
          cacheControl: '3600',
        });
        if (error) {
          console.error('Error al subir imagen:', error.message);
          return;
        }
        imageUrl = `${supabase.storageUrl}/object/public/recintos/${imageName}`;
      }

      // Subir imágenes adicionales
      const imageUrls = [];
      const uploadImages = async (imagen, columnName) => {
        if (imagen) {
          const timestamp = new Date().getTime();
          const imageName = `${timestamp}_${imagen.name}`;
          const { data, error } = await supabase.storage.from('recintos').upload(imageName, imagen, {
            cacheControl: '3600',
          });
          if (error) {
            console.error(`Error al subir ${columnName}:`, error.message);
            return null;
          }
          return `${supabase.storageUrl}/object/public/recintos/${imageName}`;
        }
        return null;
      };

      imageUrls.push(await uploadImages(recinto.imagen2, 'imagen2'));
      imageUrls.push(await uploadImages(recinto.imagen3, 'imagen3'));
      imageUrls.push(await uploadImages(recinto.imagen4, 'imagen4'));

      const { data: recintoData, error: recintoError } = await supabase.from('recintos').insert([{ ...recinto, imagen: imageUrl, imagen2: imageUrls[0], imagen3: imageUrls[1], imagen4: imageUrls[2] }]);
      if (recintoError) {
        console.error('Error al añadir recinto:', recintoError.message);
      } else {
        console.log('Recinto añadido exitosamente:', recintoData);
        window.history.back(); // Volver atrás usando el historial del navegador
      }
    } catch (error) {
      console.error('Error al añadir recinto:', error.message);
    }
  };

  return (
    <div className="container pb-5">
      <h1 className="mt-0 mt-lg-5 ">Añadir Recinto</h1>
      <div className="d-flex justify-content-end">
        <div onClick={() => window.history.back()} className="btn btn-secondary bg-gradient mt-2 text-light "> {/* Utilizar window.history.back() para volver atrás */}

          <FaArrowLeft style={{ fontSize: '1em', marginRight: '5px' }} />
          Volver
        </div>
      </div>

      <div className="row mt-0 mt-lg-2">
        <div className="col-12 col-md-4 pt-2 mb-3">
          <img src={recinto.imagen} alt={recinto.imagen} className="img-fluid rounded-3" />
          <label className="form-label mt-3 d-block text-light" htmlFor="img"><strong>Seleccionar imagen: </strong></label>
          <input
            type="file"
            name="imagen"
            className="form-control mt-1"
            onChange={handleImagenChange}
          />
          <label className="form-label mt-3 d-block text-light" htmlFor="img2"><strong>Añadir imágenes para la descripción: </strong></label>
          <input
            type="file"
            name="imagen2"
            className="form-control mt-1"
            onChange={handleImagen2Change}
          />
          <input
            type="file"
            name="imagen3"
            className="form-control mt-1"
            onChange={handleImagen3Change}
          />
          <input
            type="file"
            name="imagen4"
            className="form-control mt-1"
            onChange={handleImagen4Change}
          />
        </div>
        <div className="col-12 col-md-8">
          <form onSubmit={handleSubmit} className="form">
            <label className="form-label text-light" htmlFor="nombre"><strong>Nombre: </strong></label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={recinto.nombre}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label text-light mt-2" htmlFor="cap"><strong>Capacidad: </strong></label>
            <input
              id="cap"
              type="text"
              name="capacidad"
              value={recinto.capacidad}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label text-light mt-2" htmlFor="ubi"><strong>Ubicación: </strong></label>
            <input
              id="ubi"
              type="text"
              name="ubicacion"
              value={recinto.ubicacion}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label text-light mt-2" htmlFor="dep"><strong>Deportes: </strong></label>
            <input
              id="dep"
              type="text"
              name="deportes"
              value={recinto.deportes}
              className="form-control"
              onChange={handleChange}
            />
            <label className="form-label text-light mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows="4"
              value={recinto.descripcion}
              onChange={handleChange}
            />
            <label className="form-label text-light mt-2" htmlFor="info"><strong>Descripción Reservas: </strong></label>
            <textarea
              id="info"
              name="info"
              className="form-control"
              rows="4"
              value={recinto.info}
              onChange={handleChange}
            />


            <input type="submit" className="btn btn-success bg-gradient mt-3 me-2" value="Añadir" />
            <div onClick={() => window.history.back()} className="btn btn-warning bg-gradient mt-3 me-2">Cancelar</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AñadirRecinto;
