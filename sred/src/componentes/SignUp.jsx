import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function SignUp() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDNI] = useState('');
  const [password, setPassword] = useState('');

  const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleSignUp = async () => {
    try {
      // Perform the sign-up request
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error('Error al registrar usuario:', error.message, error);
        return;
      }
  
      console.log('Usuario después del registro:', data);
  
      // Create an entry in the 'usuarios' table only if the signup is successful
      const { data: dbData, error: dbError } = await supabase
        .from('usuarios')
        .insert([
          {
            name: nombre,
            apellidos: apellidos,
            email: email,
            dni: dni,
            rol: 'registrado',
          },
        ]);
  
      if (dbError) {
        console.error('Error al insertar usuario en la base de datos:', dbError.message);
        return;
      }
      
      console.log('Usuario registrado y añadido a la base de datos:', data.user);
      navigate('/signin')
    } catch (error) {
      console.error('Error general:', error.message);
    }
  };
  

  return (
    <>
      <div className="container">
        <h1 className="mt-5 text-center">Registro</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '400px' }}>
          <form className="form border shadow-sm p-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input required id="nombre" type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} />

            <label htmlFor="apellidos" className="form-label">Apellidos:</label>
            <input id="apellidos" type="text" className="form-control" onChange={(e) => setApellidos(e.target.value)} />

            <label htmlFor="email" className="form-label">Email:</label>
            <input required id="email" type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="dni" className="form-label">DNI:</label>
            <input required id="dni" type="text" className="form-control" onChange={(e) => setDNI(e.target.value)} />

            <label htmlFor="pass" className="form-label mt-3">Contraseña:</label>
            <input required minLength="6" id="pass" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />

            <button type="button" className="btn btn-primary w-100 mt-3" onClick={handleSignUp}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
