

function AdminRecinto() {
  return (
    <main>
      <div className="container-fluid">
        <h1 className="mt-5">Panel de administración</h1>
        {/* Tabs */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item w-50">
                <a className="nav-link" aria-current="page" href="#">
                  Usuarios
                </a>
              </li>
              <li className="nav-item w-50">
                <a className="nav-link active" href="#">
                  Recintos
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tabla Recintos */}
        <div className="border border-top-0 p-3">
          {/* Buscador */}
          <div className="row">
            <div className="d-flex col-12 col-md-6 mb-3">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscador"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bi bi-x"></i>
                </span>
              </div>
            </div>
          </div>

          {/* Tabla Recintos */}
          <div className="col-12" style={{ overflowX: 'auto' }}>
            <table className="table table-striped table-bordered table-hover align-middle mt-3">
              <thead className="table-dark">
                <tr>
                  <th></th>
                  <th>
                    Nombre <span><i className="bi bi-caret-down"></i></span>
                  </th>
                  <th>
                    Descripción <span><i className="bi bi-caret-down"></i></span>
                  </th>
                  <th>
                    Propietario <span><i className="bi bi-caret-down"></i></span>
                  </th>
                  <th>
                    Estado <span><i className="bi bi-caret-down"></i></span>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div className="containerImagen">
                      <img width="50px" src="./src/logo.jpg" alt="" />
                    </div>
                  </td>
                  <td>Recinto ejemplo 1</td>
                  <td>Recinto Deportivo</td>
                  <td>Propietario 1</td>
                  <td>Reservado</td>
                  <td><i className="btn btn-outline-primary bi bi-pencil"></i></td>
                  <td><i className="btn btn-outline-danger bi bi-trash3"></i></td>
                </tr>
                <tr>
                  <td>
                    <div className="containerImagen">
                      <img width="50px" src="./src/logo.jpg" alt="" />
                    </div>
                  </td>
                  <td>Recinto ejemplo 1</td>
                  <td>Recinto Deportivo</td>
                  <td>Propietario 1</td>
                  <td>Reservado</td>
                  <td><i className="btn btn-outline-primary bi bi-pencil"></i></td>
                  <td><i className="btn btn-outline-danger bi bi-trash3"></i></td>
                </tr>
                <tr>
                  <td>
                    <div className="containerImagen">
                      <img width="50px" src="./src/logo.jpg" alt="" />
                    </div>
                  </td>
                  <td>Recinto ejemplo 1</td>
                  <td>Recinto Deportivo</td>
                  <td>Propietario 1</td>
                  <td>Reservado</td>
                  <td><i className="btn btn-outline-primary bi bi-pencil"></i></td>
                  <td><i className="btn btn-outline-danger bi bi-trash3"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminRecinto;
