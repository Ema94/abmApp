exports.ObjectFactory = class{
    constructor(){ 
          this.Types=[];
        }
    SetType(type){
        this.Types.push(type);
    }
    GetComunicationType(type){
        if(typeof(type) ==="undefined"){
           throw("factory type can not be null");
        }

        let object = this.Types.find((x)=>{return x.Type==type}).Object;
        
        if(typeof(object) ==="undefined"){
            throw("the factory type is invalid");
         }

        return object;
    }
}