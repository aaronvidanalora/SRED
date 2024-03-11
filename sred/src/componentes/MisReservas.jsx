import React from 'react';
import Reserva from './templates/CardReserva';

function MisReservas() {
    return (
        <div className="container p-5 mt-5 border">
            <div className="row">
                <div className="col-12 border">
                    <h2 className="text-center">Mis reservas</h2>
                </div>
                <div className="col-12 border p-3">
                    <Reserva />
                    <Reserva />
                </div>
            </div>
        </div>
    );
}

export default MisReservas;
