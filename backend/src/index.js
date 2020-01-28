// importando dependencias
const express = require('express'); // colocar express disponible
const mongoose = require('mongoose'); // colocar mongoose disponible
const cors = require('cors'); // colocar mongoose disponible
const http = require('http'); // lo vamos a extraer de express()

const routes = require('./routes'); // disponibilizando routes
const { setupWebsocket } = require('./websocket');

const app = express(); // creando nuestra aplicacion
const server = http.Server(app); // a partir de ahora el servidor http esta afuera de express

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-zzdeb.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); // para entender requisiciones con cuerpo en formato JSON
app.use(routes);

// Los principales metodos HTTP q se van a utilizar para gestionar recursos de la app van a ser: get, post, put, delete
// get - para listar alguna informacion (unico metodo q puede ser accesado nativamente por el browser)
// post - para crear o salvar alguna informacion
// put - para editar algun recurso
// delete - para eleminar algun recurso

// Tipos de parametros dentro de Express:
// Query Params: request.query (usados para Filtros, ordenacion, paginacion,...) - Usualmente GET
// Route Params: request.params (identificar un recurso en la alteracion o remocion)- Usualmente PUT y DELETE
// Body: request.body (datos para la alteracion o la creacion de un registro) - Usualmente POST y PUT

// app.post('/users', (request, response) => {    // request - enviado por el frontend.  response - resp envida por el servidor.
//     // return response.send('Hello Word');  // envia una respuesta desde el servidor en texto (.send)
//     console.log(request.body);
//     return response.json({ message:'Hello Omnistack' });
// });

server.listen(3333); // puerta de acceso a la app (nuestro servidor)

