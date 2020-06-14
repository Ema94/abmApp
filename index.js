var {ComunicatorDbContext} = require('./src/Comunicator/ComunicationContexts/ComunicatorDB.js');
var {MongoComunication} = require('./src/Comunicator/ComunicationTypes/MongoComunicationObject.js');
var {Queryable} = require('./src/Comunicator/ComunicationContexts/Queryable.js');
var{FactoryOfDb} = require('./src/Factory/ObjectFactoryOfDb.js');
var {EmployeeCreable} = require('./src/Employee/EmployeeCreable.js');

var ComunicationContextFactory = require('./src/Comunicator/ComunicationContexts/ComunicationContextFactory.js');
var FactoryObjectFactory = require('./src/Factory/FactoryObjectFactory.js');
var{FactoryObjectParameters} = require('./src/Factory/FactoryObjectParameters.js');

ObjectId = require('mongodb').ObjectID;
var express = require("express");
var path = require("path");
const { ObjectID } = require('mongodb');

var app = express();
app.get("/employee",async function(req,res){
    let id = req.query.id;
    let queryable =  new Queryable("Employees",{_id:new ObjectID(id)});
    var dbContext = ComunicationContextFactory.MongoDbComunication("mongodb://localhost:27017/","EmployeesDB");
    var objectFactory = FactoryObjectFactory.ObjectDbFactory(new FactoryObjectParameters(dbContext,queryable));
    objectFactory.Create(new EmployeeCreable(),function(obj){
        res.json(obj);
       });
});

app.get("/",async function(req,res){
    let queryable =  new Queryable("Employees",{});
    var dbContext = ComunicationContextFactory.MongoDbComunication("mongodb://localhost:27017/","EmployeesDB");
    var objectFactory = FactoryObjectFactory.ObjectDbFactory(new FactoryObjectParameters(dbContext,queryable));  
    objectFactory.CreateArray(new EmployeeCreable(),function(obj){
    res.json(obj);
   });
  
    
});

app.listen(4000,  async function () {
    console.log('hi 4000');


});