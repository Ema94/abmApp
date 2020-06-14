exports.ObjectFactoryOfDb = class{

    constructor(factoryObject){
        this.ObjectComunicator = factoryObject.ObjectComunicator; 
        this.CreationParams = factoryObject.CreationParams;
    }

    async Create(creable,callback){
            await this.ObjectComunicator.FindOne(this.CreationParams,function(object){
            let result = creable.Create(object);
            callback(result);
        });
       
    }
    async CreateArray(creable,callback){
        await this.ObjectComunicator.FindAll(this.CreationParams,function(object){
            let result = creable.CreateArray(object);
            callback(result);
        });
    }
    
}