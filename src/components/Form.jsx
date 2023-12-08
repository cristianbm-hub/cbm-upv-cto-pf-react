import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const Formulario = ({ onEnviar }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      //identificador: "1234A"
    }
  });

  const onSubmit = (data) => {
    onEnviar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow dark:bg-neutral-800 dark:text-white">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          Identificador del Accidentado:
        </label>
        <input {...register("identificador")} className="mt-1 p-2 border rounded w-full dark:bg-neutral-700"  />
      </div>

      <div className="mb-4 text-gray-600">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          Respira?
        </label>
          <label className="mr-4 dark:text-white">
            Sí
            <input type="radio" {...register("respira")} required value="Sí" className="ml-2" />
          </label>
          <label className="dark:text-white">
            No
            <input type="radio" {...register("respira")} value="No" className="ml-2" />
          </label>
      </div>
      <div className="mb-4 text-gray-600">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          Está consciente?
        </label>
          <label className="mr-4 dark:text-white">
            Sí
            <input type="radio" {...register("consciente")} required value="Sí" className="ml-2" />
          </label>
          <label className='dark:text-white'>
            No
            <input type="radio" {...register("consciente")} value="No" className="ml-2" />
          </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          Situación:
        </label>
        <textarea {...register("situacion")} required className="mt-1 p-2 border rounded w-full dark:bg-neutral-700" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          API Key OpenAI:
        </label>
        <input {...register("apikey")} className="mt-1 p-2 border rounded w-full dark:bg-neutral-700" />
      </div>

      <button type="submit" className="bg-emerald-900 text-white px-4 py-2 rounded hover:bg-emerald-800">
        Enviar
      </button>
    </form>
  );
};

Formulario.propTypes = {
  onEnviar: PropTypes.func.isRequired,
};

export default Formulario;
