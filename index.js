var {EntityManagerContextService} = require('./services.js')
const { ObjectID } = require('mongodb');
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var queryable = {collectionName:'Employees',query:{}};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.get("/employees/get",function(req,res){
    let id = req.query.id;
    queryable.query={_id:new ObjectID(id)};
    EntityManagerContextService.Find(queryable,function(obj){
        res.json(obj.Object);
    });
    
});
app.get("/employees",function(req,res){
    queryable.query={};
    EntityManagerContextService.FindMany(queryable,function(obj){
        res.json(obj.Object);
    });
  
    
});
app.post('/employees/post',function(req,res){ 
   
    queryable.object = req.body;
    EntityManagerContextService.Add(queryable, function(){
    res.json('ok');
 });
});
app.get('/employees/delete',function(req,res){ 
    let id = req.query.id;

    queryable.query ={_id:new ObjectID(id)};

    EntityManagerContextService.Delete(queryable, function(){
        res.redirect('/employees');
  });
});
app.post('/employees/put',function(req,res){
    let employee =req.body;

    let id = req.query.id;
    
    queryable.query ={_id:new ObjectID(id)};

    queryable.object =employee;   

    EntityManagerContextService.Modify(queryable, function(){
    res.redirect('/employees');
    });
});
app.listen(4000,  async function () {
    console.log('hi 4000');
   
});