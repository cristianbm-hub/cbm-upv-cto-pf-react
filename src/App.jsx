import './App.css'
import Formulario from './components/Form.jsx';

function App() {
  
  const manejarDatosFormulario = (datos) => {
    // Haz algo con los datos del formulario aquí
    console.log(datos);
  };

  return (
    <div>
    <h1>WarMedAI</h1>
    <div className="flex justify-center">
      <img src="/soldier.png"  className="w-1/4" />
    </div>
    <Formulario onEnviar={manejarDatosFormulario}/>
  </div>
  )
}

export default App
