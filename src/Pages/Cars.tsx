import { useState, useEffect } from "react";

import Card from "../components/commons/Card";
import Modal from "../components/commons/Modal";
import useTestContext from "../hooks/useTestContext";
import AddCarForm from "../components/Cars/AddCarForm";

import { DeleteFavoriteCar } from "../services/CartsServices";

import {
  PlusIcon,
  HeartIcon as HeartOutline,
} from "@heroicons/react/24/outline";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import { Car } from "../types";

export default function Cars() {
  const { cars, users, setUsers, setCars } = useTestContext();

  const [isOpen, setIsOpen] = useState(false);
  const [orderFavorites, setOrderFavorites]= useState<Car[]>();

  const [loggedUser] = users.filter((user) => user.id === 1);

  const saveFavorite = (value: number) => {
    if (
      !loggedUser.coches_favoritos.includes(value) &&
      loggedUser.coches_favoritos.length < 3
    ) {
      const newUsers = users.filter((user) => user.id != loggedUser.id);

      const newUser = {
        ...loggedUser,
        coches_favoritos: [...loggedUser.coches_favoritos, value],
      };

      setUsers([...newUsers, newUser]);
    }

    if (
      loggedUser.coches_favoritos.includes(value) &&
      loggedUser.coches_favoritos.length <= 3
    ) { 
    const newFavorites = DeleteFavoriteCar(loggedUser,users,value);
    setUsers(newFavorites);
}

if (
    !loggedUser.coches_favoritos.includes(value) &&
    loggedUser.coches_favoritos.length === 3
    ) {
        toast.error("Limite de favoritos");
    }
};

  const deleteCar = (value: number)=>{
    const newCars = cars.filter((car)=> car.id != value)
    setCars(newCars);

    const newFavorites = DeleteFavoriteCar(loggedUser,users,value);
    
    setUsers(newFavorites);
  }


  useEffect(()=>{
    const lastCars = cars.filter((car)=>!loggedUser.coches_favoritos.includes(car.id))
    const firstCars = cars.filter((car)=>loggedUser.coches_favoritos.includes(car.id))

    setOrderFavorites([...firstCars, ...lastCars])

  },[loggedUser?.coches_favoritos, cars])


  return (
    <>
      <ToastContainer />
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
          {orderFavorites?.map((car) => {
            return (
              <Card className="grid gap-y-2 text-gray-900" key={car.id}>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">{car.nombre}</h1>
                  <button onClick={() => saveFavorite(car.id)}>
                    {!loggedUser.coches_favoritos.includes(car.id) ? (
                      <HeartOutline className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-red-500" />
                    )}
                  </button>
                </div>
                <p>{car.marca}</p>
                <div className="flex justify-start">
                  <button onClick={()=>deleteCar(car.id)} className="px-3 py-2 text-sm font-semibold text-gray-400  hover:text-red-500 ">
                    <TrashIcon className="h-5 w-5"/>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <AddCarForm setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
