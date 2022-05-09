### APLICACION DEMO PARA FACTURACION

#### Flujo:
1. Se ingresa una factura, la cual tiene una segmentación por tipo desde la UI. Inmediatamente el usuario recibe un feedback de factura enviada a través de un Modal.
2. La UI recolecta la información y la envía al BFF.
3. El BFF envía a la cola de mensajes las facturas.
4. Microservicios
4.1. El microservicio de facturas almacena las facturas de acuerdo con el tipo indicado.
4.2. El microservicio de correo enviara un correo de factura enviada correctamente con
mínimo detalle de nombre, detalle factura, hora ingreso.


**El Stack usado**
- Frontend
   React JS con TS (Componentes funcionales)
- Backend
  Node con TS
  Express JS con TS
- MQ
  Kafka o RabbitMQ (Docker)
- BD
  MongoDB (Docker)

**Requerimientos para ejecutar la aplicacion**
- Docker
- Docker Compose

**Para ejecutar la aplicacion**
`
docker-compose up -d
`

El frontend de esta aplicacion se ejecuta en el http://localhost:3000/