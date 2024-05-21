import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase/Supabase';

function SignUp() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDNI] = useState('');
  const [password, setPassword] = useState('');
  const rol = localStorage.getItem('rol')

  useEffect(() => {
    if (rol != undefined || rol != null) {
      navigate('*')
    }
  }, []);

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
      
      navigate('/signin')
    } catch (error) {
      console.error('Error general:', error.message);
    }
  };
  

  return (
    <>
      <div className="container text-light">
        <h1 className="mt-2 mt-lg-5 text-center">Registro</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '400px' }}>
          <form className="form border rounded-3 shadow-sm p-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input required id="nombre" type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} />

            <label htmlFor="apellidos" className="form-label mt-3">Apellidos:</label>
            <input id="apellidos" type="text" className="form-control" onChange={(e) => setApellidos(e.target.value)} />

            <label htmlFor="email" className="form-label mt-3">Email:</label>
            <input required id="email" type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="dni" className="form-label mt-3">DNI:</label>
            <input required id="dni" type="text" className="form-control" onChange={(e) => setDNI(e.target.value)} />

            <label htmlFor="pass" className="form-label mt-3">Contraseña:</label>
            <input required minLength="6" id="pass" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />

            <button type="button" className="shadow btn btn-primary bg-gradient w-100 mt-3" onClick={handleSignUp}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
