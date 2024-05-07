import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserRole , useUserId} from './Context'; // Importar el contexto
import { HandleId } from './menus/Menus';
import { supabase } from './supabase/Supabase';

function SignIn() {
  const navigate = useNavigate();
  const { setUserRole } = useUserRole(); // Obtener la función para establecer el rol del usuario desde el contexto
  const { setUserId } = useUserId(); // Obtener la función para establecer el rol del usuario desde el contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });


      if (error) {
        console.error('Error al iniciar sesión:', error.message);
        alert('Usuario o contraseña incorrectos');
      } else {
        console.log(data)

        navigate('/recintos');

        localStorage.setItem('login', data.user.email);
        
        const userRoleData = await fetchUserRole(data.user.email);
        const userIdData = await HandleId(data.user.email);
        const userId = userIdData[0].id || null
        console.log('ID', userId)

        const userRole = userRoleData?.rol || null;
        console.log('ROL', userRole)

        localStorage.setItem('rol', userRole);
        localStorage.setItem('id', userId);

        setUserRole(userRole);
        setUserId(userId) 
      }
    } catch (error) {
      console.error('Error general:', error.message);
    }
  };

  const fetchUserRole = async (email) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('email', email);

      if (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error.message);
      return null;
    }
  };

  return (
    <>
      <div className="container text-light">
        <h1 className="mt-5 text-center">Inicia sesión</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '400px' }}>
          <form className="form border rounded-3 shadow-sm p-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              required
              id="email"
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass" className="form-label mt-3">
              Contraseña:
            </label>
            <input
              required
              minLength="6"
              id="pass"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Recordar sesión
              </label>
            </div>
            <a className="d-block text-end" href="#">
              ¿Has olvidado tu contraseña?
            </a>
            <button
              type="button"
              className="shadow btn btn-primary bg-gradient w-100 mt-3"
              onClick={handleSignIn}
            >
              Iniciar sesión
            </button>
          </form>
          <Link to="/SignUp" className="d-block mt-5 shadow btn btn-secondary bg-gradient mx-auto">
            ¿Eres nuevo? Regístrate
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
