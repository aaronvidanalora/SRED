import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function MenuRol() {
    try {
        const email = localStorage.getItem('login');
        const { data, error } = await supabase
            .from('usuarios')
            .select('rol')
            .eq('email', email);

        if (error) {
            console.error('Error al obtener el rol del usuario:', error.message);
            return '';
        }

        switch (data[0]?.rol) {
            case 'registrado':
                return 'registrado';
            case 'propietario':
                return 'propietario';
            case 'admin':
                return 'admin';
            default:
                return '';
        }
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
    }
}

export async function MenuUsuario() {
    try {
        const email = localStorage.getItem('login');
        const { data, error } = await supabase
            .from('usuarios')
            .select('rol, name, imagen')
            .eq('email', email);

        if (error) {
            console.error('Error al obtener los datos del usuario:', error.message);
            return '';
        }

        return data[0];
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error.message);
        return null;
    }
}
