// Header.jsx
import React from 'react';

function SignUp() {
  return (
    <>   
        <div className="container">
        <h1 className="mt-5 text-center">Registro</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '400px' }}>
            <form action="" className="form border shadow-sm p-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input required id="nombre" type="text" className="form-control" />
                <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                <input id="apellidos" type="text" className="form-control" />
                <label htmlFor="email" className="form-label">Email:</label>
                <input required id="email" type="text" className="form-control" />
                <label htmlFor="dni" className="form-label">DNI:</label>
                <input required id="dni" type="text" className="form-control" />
                <label htmlFor="pass" className="form-label mt-3">Contraseña:</label>
                <input required minLength="6" id="pass" type="password" className="form-control" />
                <a className="btn btn-primary w-100 mt-3" href="#">Enviar</a>
            </form>
        </div>
        </div>
    </>
  );
}

export default SignUp;

