/* eslint-disable react/prop-types */
import { BiTrash } from 'react-icons/bi';

function Reserva({ reserva, deleteReservas }) {

    return (
        <>
        <div className="col-12 border d-flex align-items-center justify-content-center text-center mt-3">
            <div className="col-3">
                <img src={reserva.recintoImagen} alt="recinto" className="w-100" />
            </div>
            <div className="col-3 fs-4">{reserva.nameRecinto}</div>
            <div className="col-3">
                <div className='fs-5 pb-3'>{reserva.fechaReserva}</div>
                <div className='fw-semibold '>{reserva.entrada} / {reserva.salida}</div>
            </div>
            <div className="col-3 d-flex justify-content-center">
                <div className='me-3'>
                    {/* hacer editar reserva */}
                    <a href="#" className="btn btn-success">Editar</a> 
                </div>
                <div>
                    <button className="btn btn-outline-danger" onClick={() => deleteReservas(reserva.id)}><BiTrash /></button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Reserva;