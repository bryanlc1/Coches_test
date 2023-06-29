import { usuarios } from "../constants/users.json";

import { DeleteFavoriteCar } from "./CarsServices";

describe("Given a deleteFavoriteCar function", () => {
  test("Return an array of users with the modified favorite cars of the logged user", () => {
    const loggedUser = {
      id: 1,
      name: "Juan",
      email: "juan@akkodis.com",
      coches_favoritos: [2, 3],
    };

    const value = 2;

    const deleteSpy = vi.fn(DeleteFavoriteCar);

    const newUsers = deleteSpy(loggedUser, usuarios, value);

    const returnValue = [
      {
        id: 2,
        name: "María",
        email: "maria@akkodis.com",
        coches_favoritos: [3],
      },
      {
        id: 3,
        name: "Pedro",
        email: "pedro@akkodis.com",
        coches_favoritos: [1, 2],
      },
      {
        id: 1,
        name: "Juan",
        email: "juan@akkodis.com",
        coches_favoritos: [3],
      },
    ];

    expect(newUsers).toEqual(returnValue);
    expect(deleteSpy).toHaveReturned();
  });
});
