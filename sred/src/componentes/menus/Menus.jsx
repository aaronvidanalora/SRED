import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function MenuRol(){
    try {
        const { data, error } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('email', 'riveranavarreteraul@fpllefia.com')
        // añadir que sea en el caso del usuario que este logueado no el mail, que es un caso provisional el de ahora

        if (error) {
          console.error('Error al obtener el rol del usuario:', error.message);
          return null;
        }

        switch (data[0].rol) {
            case 'anonimo':
                return 'anonimo'
            case 'registrado':
                return 'registrado'
            case 'propietario':
                return 'propietario'
            case 'admin':
                return 'admin'
        }
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
    }
}

export async function MenuUsuario() {
    try {
        const { data, error } = await supabase
        .from('usuarios')
        .select('rol, name, imagen')
        .eq('email', 'riveranavarreteraul@fpllefia.com')
        // añadir que sea en el caso del usuario que este logueado no el mail, que es un caso provisional el de ahora

        if (error) {
          console.error('Error al obtener el rol del usuario:', error.message);
          return null;
        }

        console.log(data[0])
        return data[0]

    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
    }
}
