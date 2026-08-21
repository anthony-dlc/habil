# Framework to build an APP:

## 1- Define el problema en una frase:

1.	Que hace el sistema?

  - El sistema te permite administrar las deudas de tu clientes y mantener los estados de los mismos, permitiendote crear,editar,eliminar clientes y te permite poder crear,editar y eliminar deudas y abonos de los mismos clientes.

2.	Para quien?

  - Este sistema es para mi tia quien tiene un negocio y que utiliza su cuaderno para llevar track de los fiados/deudas y abonos de sus clientes.

3.	Que problema resuelve?

  - Le permite darle un mayor seguimiento a los clientes.
  - Le permite mantener todo guardado y organizado.
  - Le permite saber cuanto le deben, cuanto le han abonado, cuanto es de ganancia y cuanto le falta por pagar.
  - Le permite registrar nuevos clientes y llevar seguimiento sobre sus deudas y abonos.

## 2- Identificar las entidades (Los sustantivos): 

1.	Lista los objetos del mundo real que el sistema maneja.

- Usuario.
- Cliente.
- Deuda.
- Abono.

## 3- Define atributos de cada entidad:

1.	Para cada entidad: 

  a.	Que datos tiene?
  i.	Ex: Nombre, Fecha, Estado, Cantidad, Relación con otras entidades.

- Usuario: Nombre, Correo, Contraseña, ID.
- Cliente: Nombre, ID, Track.
- Deuda: Producto, Precio de compra, Precio de venta, Id, Sumplidor, fecha.
- Abono: Producto, Cantidad, Suplidor al que se le abona fecha.

## 4- Identifica comportamientos (Los Verbos):

1.	Que acciones puede hacer o recibir cada entidad?

- Usuario: 
  - Crear cuenta.
  - Crear cliente.
  - Editar cliente.
  - Eliminar cliente.

- Cliente:
  - Crear Deuda/Abono.
  - Editar Deuda/Abono.
  - Eliminar Deuda/Abono.

- Deuda: Esqueleto para que cliente cree una deuda.
- Abono: Esqueleto para que cliente cree un abono.

## 5- Mapea relaciones entre entidades:
1.	Una entidad tiene muchas de otra (uno o muchos)? 
2.	Hay herencia real ( Comparten comportamiento -> clase base) o es mejor composición?
3.	Que entidad depende de cual?

Hay 4 entidades diferentes, usuario,cliente,deuda,abono
- Usuario puede manipular Cliente.
- Cliente puede manipular Deuda y Abono.

## 6- Define el flujo de datos:
1.	Como entra la información (Formulario, import, api)?

- Usuario -> Se crea un usuario a traves de un formulario para crear un usuario.
- Cliente -> Usuario crea un cliente a traves de un formulario.
- Deuda -> cliente crea deuda a traves de un formulario.
- Abono -> cliente crea abono a traves de un formulario.

2.	Como se persite(localStorage, base de datos, archivo)?

- Usuario -> Cuando se crea un usuario de guarda en supabase.
- Cliente -> Cuando Usuario manipula un cliente se gestiona a traves de supabase.
- Deuda/Abono -> Cuando Cliente manipula Deuda/Abono se gestiona a traves de supabase.

3.	Cuando se guarda: cada acción, o al final de una secion?

- Usuario se crea, despues de verificar que el usuario es valido se guarda en supabase.
- Usuario crea cliente, despues de verificar que toda la informacion es valida se guarda en supabase.
- Cliente crea Deuda/Abono, despues de verificar que toda la informacion es valida se guarda en supabase.

## 7- Escribe los casos de uso principales:

1.	“Usuario hace x” -> que pasa paso a paso, que clase/métodos se llaman en que orden. 3-5 casos de uso bien definidos cubren la mayoría de la lógica real.

Usuario Crea Cliente:
  - Escribir informacion del Cliente.
  - Verificar que todos los campos esten validos.
  - Guardar Cliente en supabase.

Usuario Elimina Cliente:
  - Obtener Id del Cliente.
  - Buscar cliente por Id en supabase.
  - Eliminar cliente por Id de Supabase.

Usuario Edita Cliente:
  - Obtener Id del cliente.
  - Buscar cliente por Id en supabase.
  - Mostrar formulario para editar.
  - Agregar nuevos datos del cliente con el mismo Id a supabase.
  - Guardar Cliente en supabase.

Cliente Crea Deuda/Abono:
  - Escribir informacion de Deuda/Abono.
  - Verificar que los campos esten validos.
  - Agregar Deuda/Abono al track del cliente en supabase.

Cliente Elimina Deuda/Abono:
  - Obtener Id de Deuda/Abono.
  - Buscar en supabase Id de Deuda/Abono.
  - Eliminar por Id Deuda/Abono.

Cliente Edita Deuda/Abono:
  - Obtener Id de Deuda/Abono.
  - Buscar en supabase Id de Deuda/Abono.
  - Eliminar por Id Deuda/Abono.

## 8- Identifica casos limites:
1.	Que pasa si se repite una acción? Si se borra algo que tiene dependencias? Si un dato falta o es invalido?

- Aqui no hay muchos casos limites, posiblemente se ponen restricciones cuando se necesitan algunos datos y se muestran errores cuando sean necesarios. 

## 9- Ahora si, a código:
Con 1-8 resueltos en papel o markdown, ya tienes el mapa completo. Aquí es donde tiene sentido delegar en una ia la implementación de piezas especificas – porque ya sabes exactamente que  necesitas y puedes verificar si el resultado es correcto.

Nota de uso:
Este framework funciona mejor cuando cada paso se resuelve antes de avanzar al siguiente.






- El padre es donde vive los clientes y es quien los muestras.
- Cliente muestra el perfil del cliente actual.
- Deuda/Abono 