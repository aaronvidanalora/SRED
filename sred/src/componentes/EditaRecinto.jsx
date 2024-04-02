import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EditaRecinto() {
  return (
    <main>
      <div className="container">
        <h1 className="mt-5">Edita Recinto</h1>
        <div className="d-flex justify-content-end">
          <Link to="/adminrecinto" className="btn btn-outline-secondary mt-5">
            <FaArrowLeft style={{ fontSize: '1em' }} />
            Volver
          </Link>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-md-4 pt-2 mb-3">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6NVcjixrj9jzHfub5ORbj4ssnu0mgpD8pw&usqp=CAU" alt="" className="img-fluid" />
            <label className="form-label mt-3" htmlFor="img"><strong>URL imágen: </strong></label>
            <input type="text" value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6NVcjixrj9jzHfub5ORbj4ssnu0mgpD8pw&usqp=CAU" className="form-control mt-1" />
          </div>
          <div className="col-12 col-md-8">
            <form action="" className="form">
              <label className="form-label" htmlFor="nombre"><strong>Nombre: </strong></label>
              <input id="nombre" type="text" value="Nombre Autor" className="form-control" />
              <label className="form-label mt-2" htmlFor="propietario"><strong>Propietario: </strong></label>
              <select id="propietario" className="form-control">
                <option value="pepe">Pepe García</option>
                <option value="carlos">Carlos Arrebola</option>
              </select>
              <label className="form-label mt-2" htmlFor="cap"><strong>Capacidad: </strong></label>
              <input id="cap" type="text" className="form-control" value="3.000"/>
              <label className="form-label mt-2" htmlFor="ubi"><strong>Ubicación: </strong></label>
              <input id="ubi" type="text" className="form-control" value="Calle Pepito Grillo 12, Badalona" />
              <label className="form-label mt-2" htmlFor="dep"><strong>Deportes: </strong></label>
              <input id="dep" type="text" className="form-control" value="Deportes de contacto, Baloncesto" />
              <label className="form-label mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
              <textarea id="descripcion" className="form-control" rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.</textarea>
              <input type="submit" className="btn btn-success mt-3 me-2" value="Publicar" />
              <input type="submit" className="btn btn-success mt-3 me-2" value="Actualizar" />
              <input type="submit" className="btn btn-warning mt-3 me-2" value="Cancelar" />
              <input type="submit" className="btn btn-danger mt-3" value="Eliminar" />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditaRecinto;
