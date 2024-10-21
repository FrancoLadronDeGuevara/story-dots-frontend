<h1 align="center" id="title">Coding Challenge - Story Dots Frontend</h1>

<p align="center"><img src="https://res.cloudinary.com/dnlvoza12/image/upload/v1729471515/fs3mmehhwpljocflb2wc.png" alt="project-image"></p>

<p id="description">Este proyecto es un CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de productos. La aplicación permite a los usuarios administrar productos de manera eficiente, incluyendo funcionalidades para añadir, editar, eliminar y listar productos. A continuación se detallan las funcionalidades principales las librerías utilizadas y cómo puedes ejecutar el proyecto localmente.</p>

# 🚀 Demo

[https://story-dots-frontend.vercel.app/](https://story-dots-frontend.vercel.app/)
  
# 🧐 Funcionalidades

- **Interfaz de Usuario Intuitiva**: 
  - Utiliza Material UI para una experiencia de usuario moderna y atractiva, con componentes estilizados y responsivos.

- **Gestión de Productos**:
  - **Crear Producto**: 
    - Formulario para agregar nuevos productos con validaciones.
    - Campos requeridos: 
      - Nombre
      - Descripción
      - Precio
      - Imagen
      - Marca
  - **Leer Productos**: 
    - Visualiza una lista de productos.
    - Opciones de filtrado y búsqueda.
  - **Actualizar Producto**: 
    - Permite editar los detalles de un producto existente.
  - **Eliminar Producto**: 
    - Opción para eliminar un producto con confirmación.

- **Gestión del Estado**: Utiliza Zustand para una gestión de estado global eficiente.

- **Navegación**: Implementa React Router para una navegación fluida.

- **Llamadas HTTP**: Utiliza Axios para realizar solicitudes al servidor.

- **Iconos Personalizables**: Incorpora react-icons para mejorar la interfaz.

- **Desempeño y Responsividad**: Optimizada para diferentes tamaños de pantalla.


# 🛠️ Cómo ejecutar el proyecto en local:

<p>1. Clonar el repositorio:</p>

```
https://github.com/FrancoLadronDeGuevara/story-dots-frontend.git
```

<p>2. Instalar las dependencias:</p>

```
npm install
```

<p>3. Edita el archivo clientAxios.js en la carpeta src/utils y cambia la baseURL:</p>

```
baseURL: "https://story-dots-backend.vercel.app/api"
//Sustitúyela por la URL del backend que vayas a utilizar en tu entorno local o de producción.
```

<p>3. Ejecutar el servidor en modo desarrollo:</p>

```
npm run dev
```

<p>5. El frontend estará corriendo en http://localhost:5173/.</p>
  
# 💻 Librerías utilizadas

El backend utiliza las siguientes dependencias:

*   React: Librería para construir interfaces de usuario.
*   Zustand: Para la gestión del estado global de la aplicación.
*   Material UI: Framework de componentes para React que implementa el diseño de Material Design.
*   Axios: Para realizar solicitudes HTTP.
*   react-icons: Para iconos en la interfaz de usuario.
*   React Router: Para la gestión de rutas en la aplicación.
*   Keen-slider: Un slider/carrousel ligero y flexible para mostrar contenido de forma interactiva.
*   Js-cookie: Utilizada para manejar cookies, ideal para gestionar tokens de autenticación y datos de sesión en el navegador.