import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="container">
      <h1>Error 404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no pudo ser encontrada.</p>
      <p>Por favor, vuelve a la <Link to="/">página de inicio</Link>.</p>
    </div>
  );
}

export default ErrorPage;
