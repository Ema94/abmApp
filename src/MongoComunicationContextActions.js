var  { MongoClient } = require('mongodb');
async function  ConnectToDb(mongoParameters){
    let mongo = MongoClient(mongoParameters.urlHost,{ useUnifiedTopology: true })
    const client = await  mongo.connect()
    const db =  client.db(mongoParameters.dbName);
    return db;
}
exports.MongoInsert = class{
    constructor(mongoParameters){
        this.MongoParameters = mongoParameters;
    }
    async Add(comunicationParams){
        const db = await ConnectToDb(this.MongoParameters);
        const result = await db.collection(comunicationParams.collectionName).insertOne(comunicationParams.object);
        return result;
    }
}
exports.MongoUpdate = class{
    constructor(mongoParameters){
        this.MongoParameters = mongoParameters;
    }

    async Modify(comunicationParams){
        const db = await ConnectToDb(this.MongoParameters);
        const result = await db.collection(comunicationParams.collectionName).updateOne(comunicationParams.query,{$set: comunicationParams.object});
        return result;
    }
}
exports.MongoDelete = class{
    constructor(mongoParameters){
        this.MongoParameters = mongoParameters;
    }
  async Delete(comunicationParams){
    const db = await ConnectToDb(this.MongoParameters)
    const result = await db.collection(comunicationParams.collectionName).deleteOne(comunicationParams.query);
    return result;
  }
}
exports.MongoFindOne = class{
    constructor(mongoParameters){
        this.MongoParameters = mongoParameters;
    }

    async Find(comunicationParams){
        const db =  await  ConnectToDb(this.MongoParameters);
        const result = db.collection(comunicationParams.collectionName).findOne(comunicationParams.query);
        return result;  
    }
}
exports.MongoFindMany = class{
    constructor(mongoParameters){
        this.MongoParameters = mongoParameters;
    }

    async Find(comunicationParams){

        const db =  await ConnectToDb(this.MongoParameters);
        const result = db.collection(comunicationParams.collectionName).find(comunicationParams.query).toArray();
        return result;  
    }
}
