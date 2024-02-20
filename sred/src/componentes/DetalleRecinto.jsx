import '../App.css';


function DetalleRecinto() {
  return (
    <main>
      <div className="container">
        <h1 className="mt-5">Nombre del recinto</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary mt-5">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: '1em' }}></i>
            Volver
          </button>
        </div>
        <div className="row mt-2">
          <div className="col-12 col-md-4 mb-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6NVcjixrj9jzHfub5ORbj4ssnu0mgpD8pw&usqp=CAU"
              alt=""
              className="img-fluid mt-3"
            />
          </div>
          <div className="col-12 col-md-8">
            <p>
              <strong>Nombre: </strong>
              <span id="nombre">Pabellón Pepe</span>
            </p>
            <p>
              <strong>Propietario: </strong>
              <span id="nombre">Pepe García</span>
            </p>
            <p>
              <strong>Capacidad: </strong>
              <span id="nombre">3.000 personas</span>
            </p>
            <p>
              <strong>Ubicación: </strong>
              <span id="nombre">Calle Pepito Grillo 12, Badalona</span>
            </p>
            <p>
              <strong>Deporte recomendado: </strong>
              <span id="nombre">Deportes de contacto / Básquet</span>
            </p>
            <p>
              <strong>Descripción: </strong>
              <span id="nombre">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                modi dicta iste debitis recusandae perspiciatis quae. Eius
                impedit saepe autem velit voluptate, odio sequi expedita nisi
                est molestiae quo quisquam!
              </span>
            </p>
          </div>
        </div>
        <div
          className="container fixed-bottom d-flex justify-content-end"
          style={{ padding: '0px 0px 100px 0px' }}
        >
          <a className="btn btn-success fs-5 shadow">Reservar</a>
        </div>
      </div>
    </main>
  );
}

export default DetalleRecinto;
