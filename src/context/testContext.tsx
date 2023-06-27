import { createContext,useState, useEffect } from "react";
import { Car, TestContext, User } from "../types";

import carsMock  from "../constants/cars.json";
import usersMock from "../constants/users.json"


const testContext = createContext<TestContext | null>(null);

export const TestProvider = ({
  children,
}: {    
  children?: JSX.Element;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

 function loadData (){
    setUsers(usersMock.usuarios);
    setCars(carsMock.coches);
  }

  useEffect(()=>{
    loadData();
  },[])

  return (
    <testContext.Provider
      value={{ users, setUsers, cars, setCars, loadData }}
    >
      {children}
    </testContext.Provider>
  );
};

export default testContext;
