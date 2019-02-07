var Sequelize = require('sequelize');
var sequelize = require('../db _config/db');


var user = sequelize.define('artistTable',{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

artist:{
    type: Sequelize.STRING,

},
filename:{
    type:Sequelize.STRING,
}

});

module.exports = user ;