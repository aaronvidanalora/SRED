import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Link } from 'react-router-dom';

export const menuRol = () => {
    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
    const supabase = createClient(supabaseUrl, supabaseKey)
  
    // query para saber el rol del usuario
    
    // supabase.Rol es provisional
    switch(supabase.Rol){
        case 'anonimo':
            return (
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex justify-content-end mx-auto mb-2 mb-lg-0">
                        <li>
                            <Link to="/signin" className='nav-link text-bg-dark me-3'>Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className='nav-link text-bg-dark '>Registrarse</Link>
                        </li>
                    </ul>
                </div>
            )
        case 'registrado':
            return (
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex justify-content-end mx-auto mb-2 mb-lg-0">
                        <li>
                            <Link to="/reservas" className='nav-link text-bg-dark me-3'>Reservas</Link>
                        </li>
                    </ul>
                </div>
            )
        case 'propietario':
            return (
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex justify-content-end mx-auto mb-2 mb-lg-0">
                        <li>
                            <Link to="/recintos" className='nav-link text-bg-dark me-3'>Recintos</Link>
                        </li>
                    </ul>
                </div>
            )
        case 'administrador':
            return ('')
    }
}

export const menuUsuario = () => {
    const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
    const supabase = createClient(supabaseUrl, supabaseKey)

    // query para saber el rol del usuario
    // supabase.Rol es provisional
    switch(supabase.Rol){
        case 'registrado':
            return (
                <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img src="./src/assets/react.svg" alt="" width="25" />
                        </a>
                        <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
                            <li class="text-light text-end p-2 small">
                                ${ls.getUsuario().email}
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><Link to="/signin" class="dropdown-item">Mi perfil</Link></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><Link to="/signin" class="dropdown-item">Cerrar sesión</Link></li>
                        </ul>
                    </li>
                </ul>
            )
        case 'propietario':
            return (
                <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img src="./src/assets/react.svg" alt="" width="25" />
                    </a>
                    <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
                        <li class="text-light text-end p-2 small">
                            ${ls.getUsuario().email}
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><Link to="/signin" class="dropdown-item">Mi perfil</Link></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><Link to="/signin" class="dropdown-item">Cerrar sesión</Link></li>
                    </ul>
                    </li>
                </ul>            
            )
        case 'administrador':
            return (
                <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img src="./src/assets/react.svg" alt="" width="25" />
                    </a>
                    <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
                        <li class="text-light text-end p-2 small">
                            ${ls.getUsuario().email}
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><Link to="/" class="dropdown-item">Administrador de Usuarios</Link></li>
                        <li><Link to="/" class="dropdown-item">Administrador de Recintos</Link></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><Link to="/" class="dropdown-item">Mi perfil</Link></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><Link to="/" class="dropdown-item">Cerrar sesión</Link></li>
                    </ul>
                    </li>
                </ul>            
            )

    }
}
