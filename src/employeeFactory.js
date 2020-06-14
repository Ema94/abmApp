const file = require("fs");
const path = require("path");
const emp = require("../model/Employee/employee.js");
exports.employeeFactory = class{
  getAll() {
     var data = file.readFileSync("./src/employeeData.json");
     let array = JSON.parse(data);
     var employees = new Array();
     array.forEach(element => {
         employees.push(new emp.employee(element));
     });
     return employees;
   
  }
}
