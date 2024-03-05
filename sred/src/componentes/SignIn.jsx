import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  
  const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
  const supabase = createClient(supabaseUrl, supabaseKey)

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error al iniciar sesión:', error.message);
        alert('Usuario o contraseña incorrectos');
      } else {
        navigate('/recintos')
        console.log('Usuario ha iniciado sesión correctamente:', data.user);
      }
    } catch (error) {
      console.error('Error general:', error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-5 text-center">Inicia sesión</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '400px' }}>
          <form className="form border shadow-sm p-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              required
              id="email"
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass" className="form-label mt-3">Contraseña:</label>
            <input
              required
              minLength="6"
              id="pass"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
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
            <a className="d-block text-end" href="#">
              ¿Has olvidado tu contraseña?
            </a>
            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleSignIn}
            >
              Iniciar sesión
            </button>
          </form>
          <a className="d-block mt-5 btn btn-secondary mx-auto" href="#">
            ¿Eres nuevo? Regístrate
          </a>
        </div>
      </div>
    </>
  );
}

export default SignIn;
