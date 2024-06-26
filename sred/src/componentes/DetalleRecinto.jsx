import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack, BiCalendarPlus  } from 'react-icons/bi'; 
import { useUserRole } from './Context';
import { supabase } from './supabase/Supabase';

function DetalleRecinto() {
  const { id } = useParams();

  const { userRole } = useUserRole();

  const navigate = useNavigate()

  const [recinto, setRecinto] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const { data, error } = await supabase.from('recintos').select().eq('id', id).single();
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setRecinto(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if(userRole != undefined || userRole != null){
      fetchData();
    } else {
      navigate('*')
    }
  }, [id]);

  function goBack(){
    navigate('/')
  }

  return (
    <div className="container text-light ">
      <h1 className="mt-lg-5 mt-0">{recinto ? recinto.nombre : 'Cargando...'}</h1>
      <div className="d-flex justify-content-end">
        <div onClick={goBack} className="btn btn-secondary bg-gradient mt-lg-5 mt-0 ">
          <BiArrowBack style={{ fontSize: '1em', marginRight: '5px' }} />
          Volver
        </div>
      </div>
      {recinto && (
        <div className="row mt-2 align-items-center ">
          <div className="col-12 col-md-4 mb-3">
            <img src={recinto.imagen} alt={recinto.nombre} className="img-fluid mt-3 rounded-3" />
          </div>
          <div className="col-12 col-md-8">
            <p>
              <strong>Nombre: </strong>
              <span id="nombre">{recinto.nombre}</span>
            </p>
            <p>
              <strong>Propietario: </strong>
              <span id="nombre">{recinto.propietario}</span>
            </p>
            <p>
              <strong>Capacidad: </strong>
              <span id="nombre">{recinto.capacidad} personas</span>
            </p>
            <p>
              <strong>Ubicación: </strong>
              <span id="nombre">{recinto.ubicacion}</span>
            </p>
            <p>
              <strong>Deporte recomendado: </strong>
              <span id="nombre">{recinto.deportes}</span>
            </p>
            <p>
              <strong>Descripción: </strong>
              <span id="nombre">{recinto.descripcion}</span>
            </p>
          </div>
        </div>
      )}
      <div className="container d-flex justify-content-end">

        <Link to={`/reservarecinto/${id}`} className="shadow btn btn-success bg-gradient fs-5 shadow d-flex align-items-center">
          Reservar
          <BiCalendarPlus style={{ fontSize: '1em', marginLeft: '10px' }}></BiCalendarPlus>
        </Link>
      </div>
    </div>
  );
}

export default DetalleRecinto;
