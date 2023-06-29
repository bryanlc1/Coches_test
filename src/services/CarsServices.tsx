import { User } from "../types";

export const DeleteFavoriteCar = (loggedUser:User, users:User[], value:number) => {
  const newUsers = users.filter((user) => user.id != loggedUser.id);
  const newFavoriteCars = loggedUser.coches_favoritos.filter(
    (carId) => carId != value
  );

  const newUser = { ...loggedUser, coches_favoritos: newFavoriteCars };

  return [...newUsers, newUser];
};
