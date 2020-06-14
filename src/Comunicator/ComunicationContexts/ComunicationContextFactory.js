var{MongoComunication} = require('../ComunicationTypes/MongoComunicationObject.js');
var {ComunicatorDbContext} = require('../ComunicationContexts/ComunicatorDB.js');
exports.MongoDbComunication = function(hostName,dbName){
    return new ComunicatorDbContext(new MongoComunication(hostName,dbName));
}