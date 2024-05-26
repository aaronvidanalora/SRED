import React, { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define UserRoleContext
const UserRoleContext = createContext();
const UserIdContext = createContext();

// Configuración de Supabase
const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Export useUserRole and useUserId hooks
export const useUserRole = () => useContext(UserRoleContext);
export const useUserId = () => useContext(UserIdContext);

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const email = localStorage.getItem('login');
      if (!email) {
        console.warn('No hay un email en localStorage');
        return null;
      }

      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select('rol')
          .eq('email', email)
          .single(); // .single() asegura que solo se devuelve un objeto en lugar de un array

        if (error) {
          console.error('Error al obtener el rol del usuario:', error.message);
          return null;
        }

        return data.rol; // Asumiendo que 'rol' es una propiedad del objeto devuelto
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
      }
    };

    // Función para comprobar el ID de usuario en localStorage
    const checkUserId = () => {
      const storedId = localStorage.getItem('id');
      if (storedId) {
        setUserId(storedId);
      } else {
        setUserId(undefined);
      }
    };

    // Ejecutar la función al montar el componente
    checkUserRole().then(role => {
      if (role) {
        setUserRole(role); // Actualiza el estado del rol del usuario
      } else {
        setUserRole(undefined); // O maneja el caso cuando no se puede obtener el rol
      }
    });
    checkUserId();

    // Comprobar el rol y el ID en localStorage cada segundo
    const interval = setInterval(() => {
      checkUserRole().then(role => {
        if (role) {
          setUserRole(role); // Actualiza el estado del rol del usuario
        } else {
          setUserRole(undefined); // O maneja el caso cuando no se puede obtener el rol
        }
      });
      checkUserId();
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <UserIdContext.Provider value={{ userId, setUserId }}>
        {children}
      </UserIdContext.Provider>
    </UserRoleContext.Provider>
  );
};
