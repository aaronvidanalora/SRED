import React, { useState, useRef } from 'react';  // Agrega useRef aquí
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
function SignUp() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDNI] = useState('');
  const [password, setPassword] = useState('');

  const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
  const supabase = createClient(supabaseUrl, supabaseKey)
  


  // Ref para almacenar el objeto de cancelación
  const cancelRequestRef = useRef();

  const handleSignUp = async () => {
    try {
      // Cancelar la solicitud anterior si existe
      if (cancelRequestRef.current) {
        cancelRequestRef.current.cancel();
      }

      // Crear un nuevo objeto de cancelación
      const cancelToken = axios.CancelToken;
      const source = cancelToken.source();
      cancelRequestRef.current = source;

      // Realizar la solicitud de registro
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      console.log('Usuario después del registro:', user);
      
      if (error) {
        console.error('Error al registrar usuario:', error.message);
        return;
      }

      // Crea una entrada en la tabla de usuarios
      const { data, error: dbError } = await supabase
      .from('usuarios')
      .insert([
        {
          nombre,
          apellidos,
          email,
          dni,
          user_id: user.id,
        },
      ]);

      if (dbError) {
        console.error('Error al insertar usuario en la base de datos:', dbError.message);
        return;
      }

      console.log('Usuario registrado y añadido a la base de datos:', data);


      console.log('Usuario registrado y añadido a la base de datos:', data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Solicitud cancelada:', error.message);
      } else {
        console.error('Error general:', error.message);
      }
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


