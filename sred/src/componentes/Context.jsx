import React, { createContext, useState, useEffect, useContext } from 'react';

const UserRoleContext = createContext();

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  // Función para comprobar el rol en localStorage cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const storedRole = localStorage.getItem('rol');
      if (storedRole) {
        setUserRole(storedRole);
      } else {
        setUserRole(undefined);
      }
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
