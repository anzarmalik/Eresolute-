var Sequelize = require('sequelize') ;

var sequelize = new Sequelize('artistDb','root','',{
    host:'localhost',
    dialect:'mysql',

});

sequelize.sync({ force:false }) ;


module.exports = sequelize ;