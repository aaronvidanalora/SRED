// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import Header from './componentes/Header';
import { UserRoleProvider } from './componentes/Context';
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://sdyghacdmxuoytrtuntm.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeWdoYWNkbXh1b3l0cnR1bnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTkxNTksImV4cCI6MjAyNDYzNTE1OX0.dxlHJ9O4V2KZfC9yAGCLCHgKdVnLU41SWSXkzgohcvI'
// const supabase = createClient(supabaseUrl, supabaseKey)

// // Mostramos por consola la conexión establecida
// console.log('conexión', supabase)
function App() {
  return (
    <>
    <UserRoleProvider>
      <Header />
    </UserRoleProvider>
    </>
  );
}

export default App;
