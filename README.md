
# Project de tareas

en este repositorio se encuentra tanto el backend con expres y node js como el frontend en vue 3 con typescript.




## Deployment

para montar y servir el api/backend ingresar a las carpetas en el siguiente orden:

```bash
  cd firebase-api-striker
  cd functions
  npm install 
```
crea una BD con la tabla tareas de la siguientr forma:
```bash
CREATE TABLE `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `fecha_limite` date DEFAULT NULL,
  `categoria` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

y despues configura de acuerdo a tus opciones de configuracion en el archivo:
```bash
 db.js
 ```

una ves instaladas las dependendias y configutrada la BD
 ejecutar:

 ```bash
  node index.js
```
con esto tendremos el backeend corriendo y puedes visualizar que se esta realizando en el puerto 3000.

## Front-end con (vue) Vuetify & Typescript
acceder a la carpeta fronteendv e instalar las dependencias

 ```bash
  cd fronteendv
  npm install
```
## Front-end con React (React- Material UI) & Typescript
acceder a la carpeta frontend-react e instalar las dependencias

 ```bash
  cd frontend-react
  npm install
```
En ambos frontend para ejecutar el sistema de lado del front:
 ```bash
  npm run dev
```

una ves concluido el proceso puedes correr la aplicacion en la url que te muestra, la cuale sta configurada para ser para VUE
 ```bash
 localhost:8000
```
una ves concluido el proceso puedes correr la aplicacion en la url que te muestra, la cuale sta configurada para ser para REACT
 ```bash
 localhost:5173
```
