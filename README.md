# WarMedAI

Repositorio de WarMedAI Assistant, un asistente médico de guerra impulsado por inteligencia artificial diseñado para entornos de combate. Esta aplicación utiliza tecnologías modernas para proporcionar información y orientación médica rápida.

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/cristianbm-hub/cbm-upv-cto-pf-react
    ```

2. **Instalar dependecias**
    ```bash
    npm install
    ```

3. **Iniciar aplicación**
    ```bash
    npm run dev
    ```

4. Acceder a la Aplicación:
Abra su navegador web y vaya a http://localhost:5173.


## Cómo usar

Rellenar los campos del formulario de la interfaz principal:

* Identificador del accidentado: Este campo no es obligatorio, pero en caso de querer utilizarlo para cruzar datos de la situación actual con datos del hostorial médico de los soldados, se debe intalar el servicio Django de WarMedAI -> https://github.com/cristianbm-hub/cbm-upv-cto-pf-django 

* Campos sobre la situación actual: Rellenar información sobre la situación actual,

* Api Key: Incluir una API Key de OpenAI válida para poder enviar la consulta. En ningún caso tu API Key es almacenada por la plataforma ni nada parecido.