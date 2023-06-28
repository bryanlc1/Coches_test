import { useFormik } from "formik";
import useTestContext from "../../hooks/useTestContext";

export default function AddCarForm({
  setIsOpen,
}: {
  setIsOpen: (update: boolean) => void;
}) {
  const { cars, setCars } = useTestContext();


  const lastCar = cars[cars.length - 1];

  const { handleSubmit, handleChange } = useFormik({
    initialValues: { nombre: "", marca: "" },
    onSubmit: (values) => {
      const newCar = {
        ...values,
        id: lastCar.id + 1,
      };
      setCars([...cars, newCar]);
      setIsOpen(false);
    },
  });


  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="">
          <h2 className="text-base font-semibold text-gray-900">Nuevo coche</h2>
        </div>

        <div className="">
          <div className="mt-4 grid grid-cols-1">
            <div className="">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  required
                  name="nombre"
                  onChange={handleChange}
                  className="form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A7B1C5] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label className="text-sm font-medium leading-6 text-gray-900">
                Marca
              </label>
              <div className="mt-2">
                <input
                  name="marca"
                  required
                  onChange={handleChange}
                  className="form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A7B1C5] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#A7B1C5] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7B1C5]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
