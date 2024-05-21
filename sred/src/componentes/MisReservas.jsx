import { useEffect, useState } from 'react';
import { useUserId } from './Context';
import { supabase } from './supabase/Supabase';
import Reserva from './templates/CardReserva';

function MisReservas() {
    const { userId } = useUserId();
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const { data: reservasData, error: reservasError } = await supabase
                .from('reservas')
                .select()
                .eq('userID', userId);
        
                if (reservasError) {
                    throw reservasError;
                }
        
                const promises = reservasData.map(async reserva => {
                    const { data: recintoData, error: recintoError } = await supabase
                        .from('recintos')
                        .select('imagen')
                        .eq('id', reserva.recintoID)
                        .single();
            
                    if (recintoError) {
                        throw recintoError;
                    }
            
                    return { ...reserva, recintoImagen: recintoData.imagen };
                });
        
                const reservasConImagen = await Promise.all(promises);
        
                setReservas(reservasConImagen || []);
            } catch (error) {
                console.error('Error al obtener las reservas:', error.message);
            }
        };
    
        fetchReservas();

    }, [userId])

    const handleDeleteReserva = async (reservaId) => {
        try {
            const { error } = await supabase
                .from('reservas')
                .delete()
                .eq('id', reservaId);

            if (error) {
                console.error('Error al eliminar reserva:', error.message);
            } else {
                setReservas(reservas.filter(reserva => reserva.id !== reservaId))
                console.log('reserva eliminada');
            }
        } catch (error) {
            console.error('Error al eliminar recinto:', error.message);
        }
    }

    return (
        <div className="container p-lg-4 ">
            <div className="row">
                <div className="col-12 py-3">
                    <h2 className="text-center">Mis reservas</h2>
                </div>
                <div className="col-12">
                    {reservas.map(reserva => (
                        <Reserva key={reserva.id} reserva={reserva} deleteReservas={handleDeleteReserva}/>
                    ))}
                    {reservas.length === 0 && <p className='text-dark'>No tienes reservas</p>}
                </div>
            </div>
        </div>
    );
}

export default MisReservas;
