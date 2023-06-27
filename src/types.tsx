export type Car = {
  id: number;
  nombre: string;
  marca: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  coches_favoritos: number[];
};

export type TestContext = {
  users: User[];
  cars: Car[];
  setCars: (cars: Car[]) => void;
  setUsers: (users: User[]) => void;
  loadData: () => void;
};
