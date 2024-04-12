import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { BiArrowBack } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserId } from './Context';

const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';

const supabase = createClient(supabaseUrl, supabaseKey);

function Reservar() {
  const { userId } = useUserId();
  const navigate = useNavigate()
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

    fetchData();
  }, [id]);

  
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
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
          userID: userId, // cambiar por id del usuario logueado
          fechaReserva: formData.selectedFecha,
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
  };
  
  const modalSubmit = async (e) => {
    e.preventDefault()
    navigate('/reservas')
  }

  return (
    <div className="container mx-auto">
      <div className="d-flex align-items-center">
        <Link to={`/detalle-recinto/${id}`} className="btn btn-outline-secondary mt-5">
          <BiArrowBack style={{ fontSize: '1em', marginRight: '5px' }} />
          Volver
        </Link>
      </div>
      <div className="col-12 ">
        <div className="row mt-4 ">
          <form action="" className="col-6 d-flex flex-column p-5" onSubmit={handleSubmit}> {/* onSubmit={handleSubmit} */} 
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
            
            <button type="submit" className="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Reservar
            </button>
          </form>

          {recinto && (
            <div className='col-6'><img src={recinto.imagen} alt={recinto.nombre} className="img-fluid mt-3 rounded-4 border border-4 shadow"/></div>
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => {modalSubmit(e)}}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 container mx-auto'>
        <hr />
        <p className='py-3'>El <strong>Camp Nou</strong>, ubicado en Barcelona, España, es el estadio más grande de Europa y un ícono del fútbol mundial. Con capacidad para más de 99,000 espectadores. Reservar este magnífico recinto es garantía de una experiencia inolvidable, ofrece instalaciones de primera clase para eventos deportivos, entrenamientos y competiciones internacionales. Su atmósfera única, marcada por la pasión de los aficionados, lo convierte en un lugar excepcional para vivir la emoción del fútbol en su máximo esplendor.</p>
        <div className='d-flex justify-content-evenly m-4'>
          <div>
            <img src="https://www.civitatis.com/f/espana/barcelona/camp-nou-experience-589x392.jpg" alt="" className="img-fluid" width="300"/>
          </div>
          <div className='px-4 border-start border-end border-3'>
            <img src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/17/15871251270783.jpg" alt="" className="img-fluid" width="350"/>
          </div>
          <div>
          {/* width="300" */}
            <img src="https://cdn.getyourguide.com/img/location/d97462d66c031fd3.jpeg/99.jpg" alt="" className="img-fluid" width="400"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservar;
