# Link-Importantes - Proyecto Personal

## Descripción

**Link-Importantes** es una aplicación desarrollada con un frontend en **React** y **JavaScript**, y un backend en **Java** con **MongoDB**. La aplicación te permite gestionar enlaces importantes como si fuera una agenda digital, facilitando la búsqueda por temas.

### Funcionalidades principales

1. **Ingreso de Datos**: Permite guardar enlaces categorizados por área, lenguaje, título y otros detalles.
2. **Búsqueda de Enlaces**: Busca enlaces por área, título, lenguaje, descripción, o ejemplo.
3. **Gestión de Enlaces**: Permite editar o borrar (borrado lógico) los enlaces directamente desde la tabla de resultados.

---

## Formulario "Ingreso de Datos"

El formulario inicial ofrece las siguientes opciones:

- **Área**: Selecciona el área a la que pertenece el enlace, como Plataformas, Imágenes, Íconos, Métodos, Sitios Web, Educación, etc. Este menú se puede modificar agregando o eliminando entradas en el archivo `constantes.ts`.
- **Título**: Especifica un título que facilite la búsqueda posterior del enlace.
- **Lenguaje**: Indica el lenguaje de programación al que está relacionado o que soporta el recurso.
- **Capa gratuita**: Selecciona esta casilla si el recurso es gratuito.
- **Link de acceso**: Introduce la URL del recurso.
- **Descripción**: Añade una breve descripción del recurso, con detalles o aclaraciones.
- **Ejemplo**: Si es aplicable, agrega un ejemplo para ilustrar el uso del recurso.

**Botón Guardar**: Valida los datos ingresados y guarda la información en la base de datos.

---

## Formulario "Búsqueda de Elementos"

Para realizar una búsqueda, deberás ingresar inicialmente un tema (área, título, lenguaje, link de acceso, descripción o ejemplo). Después de esto, podrás introducir palabras clave para realizar una búsqueda más precisa entre los enlaces almacenados.

---

## Tabla de Resultados

Una vez que se despliegue la tabla con los resultados encontrados, tendrás las siguientes opciones para cada enlace:

- **Editar**: Puedes modificar los datos de cualquier campo directamente desde la tabla.
- **Borrar**: Permite realizar un borrado lógico del elemento, es decir, el enlace no se eliminará físicamente de la base de datos, pero no aparecerá en futuras búsquedas.

---

## Instalación y Ejecución

### Requisitos

- **Java** >= 21.x
- **MongoDB**

### Clonar el Repositorio

1. Abre la consola y navega al directorio donde deseas clonar el repositorio.
2. Ejecuta el siguiente comando:

   ```bash
   git clone https://github.com/Is2095/React_Java_Link.git
   ```

Esto descargará tanto el repositorio del backend como el del frontend.

---

## Instalación

Abre el proyecto en tu editor de preferencia:

* **Frontend:** Usa Visual Studio Code (o tu editor preferido).
* **Backend:** Usa IntelliJ IDEA (o tu editor preferido).

### Instalación de dependencias
* **Frontend:** Ejecuta el siguiente comando en la consola:
  ```bash
  npm install
  ```
En el Backend, agrega la siguiente configuración en el archivo application.properties:

```
server.port=3001
spring.data.mongodb.uri=mongodb://127.0.0.1:27017/linkimportantes
```

Esto configurará el puerto del servidor y la conexión a la base de datos.

---

## Ejecución

Levanta el frontend con el comando:

```
npm run dev
```

Levanta el backend desde tu entorno de desarrollo (por ejemplo, IntelliJ IDEA).

Abre tu navegador y accede a la aplicación en: http://localhost:5173.


---

## Contribuciones
Si deseas contribuir a este proyecto, siéntete libre de hacer un fork, crear un branch y luego enviar un pull request con tus sugerencias o mejoras.
