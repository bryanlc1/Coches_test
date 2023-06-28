import { useState } from "react";
import Card from "../components/commons/Card";
import Modal from "../components/commons/Modal";
import useTestContext from "../hooks/useTestContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddUserForm from "../components/home/AddUserForm";

export default function Home() {
  const { users, cars } = useTestContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col">
      <div className="my-4 text-gray-800 flex justify-start" >
          <button onClick={() => setIsOpen(true)} className="flex items-center p-2 gap-x-2 rounded-md border border-gray-300">
            <span>
              <PlusIcon className="h-5 w-5" />
            </span>
            <p>Añadir</p>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {users
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((user) => {
              const findCars = cars.filter((car) =>
                user.coches_favoritos.includes(car.id)
              );

              const favoriteCars = findCars.map((car) => (
                <span
                  className="rounded-md px-3 m-2 bg-[#D5D9E2] text-gray-700"
                  key={car.id}
                >
                  {car.nombre}
                </span>
              ));

              return (
                <Card className="grid gap-y-2 text-gray-900" key={user.id}>
                  <h1 className="font-bold">{user.name}</h1>
                  <p>{user.email}</p>

                  <div className="flex flex-wrap">{favoriteCars}</div>
                </Card>
              );
            })}
        </div>
      </section>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <AddUserForm setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
