exports.EntityManagerContext = class{
    constructor(contextBuilder){
        this.contextBuilder = contextBuilder;
        this.Object = {};
        
    }
    
    async Find(comunicationParams,callback){
        var result = await this.contextBuilder.Finder.Find(comunicationParams);
        this.Object = result;
        return callback(this);
      
    }
    
    async FindMany(comunicationParams,callback){
        var result = await this.contextBuilder.FinderMany.Find(comunicationParams);
        this.Object = result;
        return callback(this);
      
    }

    async Add(comunicationParams,callback){
        var result = await this.contextBuilder.Adder.Add(comunicationParams);
        this.Object = result;
        return callback(this);
    }

    async Modify(comunicationParams,callback){
       var result = await this.contextBuilder.Modifyer.Modify(comunicationParams);
       this.Object = result;
       return callback(this);
        
    }

    async Delete(comunicationParams,callback){
       var result = await this.contextBuilder.Deleter.Delete(comunicationParams);
       this.Object = result;
       return callback(this);
    }
}


