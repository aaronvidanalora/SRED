/* eslint-disable react/prop-types */
import { BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { supabase } from '../supabase/Supabase';

function Reserva({ reserva, deleteReservas }) {
    const navigate = useNavigate()

    const [modalData, setModalData] = useState({
        selectedEntrada: reserva.entrada,
        selectedSalida: reserva.salida,
        selectedFecha: new Date(reserva.fechaReserva),
    });
    
    const handleChange = (name, value) => {
        if (name === "selectedEntrada") {
            const horasSalida = horasEntrada.slice(horasEntrada.indexOf(value) + 1);
            const newSalida = horasSalida.length > 0 ? horasSalida[0] : modalData.selectedSalida;
            setModalData({
                ...modalData,
                selectedEntrada: value,
                selectedSalida: newSalida,
            });
        } else {
            setModalData({
                ...modalData,
                [name]: value
            });
        }
    };
    
    const horasEntrada = [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '16:00', '17:00', '18:00', '19:00', '20:00'
    ];
    const horasSalida = horasEntrada.slice(horasEntrada.indexOf(modalData.selectedEntrada) + 1);


    const modalSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data, error } = await supabase
            .from('reservas')
            .update({
                entrada: modalData.selectedEntrada,
                salida: modalData.selectedSalida,
                fechaReserva: modalData.selectedFecha,
            })
            .eq('id', reserva.id)

            if (error) {
                console.error('Error fetching data:', error);
            }

            // navigate('/reservas')
            
        } catch (error) {
            console.error('Error mensaje', error.message);
        }
    }
    

    return (
        <>

            <div className=" row pt-4 pb-4 border d-flex align-items-center justify-content-center text-center mt-3">
                <div className="col-lg-3 col-12">
                    <img src={reserva.recintoImagen} alt={reserva.recintoImagen} className="w-100 col-12 " />

                </div>
                <div className="col-lg-3 col-12 fs-4">{reserva.nameRecinto}</div>
                <div className="col-lg-3">
                    <div className='fs-5 pb-lg-3'>{reserva.fechaReserva}</div>
                    <div className='fw-semibold '>{reserva.entrada} / {reserva.salida}</div>
                </div>
                <div className="col-3 d-flex justify-content-evenly">
                    <div>
                        <button className="shadow btn btn-success bg-gradient" data-bs-toggle="modal" data-bs-target="#exampleModalEditar">Editar</button> 
                    </div>
                    <div>
                        <button className="shadow btn btn-outline-danger" onClick={() => deleteReservas(reserva.id)}><BiTrash /></button>
                    </div>
                </div>
            </div>
            {/* MODAL EDITAR RESERVA */}
            <div className="modal fade" id="exampleModalEditar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" className="d-flex flex-column p-5">
                                <div className="d-flex align-items-center justify-content-center ">
                                    <label htmlFor="fecha" className="h5 mt-2 me-3">Fecha</label>
                                    <DatePicker
                                        selected={modalData.selectedFecha}
                                        className="form-control w-auto "
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date) => handleChange("selectedFecha", date)}
                                    />
                                    <div className='ms-5 border border-2 rounded-3 '>
                                        <img src={reserva.recintoImagen} alt={reserva.recintoImagen} className='img-fluid shadow-lg rounded-2' />
                                    </div>
                                </div>
                                <div className="col-12 d-flex">
                                    <div className="col-4">
                                        <label htmlFor="entrada" className="h5 mt-5">Hora de entrada</label>
                                        <select name="selectedEntrada" id="entrada" className="form-control" value={modalData.selectedEntrada}
                                            onChange={(e) => handleChange("selectedEntrada", e.target.value)}>
                                        {horasEntrada.map(hora => (
                                            <option key={hora} value={hora}>{hora}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className="offset-2 col-4">
                                        <label htmlFor="salida" className="h5 mt-5">Hora de salida</label>
                                        <select name="selectedSalida" id="salida" className="form-control" value={modalData.selectedSalida}
                                            onChange={(e) => handleChange("selectedSalida", e.target.value)}>
                                        {horasSalida.map(hora => (
                                            <option key={hora} value={hora}>{hora}</option>
                                        ))}
                                        {horasSalida.length === 0 && <option disabled>No hay opciones disponibles</option>}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="shadow btn btn-success bg-gradient" data-bs-dismiss="modal" onClick={(e) => {modalSubmit(e)}}>Confirmar reserva</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Reserva;
