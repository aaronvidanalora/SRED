import React, { createContext, useState, useEffect, useContext } from 'react';

// Define UserRoleContext
const UserRoleContext = createContext();

// Define UserIdContext
const UserIdContext = createContext();

// Export useUserRole and useUserId hooks
export const useUserRole = () => useContext(UserRoleContext);
export const useUserId = () => useContext(UserIdContext);

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Función para comprobar el rol en localStorage
    const checkUserRole = () => {
      const storedRole = localStorage.getItem('rol');
      if (storedRole) {
        setUserRole(storedRole);
      } else {
        setUserRole(undefined);
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
    checkUserRole();
    checkUserId();

    // Comprobar el rol en localStorage cada segundo
    const interval = setInterval(checkUserRole, 1000);
    const interval2 = setInterval(checkUserId, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval, interval2);
  }, []);

  return (
    <>
      <UserRoleContext.Provider value={{ userRole, setUserRole }}>
        <UserIdContext.Provider value={{ userId, setUserId }}>
          {children}
        </UserIdContext.Provider>
      </UserRoleContext.Provider>
    </>
  );
};
