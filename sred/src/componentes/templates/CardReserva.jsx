import React from 'react';
import { BiTrash } from 'react-icons/bi';

function Reserva() {
    return (
        <>
        <div className="col-12 border d-flex align-items-center justify-content-center text-center mt-3">
            <div className="col-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6NVcjixrj9jzHfub5ORbj4ssnu0mgpD8pw&usqp=CAU" alt="recinto" className="w-100" />
            </div>
            <div className="col-3">Título</div>
            <div className="col-2">Fecha y hora</div>
            <div className="col-3"><a href="#" className="btn btn-success">Editar</a></div>
            <div className="col-1"><i className="btn btn-outline-danger"><BiTrash /></i></div>
        </div>
        </>
    )
}

export default Reserva;