exports.ComunicatorDbContext = class {
    constructor(dbObject)
    {
        this.DbObject = dbObject;
    }

    async FindOne (queryable,callback){
        let result = await this.DbObject.FindOne(queryable.CollectionName,queryable.Query);
        callback(result);
    }
    async FindAll(queryable,callback){
        let resut = await this.DbObject.FindAll(queryable.CollectionName,queryable.Query);
        callback(resut);
    }
    update (updatable,callback){
    var result = updatable;
    callback(result); 
   }

    insert (insertable,callback){
        var result = insertable;
        callback(result);
    }

    delete (deletable,callback){
        var result = deletable;
        callback(result);
    }
}

