import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const Formulario = ({ onEnviar }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      identificador: "1234A"
    }
  });

  const onSubmit = (data) => {
    onEnviar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Identificador del Accidentado:
        </label>
        <input {...register("identificador")} className="mt-1 p-2 border rounded w-full"  />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Respira?
        </label>
          <label className="mr-4">
            Sí
            <input type="radio" {...register("respira")} value="Sí" className="ml-2" />
          </label>
          <label>
            No
            <input type="radio" {...register("respira")} value="No" className="ml-2" />
          </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Está consciente?
        </label>
          <label className="mr-4">
            Sí
            <input type="radio" {...register("consciente")} value="Sí" className="ml-2" />
          </label>
          <label>
            No
            <input type="radio" {...register("consciente")} value="No" className="ml-2" />
          </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Situación:
        </label>
        <textarea {...register("situacion")} className="mt-1 p-2 border rounded w-full" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          API Key:
        </label>
        <input {...register("apikey")} className="mt-1 p-2 border rounded w-full" />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Enviar
      </button>
    </form>
  );
};

Formulario.propTypes = {
  onEnviar: PropTypes.func.isRequired,
};

export default Formulario;
