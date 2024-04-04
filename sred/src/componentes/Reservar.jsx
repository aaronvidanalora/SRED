import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Reservar() {
  const { id } = useParams();
  const [recinto, setRecinto] = useState(null);

  const [formData, setFormData] = useState({
    selectedEntrada: "08:00",
    selectedSalida: "10:00",
    selectedFecha: new Date(), // Establecer la fecha por defecto como la fecha actual
    horasReservadas: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
      const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';

      const supabase = createClient(supabaseUrl, supabaseKey);

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

  
  const handleChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };
  
  return (
    <div className="container mx-auto">
      <div className="col-12 ">
        <div className="row mt-4 ">
          <form action="" className="col-6 d-flex flex-column p-5">
            <div className="d-flex align-items-center ">
              <label htmlFor="fecha" className="h2 mt-2 me-4">Fecha</label>
              <DatePicker
                selected={formData.selectedFecha}
                className="form-control w-auto  "
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => handleChange("selectedFecha", date)}
              />
            </div>
            {/* bucle con botones que estos botones seran las horas del recinto, tanto disponibles como ocupadas */}
            <div className="col-12 d-flex">
              <div className="col-4">
                <label htmlFor="entrada" className="h2 mt-5">Entrada</label>
                <select name="selectedEntrada" id="entrada" className="form-control" onChange={(e) => handleChange("selectedEntrada", e.target.value)} value={formData.selectedEntrada}>
                  <option value="08:00">08:00</option>
                  <option value="10:30">10:30</option>
                  <option value="12:30">12:30</option>
                </select>
              </div>
              <div className="offset-4 col-4">
                <label htmlFor="salida" className="h2 mt-5">Salida</label>
                <select name="selectedSalida" id="salida" className="form-control" onChange={(e) => handleChange("selectedSalida", e.target.value)} value={formData.selectedSalida}>
                  <option value="10:00">10:00</option>
                  <option value="12:30">12:30</option>
                  <option value="14:30">14:30</option>
                </select>
              </div>
            </div>
            
            <button type="button" className="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Su reserva para en {formData.selectedRecinto} el día {formData.selectedFecha.toLocaleDateString()}, de {formData.selectedEntrada} hasta {formData.selectedSalida} está confirmada
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservar;
