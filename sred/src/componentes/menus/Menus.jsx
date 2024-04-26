import { supabase } from "../supabase/Supabase";

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

export async function HandleId() {
    try {
        const email = localStorage.getItem('login');
        const { data, error } = await supabase
            .from('usuarios')
            .select('id')
            .eq('email', email);

        if (error) {
            console.error('Error al obtener los datos del usuario:', error.message);
            return '';
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error.message);
        return null;
    }
}