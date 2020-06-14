const {Employee} = require('../Employee/Employee.js')

exports.EmployeeCreable = class{
    constructor(){
    }

    Create(objectCreated){
        return new Employee(objectCreated);
    }
    CreateArray(objectArray){
        let array = [];
        objectArray.forEach((element)=>{
            array.push(element);
        });

        return array;
    }
}