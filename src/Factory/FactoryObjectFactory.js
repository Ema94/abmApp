var {ObjectFactoryOfDb} = require('../Factory/ObjectFactoryOfDb.js');
exports.ObjectDbFactory = function(factoryObjectParameters){
    return new ObjectFactoryOfDb(factoryObjectParameters);
}