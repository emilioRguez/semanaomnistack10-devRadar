const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({     // Estructura dentro del BD
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'  // indice para un punto de longitude y latitude
    }
});

module.exports = mongoose.model('Dev', DevSchema);      //Exportando el modelo de mongoDB para Dev