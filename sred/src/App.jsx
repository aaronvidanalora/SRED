import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header';
import { UserRoleProvider } from './componentes/Context';
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
