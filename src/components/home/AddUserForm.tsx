import { useFormik } from "formik";
import useTestContext from "../../hooks/useTestContext";
import { useState } from "react";

export default function AddUserForm({
  setIsOpen,
}: {
  setIsOpen: (update: boolean) => void;
}) {
  const { users, setUsers, cars } = useTestContext();

  const lastUser = users[users.length - 1];

  const [selectCars, setSelectCars] = useState<number[]>([]);


  const { handleSubmit, handleChange } = useFormik({
    initialValues: { name: "", email: "", coches_favoritos: [] },
    onSubmit: (values) => {
      const newUser = {
        ...values,
        id: lastUser.id + 1,
        coches_favoritos: selectCars,
      };
      setUsers([...users, newUser]);
      setIsOpen(false);
    },
  });

  const handleSelectCars = (value: number) => {
      if (!selectCars.includes(value) && selectCars.length < 3) {
          setSelectCars([...selectCars, value]);
        } else {
            const newSelects = selectCars.filter((cars) => cars != value);
            setSelectCars(newSelects);
        }
    };


  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="">
          <h2 className="text-base font-semibold text-gray-900">Nuevo usuario</h2>
        </div>

        <div className="">
          <div className="mt-4 grid grid-cols-1">
            <div className="">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  required
                  name="name"
                  onChange={handleChange}
                  className="form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A7B1C5] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  onChange={handleChange}
                  className="form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A7B1C5] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                Coches favoritos (max 3)
              </label>
              <div className="flex flex-wrap">
                {cars.map((car) => {
                    const selectCarsIsFull = selectCars.includes(car.id);
                  return (
                    <div className="relative flex m-2 gap-x-2">
                      <div className="flex h-6 items-center">
                        <input
                          value={car.id}
                          checked={selectCarsIsFull}
                          onChange={() => handleSelectCars(car.id)}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#A7B1C5] focus:ring-[#A7B1C5]"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="comments" className="text-gray-900">
                          {car.nombre}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
        onClick={()=>setIsOpen(false)}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#A7B1C5] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#A7B1C5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}
