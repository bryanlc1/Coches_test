import json
import argparse

def add_user(users, new_user):
    last_id = max(user['id'] for user in users) if users else 0
    new_user['id'] = last_id + 1

    coches_favoritos = []
    for _ in range(3):
        coche_id = input("Ingrese el id del coche favorito: ")
        if coche_id:
            coches_favoritos.append(int(coche_id))
    
    new_user['coches_favoritos'] = coches_favoritos
    
    users.append(new_user)
    save_data(users)
    print("Usuario añadido exitosamente.")

def delete_user(users, user_id):
    for user in users:
        if user['id'] == user_id:
            users.remove(user)
            save_data(users)
            print("Usuario eliminado exitosamente.")
            return
    print("Error: El usuario no existe.")

def add_car_to_user(users, car_id, user_id):
    for user in users:
        if user['id'] == user_id:
            if car_id in user['coches_favoritos']:
                print("Error: El coche ya está asignado como favorito.")
                return
            if len(user['coches_favoritos']) == 3:
                print("Error: Ya hay un maximo de favoritos")
                return
            
            user['coches_favoritos'].append(car_id)
            save_data(users)
            print("Coche añadido como favorito exitosamente.")
            return
    print("Error: El usuario no existe.")

def delete_car_from_user(users, car_id, user_id):
    for user in users:
        if user['id'] == user_id:
            if 'coches_favoritos' in user and car_id in user['coches_favoritos']:
                user['coches_favoritos'].remove(car_id)
                save_data(users)
                print("Coche eliminado de la lista de favoritos exitosamente.")
                return
            print("Error: El coche no está asignado como favorito.")
            return
    print("Error: El usuario no existe.")

def save_data(users):
    data = {"usuarios": users}
    with open('users.json', 'w') as file:
        json.dump(data, file, indent=4)

userValid=False

def validateUser(user):
    if len(user["name"]) == 0:
         global userValid
         userValid = False
         return userValid
    else: 
        userValid = True
        return userValid

def main():
    parser = argparse.ArgumentParser(description='Gestión de usuarios y sus coches favoritos')
    parser.add_argument('--add', action='store_true', help='Añadir un nuevo usuario')
    parser.add_argument('--delete', type=int, help='Eliminar un usuario por id')
    parser.add_argument('--add_car', nargs=2, type=int, help='Añadir un coche como favorito a un usuario (car_id user_id)')
    parser.add_argument('--delete_car', nargs=2, type=int, help='Eliminar un coche de la lista de favoritos de un usuario (car_id user_id)')

    args = parser.parse_args()

    with open('users.json') as file:
        data = json.load(file)
        users = data['usuarios']
        

    if args.add:
        while not userValid:
            new_user = {
            'name': input('Nombre del usuario: '),
            'email': input('Email del usuario: '),
            }
            valido = validateUser(new_user)

            if not valido:
                print("Error: El campo 'nombre' no puede estar vacio")
            
        add_user(users, new_user)
    elif args.delete:
        delete_user(users, args.delete)
    elif args.add_car:
        add_car_to_user(users, args.add_car[0], args.add_car[1])
    elif args.delete_car:
        delete_car_from_user(users, args.delete_car[0], args.delete_car[1])
    else:
        print("Error: Por favor, usa --add, --delete, --add_car o --delete_car")

if __name__ == '__main__':
    main()

