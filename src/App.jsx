import React, { useState } from 'react';
import './App.css';
import Formulario from './components/Form.jsx';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [resultado, setResultado] = useState(null);

  const fetchData = async (soldadoid) => {
    let apiUrl = 'http://127.0.0.1:8000/soldado/' + soldadoid;
    try {
      const responsePromise = fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const TIMEOUT_LIMIT = 5000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tiempo de espera agotado')), TIMEOUT_LIMIT)
      );

      const response = await Promise.race([responsePromise, timeoutPromise]);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
      return { error: 'No se pudo conectar al servidor' };
    }
  };

  const manejarDatosFormulario = (datos) => {
    const data_soldado = fetchData(datos.identificador);

    data_soldado.then((data) => {
      console.log('Datos del formulario:', datos);
      console.log('Datos del soldado:', data);
      setResultado({ datosFormulario: datos, datosSoldado: data });
      setMostrarFormulario(false);
    });
  };

  return (
    <div>
      <h1>WarMedAI</h1>

      <div className="flex justify-center">
        <img src="/soldier.png" className="w-1/4" alt="Soldado" />
      </div>

      {mostrarFormulario ? (
        <Formulario onEnviar={manejarDatosFormulario} />
      ) : (
        <div>
          <h2>Resultados:</h2>
          <p>Datos del formulario: {JSON.stringify(resultado.datosFormulario)}</p>
          <p>Datos del soldado: {JSON.stringify(resultado.datosSoldado)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
