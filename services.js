var {EntityManagerContextFactory} = require('./src/EntityManagerContextFactory.js');
var{EntityManagerContextFactoryParameters} = require('./src/EntityManagerContextFactoryParameters.js');

exports.EntityManagerContextService = new EntityManagerContextFactory({urlHost:"mongodb://localhost:27017/",dbName:"EmployeesDB"})
.GetComunicationType(EntityManagerContextFactoryParameters.Mongo);
