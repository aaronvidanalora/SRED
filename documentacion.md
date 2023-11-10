 # Documentacion SRED

 # Requisitos y diagrama de casos de uso 
En la introducción de esta documentación, en la sección El proyecto SRED, en concreto en el apartado Requisitos del proyecto y casos de uso general, hemos definido qué se espera de nuestra aplicación web, a partir de los 'Casos de uso general'.

También hemos dividido todo el trabajo de desarrollo en diferentes versiones, con la intención de que nuestro proyecto esté operativo desde el inicio de su implementación, de manera que conforme evolucione a posteriores versiones, aumentaremos su nivel de funcionalidad.

Por lo tanto, vamos a comenzar por la versión 1.0.

Lo primero es definir los casos de uso para esta versión. Una primera aproximación podría ser la siguiente:

## Casos de uso para la V1.0
Registrar usuario: Un usuario puede registrarse en la plataforma proporcionando su nombre, apellidos, email y contraseña.
Iniciar sesión: Un usuario registrado puede iniciar sesión en la plataforma proporcionando su email y contraseña.
Cerrar sesión: Un usuario puede cerrar su sesión en la plataforma en cualquier momento.
Editar perfil: Un usuario registrado puede editar su perfil, actualizando su nombre, apellidos, email o contraseña.
Ver instalaciones: Un usuario registrado puede ver un listado de instalaciones publicadas por los propietarios.
Publicar instalación: Un usuario con el perfil de propietario puede publicar una instalación y sus horarios proporcionando información como nombre, descripción, imagen representativa, horarios, capacidad, etc.
Editar instalación: Un usuario con el perfil de propietario puede editar una instalación que haya publicado previamente, actualizando su información.
Eliminar instalación: Un usuario con el perfil de propietario puede eliminar una instalación que haya publicado previamente.
Ver/Editar usuarios: Un administrador puede ver una tabla con todos los usuarios que hay registrados y editar la información, incluido el ROL de usuario.
Eliminar usuario: Un administrador puede eliminar cualquier usuario registrado en la plataforma.
