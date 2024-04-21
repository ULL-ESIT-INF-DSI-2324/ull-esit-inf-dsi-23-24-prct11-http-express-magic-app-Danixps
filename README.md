# PRÁCTICA 11 : Aplicación Express para coleccionistas de cartas Magic

*Nombre y apellidos: [Daniel Bensa Expósito Paz](https://github.com/Danixps?tab=repositories, "Enlace Github")*

*Asignatura: Desarrollo de Sistemas Informáticos (DSI)*

## Explicación
Para resumir un poco lo realizado en la práctica:

_Importando Express y Tipos_: Al principio del código, importo el módulo Express y los tipos Request y Response desde Express. Esta es una práctica común en el desarrollo de aplicaciones web con Node.js y Express. Al importar estos módulos y tipos, puedo aprovechar las funcionalidades proporcionadas por Express para manejar solicitudes HTTP de manera eficiente y enviar respuestas adecuadas a los clientes.


_Importando Funciones Relacionadas con Cartas:_ A continuación, importo varias funciones y tipos desde otro archivo llamado index.js. Estas funciones están relacionadas con operaciones sobre cartas, como añadir, eliminar, modificar y mostrar. Separar estas funciones en un archivo aparte ayuda a modularizar el código y mantenerlo organizado. Además, al importar solo las funciones necesarias, puedo reducir el acoplamiento entre los diferentes componentes de mi aplicación.


_Creando una Instancia de la Aplicación Express:_ Después de importar los módulos y funciones necesarios, creo una instancia de la aplicación Express utilizando la función express(). Esta instancia representa mi aplicación web y me permite definir rutas y middleware para manejar las solicitudes HTTP entrantes.


_Definiendo Rutas y Manejadores de Solicitudes:_ Utilizo los métodos get, post, delete y patch de la instancia de la aplicación Express para definir diferentes rutas y los correspondientes manejadores de solicitudes para cada ruta. Por ejemplo, para la ruta /cards con el método GET, defino una función que maneja la solicitud y muestra información sobre las cartas. Para la ruta /cards con el método POST, defino una función que maneja la solicitud y añade una nueva carta a la colección.


_Manejo de Solicitudes y Respuestas:_ Dentro de cada manejador de solicitudes, accedo a los datos de la solicitud, como parámetros de consulta o datos en el cuerpo de la solicitud, utilizando el objeto req (Request). Luego, realizo operaciones correspondientes, como agregar, eliminar o modificar cartas, utilizando las funciones importadas desde index.js. Finalmente, envío una respuesta al cliente utilizando el objeto res (Response), estableciendo el código de estado HTTP y enviando datos o mensajes relevantes.


_Iniciando el Servidor Express:_ Por último, inicio mi servidor Express llamando al método listen() en la instancia de la aplicación Express y especificando el puerto en el que quiero que mi servidor escuche las solicitudes entrantes. Al hacerlo, mi servidor Express está listo para recibir y manejar solicitudes HTTP.

*Defino varias rutas para manejar diferentes tipos de solicitudes HTTP:*

#### GET
Para la ruta /cards con el método GET, defino una función para manejar la solicitud. Esta función extrae información como el usuario y el ID de la carta de la solicitud y luego llama a la función correspondiente para mostrar las cartas.

#### POST
Para la ruta /cards con el método POST, defino una función para manejar la solicitud. Esta función extrae los datos de la carta del cuerpo de la solicitud y luego llama a la función correspondiente para añadir la carta a la colección.

#### DELETE
Para la ruta /cards con el método DELETE, defino una función para manejar la solicitud. Esta función extrae el ID de la carta y el usuario de la solicitud y luego llama a la función correspondiente para eliminar la carta de la colección.

#### PATCH
Para la ruta /cards con el método PATCH, defino una función para manejar la solicitud. Esta función extrae los datos de la carta del cuerpo de la solicitud y luego llama a la función correspondiente para modificar la carta en la colección.

## Ejemplo de Uso 

### GET: http://localhost:3001/cards?user=edusegre o http://localhost:3001/cards?user=edusegre&id=2

### POST: http://localhost:3001/cards?id=100&user=edusegre&name=danixps&manaCost=12&color=negro&type=tierra&rarity=rara&rulesText=carta1&marketValue=1

### DELETE: http://localhost:3001/cards?user=edusegre&id=1 

### PATCH: http://localhost:3001/cards?id=100&user=danixps&name=DarkLion&manaCost=120&color=negro&type=tierra&rarity=rara&rulesText=carta1&marketValue=1


[![Tests](https://github.com/Danixps/ULL-DSI-P10/actions/workflows/node.js.yml/badge.svg)](https://github.com/Danixps/ULL-DSI-P10/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/Danixps/ULL-DSI-P10/badge.svg?branch=main)](https://coveralls.io/github/Danixps/ULL-DSI-P10?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Danixps_ULL-DSI-P10&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Danixps_ULL-DSI-P10)

