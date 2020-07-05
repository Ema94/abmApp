var{MongoInsert,MongoUpdate,MongoDelete,MongoFindOne,MongoFindMany} = require('./MongoComunicationContextActions.js');
var{EntityManagerContext} = require('./EntityManagerContext.js');
var {ObjectFactory}= require('./ObjectFactory.js');
var{EntityManagerContextFactoryParameters} = require('./EntityManagerContextFactoryParameters.js');
 MongoEntityManager = function(contextBuilder){
    let config = {
        Finder: new MongoFindOne(contextBuilder),
        FinderMany: new MongoFindMany(contextBuilder),
        Adder: new MongoInsert(contextBuilder),
        Modifyer: new MongoUpdate(contextBuilder),
        Deleter: new MongoDelete(contextBuilder)
    }
    return new EntityManagerContext(config);
}


exports.EntityManagerContextFactory = class extends ObjectFactory {
    constructor(contextBuilder){       
        super(contextBuilder);
        super.SetType({
            Type: EntityManagerContextFactoryParameters.Mongo,
            Object:MongoEntityManager(contextBuilder)
        });      
    }
    

}