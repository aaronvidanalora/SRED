import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useUserId } from './Context';
import Reserva from './templates/CardReserva';

const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';

const supabase = createClient(supabaseUrl, supabaseKey);

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

    const handleDeleteRecinto = async (reservaId) => {
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
        <div className="container p-4 ">
            <div className="row">
                <div className="col-12 py-3">
                    <h2 className="text-center">Mis reservas</h2>
                </div>
                <div className="col-12 border p-3">
                    {reservas.map(reserva => (
                        <Reserva key={reserva.id} reserva={reserva} deleteReservas={handleDeleteRecinto}/>
                    ))}
                    {reservas.length === 0 && <p>No tienes reservas</p>}
                </div>
            </div>
        </div>
    );
}

export default MisReservas;
