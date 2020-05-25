var  employeeFactory = require('./src/employeeFactory.js');
var express = require("express");
var path = require("path");

var app = express();

app.get("/",function(req,res){
    //res.sendFile(path.join(__dirname,"/view/index.html"));
    var factory = new employeeFactory.employeeFactory();
    var toget =  factory.getAll();
   // console.log(JSON.stringify(toget));
    res.json(toget)
});

app.listen(4000,  function () {
    console.log('hi 4000');

});