import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserId } from './Context';
import Recinto from './templates/CardRecinto';

function Recintos() {
  // mirar si viene de /recintos o /misrecintos
  const location = useLocation()
  const isMisRecintos = location.pathname === '/misrecintos';
  const { userId } = useUserId()
  
  const [id, setId] = useState(0)
  
  useEffect(() => {
    if (isMisRecintos) {
      setId(userId)
      console.log('ismirecintos');
    } else {
      setId(0)
    }
  }, [isMisRecintos, userId]);

  return (
    <>
    <div className="container">
      <h1 className="mt-1 mt-lg-5">{isMisRecintos ? 'Mis Recintos' : 'Todos los Recintos'}</h1>
      <div className="py-4">
        <div className="d-xl-block">
          <div className="row mb-5">
            <Recinto id={id}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Recintos;

