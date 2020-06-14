var  { MongoClient } = require('mongodb');

exports.MongoComunication = class {
    constructor(urlHost,dbName){
        this.UrlHost = urlHost;
        this.DbName = dbName;
    }

 async ConnectToDb(){
        let mongo = MongoClient(this.UrlHost,{ useUnifiedTopology: true })
        const client = await  mongo.connect()
        const db =  client.db(this.DbName);
        return db;
    }
 async FindOne(collectionName,query){
    const db =  await  this.ConnectToDb();
    const result = db.collection(collectionName).findOne(query);
    return result;  
 }
 async FindAll(collectionName,query){
        const db =  await  this.ConnectToDb();
        const result = await db.collection(collectionName).find(query).toArray();
        return result;
    }
async Insert(collectionName,object){
    const db = await this.ConnectToDb();
    const result = await db.collection(collectionName).insertOne(object);
    return object;
}
async Update(collection,query,object){
    const db = await this.ConnectToDb();
    const result = await db.collection(collection).updateOne(query,object);
    return object;
 }
 async Delete(collection,query){
     const db = await this.ConnectToDb()
     const result = await db.collection(collection).deleteOne(query);

 }
}