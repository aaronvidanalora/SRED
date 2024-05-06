import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserId } from './Context';
import { supabase } from './supabase/Supabase';

function Reservar() {
  const navigate = useNavigate()
  
  const { userId } = useUserId();
  const emailLogin = localStorage.getItem('login')
  const { id } = useParams();
  const [recinto, setRecinto] = useState(null);

  const [formData, setFormData] = useState({
    selectedEntrada: "08:00",
    selectedSalida: "09:00",
    selectedFecha: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {

      try {
        const { data: dataRecinto, error } = await supabase.from('recintos').select().eq('id', id).single();

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setRecinto(dataRecinto);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  
  const handleChange = (name, value) => {
    if (name === "selectedEntrada") {
      // Si el nombre es "selectedEntrada", actualiza también la hora de salida
      const horasSalidaSelected = horasEntrada.slice(horasEntrada.indexOf(value) + 1);
      const newSalida = horasSalidaSelected.length > 0 ? horasSalidaSelected[0] : formData.selectedSalida;
      setFormData({
        ...formData,
        selectedEntrada: value,
        selectedSalida: newSalida, // Actualiza la hora de salida
      });
    } else {
      // Si no es la hora de entrada, simplemente actualiza el estado
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const horasEntrada = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const horasSalida = horasEntrada.slice(horasEntrada.indexOf(formData.selectedEntrada) + 1);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
      .from('reservas')
      .insert([
        { 
          recintoID: recinto.id,
          nameRecinto: recinto.nombre,
          entrada: formData.selectedEntrada,
          salida: formData.selectedSalida,
          userID: userId,
          fechaReserva: formData.selectedFecha,
          email: emailLogin
        }
      ])
      .select()
      
      if (error) {
        throw error;
      }

      console.log('Datos insertados correctamente:', data);
    } catch (error) {
      console.error('Error al insertar datos:', error.message);
    }
  }
  
  const modalSubmit = async (e) => {
    e.preventDefault()
    navigate('/reservas')
  }

  return (
    <div className="container mx-auto text-light">
      <div className="d-flex align-items-center">
        <Link to={`/detalle-recinto/${id}`} className="shadow btn btn-secondary bg-gradient mt-5">
          <BiArrowBack style={{ fontSize: '1em', marginRight: '5px' }} />
          Volver
        </Link>
      </div>
      <div className="col-12 ">
        <div className="row mt-4 ">
          <form action="" className="col-lg-6 d-flex flex-column p-5" onSubmit={handleSubmit}> {/* onSubmit={handleSubmit} */} 
            <div className="d-flex align-items-center ">
              <label htmlFor="fecha" className="h4 mt-2 me-3">Fecha</label>
              <DatePicker
                selected={formData.selectedFecha}
                className="form-control w-auto "
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => handleChange("selectedFecha", date)}
              />
            </div>
            <div className="col-12 d-flex">
              <div className="col-4">
                <label htmlFor="entrada" className="h4 mt-5">Hora de entrada</label>
                <select name="selectedEntrada" id="entrada" className="form-control" onChange={(e) => handleChange("selectedEntrada", e.target.value)} value={formData.selectedEntrada}>
                  {horasEntrada.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>
              <div className="offset-4 col-4">
                <label htmlFor="salida" className="h4 mt-5">Hora de salida</label>
                <select name="selectedSalida" id="salida" className="form-control" onChange={(e) => handleChange("selectedSalida", e.target.value)} value={formData.selectedSalida}>
                  {horasSalida.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                  {horasSalida.length === 0 && <option disabled>No hay opciones disponibles</option>}
                </select>
              </div>
            </div>
            
            <button type="submit" className="shadow btn btn-success bg-gradient mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Reservar
            </button>
          </form>

          {recinto && (
            <div className='col-lg-6 col-12'><img src={recinto.imagen} alt={recinto.nombre} className="img-fluid mt-3 rounded-4 shadow"/></div>
          )}
        </div>

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Reserva realizada con éxito</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => {modalSubmit(e)}}></button>
              </div>
              {recinto && (
              <div className="modal-body">
                Su reserva para {recinto.nombre || ''}, día {formData.selectedFecha.toLocaleDateString()}, de {formData.selectedEntrada} a {formData.selectedSalida} está confirmada
              </div>
              )}
              <div className="modal-footer">
                <button type="button" className="shadow btn btn-secondary bg-gradient" data-bs-dismiss="modal" onClick={(e) => {modalSubmit(e)}}>Ver mis reservas</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {recinto && recinto.info && recinto.imagen2 && recinto.imagen3 && recinto.imagen4 && (
        <div className='mt-5 container mx-auto'>
        <hr />
        <p className='py-3' dangerouslySetInnerHTML={{__html: recinto.info.replace(recinto.nombre, `<strong>${recinto.nombre}</strong>`)} || ''}></p>
        <div className='row d-flex justify-content-evenly m-4'>
          <div className='col-md-4' style={{ maxWidth: '300px', maxHeight: '200px' }}>
            <img src={recinto.imagen2} alt={recinto.nombre} className="img-fluid rounded-3" style={{ width: '100%', height: '100%' }}/>
          </div>
          <div className='col-md-4 px-4 border-start border-end border-3' style={{ maxWidth: '400px', maxHeight: '200px' }}>
            <img src={recinto.imagen3} alt={recinto.nombre} className="img-fluid rounded-3" style={{ width: '100%', height: '100%' }}/>
          </div>
          <div className='col-md-4' style={{ maxWidth: '300px', maxHeight: '200px' }}>
            <img src={recinto.imagen4} alt={recinto.nombre} className="img-fluid rounded-3" style={{ width: '100%', height: '100%' }}/>
          </div>
        </div>
      </div>
      
      )}

    </div>
  );
}

export default Reservar;
