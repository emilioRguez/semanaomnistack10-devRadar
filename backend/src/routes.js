const { Router } = require('express');      //importando apena el modulo de enrutamiento de express ({})
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes; // exportando la ruta para la visibilidad por los demas archivos.