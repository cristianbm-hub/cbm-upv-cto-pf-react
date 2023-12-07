// Importa useState y useEffect desde React
import './App.css';
import Formulario from './components/Form.jsx';

function App() {

  // Obtener datos del soldado desde la API de pacientes de WarMedAI
  const fetchData = async (soldadoid) => {
    let apiUrl = 'http://127.0.0.1:8000/soldado/' + soldadoid;
    try {
      const responsePromise = fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
  
      // Configura el tiempo límite de respuesta en milisegundos (por ejemplo, 10 segundos)
      const TIMEOUT_LIMIT = 5000;
  
      // Crea una promesa que se rechace después del tiempo límite
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tiempo de espera agotado')), TIMEOUT_LIMIT)
      );
  
      // Utilizar Promise.race para esperar la respuesta o el tiempo de espera
      const response = await Promise.race([responsePromise, timeoutPromise]);
  
      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      // Manejar el error de conexión o si el servidor no está disponible
      console.error(error);
      return { error: 'No se pudo conectar al servidor' };
    }
  };
  
  
  // Función para manejar el envío de datos desde el formulario
  const manejarDatosFormulario = (datos) => {
    const data_soldado = fetchData(datos.identificador);
    // imprime los datos de data_soldado al resolver la promesa
    data_soldado.then((data) => {
    console.log(typeof datos, datos);
    console.log(typeof data, data)});
  };

  return (
    <div>
      <h1>WarMedAI</h1>

      <div className="flex justify-center">
        <img src="/soldier.png" className="w-1/4" alt="Soldado" />
      </div>
      <Formulario onEnviar={manejarDatosFormulario} />
    </div>
  );
}

export default App;
