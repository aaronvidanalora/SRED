// Home.jsx
import '../App.css';

function Home() {
  return (
    <>
      <div className="container">
        <h1 className="mt-5 text-center fw-bold" style={{fontSize: '60px'}}>Sistema Reservas Espacios Deportivos</h1>
        <div className="m-5 mx-auto" style={{ maxWidth: '200px' }}>
            <img src="./src/assets/logo.jpg" alt="fpllefia" className="img-fluid"/>
        </div>
      </div>
    </>
  );
}

export default Home;
