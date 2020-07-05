import React from 'react';
import './App.css';
class EmployeeCards extends React.Component{
  constructor(props){
    super(props);
    
  }
  edit(id){
    this.props.edit(id);
  }
  delete(id){
    this.props.delete(id);
  }
  render(){
    return(<div className="container"><div className="row">{this.props.items.map(item => (
      <div className="col-6">
      <div className="card" style={{width: "18rem;"}}>
        <img src={item.Img} className="card-img-top img-responsive" width={300} height={300} />
        <div className="card-body">
          <h5 className="card-title">{item.Name}</h5>
            <p className="card-text">{item.Desc}</p>
          <button className="btn btn-primary" onClick={()=>this.edit(item._id)}> <img src="https://img.icons8.com/android/24/000000/pencil.png"/></button>
        <button className="btn btn-danger"  onClick={()=>this.delete(item._id)}> <img src="https://img.icons8.com/ios-glyphs/24/000000/xbox-x.png"/></button>
        </div>
      </div>
      </div>
    ))}</div></div>)
  }
}
class EmployeeForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formImgh:"https://cdn.pixabay.com/photo/2012/04/11/10/14/image-27272_1280.png",
      employee:{

        Name:"",
        Age:"",
        Img:"",
        Desc:""
      }
    }
  }
  componentDidMount() {
    if(this.props._id){
      fetch("http://localhost:4000/employees/get?id="+this.props._id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            employee: result,
            formImgh:result.Img
          });
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ) 
    }

  }
  AddCard=()=>{
      let url="http://localhost:4000/employees/post";
 
      if(this.props._id){
          url="http://localhost:4000/employees/put?id="+this.props._id;
      }
      fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
  
        },
        body: JSON.stringify(this.state.employee)
       });
     this.props.goBack();
    };

change(img,name,age,desc){
       this.setState({
        formImgh: img,
        employee:{
          Img:img,
          Name:name,
          Age:age,
          Desc:desc
        }
       });
  }


  render(){
    return(<div className="container">
    <form onSubmit={this.AddCard}>
  
          <img src={this.state.formImgh} width={300} height={400} />

          <div className="form-group">
            <label htmlFor="img">Imagen</label>
            <input className="form-control" value={this.state.employee.Img} id="img" type="text"  onChange={e=>this.change(e.target.value,this.state.employee.Name,this.state.employee.Age,this.state.employee.Desc)}/>
          </div>
        
      
          <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input className="form-control" value={this.state.employee.Name}  id="name" type="text"  onChange={e=>this.change(this.state.employee.Img,e.target.value,this.state.employee.Age,this.state.employee.Desc)}/>
          </div>
          <div className="form-group">
            <label htmlFor="age">Edad</label>
            <input className="form-control"  value={this.state.employee.Age} id="age" type="text"  onChange={e=>this.change(this.state.employee.Img,this.state.employee.Name,e.target.value,this.state.employee.Desc)} />
          </div>          
       
        
        <div className="form-group">
          <label htmlFor="desc" >Descripcion</label>
          <input className="form-control"  value={this.state.employee.Desc} id="desc" type="text"  onChange={e=>this.change(this.state.employee.Img,this.state.employee.Name,this.state.employee.Age,e.target.value)}/>
        </div>
        
        <input type="submit" value="Agregar o Editar"/>

      </form>
    </div>);
  }

}
class EmployeeAbm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items:[],
      loadEditForm:false,
      employeeId:""
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/employees")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  handledelete=(id)=>{
    fetch("http://localhost:4000/employees/delete?id="+id);
    window.location.reload();

  }
  handleEdit=(id)=>{
    this.setState({
      employeeId:id,
      loadEditForm:true
    })
   }
  goForm = ()=>{
    this.setState({
      loadEditForm:true
    })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if(this.state.loadEditForm === false){
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (<div>
          <button className="btn btn-success" onClick={this.goForm}>Add Employee</button>
                <EmployeeCards edit={this.handleEdit} delete={this.handledelete} items={this.state.items}/> 
                
                </div>)
        }
    }else{
      return(<EmployeeForm _id={this.state.employeeId}/>)
    }
    

    }

}
class LateralMenu extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    return(<ul class="nav flex-column">
   <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul>)}
}
class NavVar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(<nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">Empleados</a>
  </nav>)
  }
}

class Footer extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(<footer class="page-footer font-small blue">
    <div class="footer-copyright text-center py-3">© 2020 Copyright:
      <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
    </div>
  
  </footer>)
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      goRender:false,
      renderAddView:false
      
    };
  }
  

  render(){
        return(<div className="row">
          <div className="col-12 border border-primary">
            <NavVar/>
          </div>
          <div className="col-12 border border-primary">
          <LateralMenu/>
          </div>  
          <div className="col-6">
          <EmployeeAbm action={this.goForm}/>
          </div>
          <div className="col-12 border border-primary">
          <Footer/>
          </div>
          
          </div>);
        }
}
 
export default  App;
