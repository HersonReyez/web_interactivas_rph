# Recetario casero
Desarrollado en Laravel + REACT con XAMPP y Composer

## Crear proyecto Laravel

```bash
$ sudo /opt/lampp/lampp start
$ composer create-project laravel/laravel:^12.0 recetario-casero
$ cd recetario-casero
$ npm install
$ php artisan install:api

$ php artisan make:model Receta -m
$ php artisan make:controller RecetaController
$ php artisan make:controller AuthController

```

Verifcamos la conexión a MySQL

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=recetario_casero
DB_USERNAME=root
DB_PASSWORD=
```

## Crear proyecto REACT

```bash
# Instalar react
$ npx create-react-app reactfrontend
$ cd reactfrontend
$ npm i axios bootstrap react-router-dom@6

# Levantar proyecto
$ npm start
```

## Registrarse con un usuario nuevo
![alt text](images/image.png)
![alt text](images/image-1.png)

## Crear un receta
![alt text](images/image-2.png)
![alt text](images/image-3.png)

## Editar receta
![alt text](images/image-4.png)
![alt text](images/image-5.png)

## Eliminr una receta
![alt text](images/image-6.png)
![alt text](images/image-7.png)

## Iniciar sesión con otra cuenta
![alt text](images/image-9.png)
![alt text](images/image-10.png)