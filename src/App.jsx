import React, { useState } from 'react';
import './App.css';
import Formulario from './components/Form.jsx';

// Cambia 'TU_API_KEY' por la clave de API de ChatGPT
let apiKey = '';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  const [respuesta, setRespuesta] = useState('Esperando respuesta...');

  //imprimir en consola la respuesta cuando se actualice
  React.useEffect(() => {
    console.log('Respuesta:', respuesta);
  }, [respuesta]);

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
      return { error: 'No se pudo obtener datos del servidor' };
    }
  };

 
  const handleEnviarPregunta = async (prompt) => {
    try {
      console.log('Pregunta:', prompt);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
           messages: [
          { role: 'system', content: 'You are a military medical AI providing guidance to a wounded soldier.' },
          { role: 'user', content: prompt },
        ],
        }),
      });

      const data = await response.json();
      setRespuesta(data.choices[0]?.message?.content || 'No hay respuesta');

    } catch (error) {
      console.error('Error al enviar la pregunta:', error);
      setRespuesta('Error al enviar la pregunta');
    }
  };

  const manejarDatosFormulario = (datos) => {
    const data_soldado = fetchData(datos.identificador);
    //API key chatgpt
    apiKey = datos.apikey;

    data_soldado.then((data) => {
      
      console.log('Datos del formulario:', datos);
      console.log('Datos del soldado:', data);
      
      const data_prompt_soldado = 'nombre del soldado: '+data.nombre;

      console.log('Datos del prompt:', data_prompt_soldado);

      handleEnviarPregunta('solamente dime como se llama el siguiente soldado: '+data_prompt_soldado);

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
          <h2>WarMedAI:</h2>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}

export default App;
