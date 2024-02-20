import React from 'react';

function SignIn() {
  return (
    <>
      <div className="container">
        <h1 className="mt-5 text-center">Inicia sesión</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '400px' }}>
          <form action="" className="form border shadow-sm p-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input required id="email" type="email" className="form-control" />
            <label htmlFor="pass" className="form-label mt-3">Contraseña:</label>
            <input required minLength="6" id="pass" type="password" className="form-control" />
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Recordar sesión
              </label>
            </div>
            <a className="d-block text-end" href="#">¿Has olvidado tu contraseña?</a>
            <a className="btn btn-primary w-100 mt-3" href="#">Iniciar sesión</a>
          </form>
          <a className="d-block mt-5 btn btn-secondary mx-auto" href="#">¿Eres nuevo? Regístrate</a>
        </div>
      </div>
    </>
  );
}

export default SignIn;

