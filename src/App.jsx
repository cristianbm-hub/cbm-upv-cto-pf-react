import React, { useState } from 'react';
import './App.css';
import Formulario from './components/Form.jsx';
import ReactMarkdown from 'react-markdown';

// Cambia 'TU_API_KEY' por la clave de API de ChatGPT
let apiKey = '';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  const [respuesta, setRespuesta] = useState('');

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
        temperature: 0.2,
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

      let prompt = `
      Estamos en asistencia medica de guerra,
      Tu eres un médico experto en el campo de batalla,
      Hay un soldado herido,
      Nació el año ${data.fecha_nacimiento},
      Con grupo sanguineo ${data.grupo_sanguineo},
      consciente: ${datos.consciente},
      respira: ${datos.respira},
      Con alergias ${data.alergias},
      Con condiciones medicas ${data.condiciones_medicas},
      Actualmente con la siguiente situación: ${datos.situacion},
      que deberia hacer? Actua como un verdadero medico.
      No hay servicio medico disponible.
      Sé que eres un modelo de inteligencia artifial y seria preferible consultar con un medico, 
      pero en tu respuesta solamente dime que deberia hacer, sé claro y conciso. 
      Insisto, solo dame los puntos con lo que debo hacer sin introducción ni conclusión, Contestame en segunda persona, 
      dirigiendote a mi. Pon en negrita las palabras más importantes. Dame instrucciones precisas. 
      Devuelve tu respuesta en formato MD como una lista de las instruscciones numeradas por orden, indica los saltos de linea con '\n'.
      Gracias
      `;

      console.log('Datos del prompt:', prompt);

      handleEnviarPregunta(prompt);

      setRespuesta('Esperando respuesta...');

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
          <br />
          <h1>WarMedAI:</h1>
          <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow">
            <ReactMarkdown>{respuesta}</ReactMarkdown>
          </div>
          <br />
          <a href="#" onClick={() => {setMostrarFormulario(true); setRespuesta()}} style={{ textDecoration: 'underline' }}>
            ⇤ Otra consulta
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
