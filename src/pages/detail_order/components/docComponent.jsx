import React, { Component , useState, useEffect} from 'react';
import { useShoppingCart } from "../../../context/carritoContext.jsx"
import axios from "axios";
import getNowDate from '../../../utility/utility.js'
import '../Styles/styles.css'  // creo que incecesario, se importe en el componente padre

export default function DocComponent(){

  const { cartItems, folio,  nombre, notas, addNewItem, changeArticuloItem, changeCantidadItem,  changePrecioItem, 
          removeFromCart, total, settFecha} = useShoppingCart();

  useEffect(()=>{
    setDate()
    //getData()
    setDetailOrder() 
  },[])

  function setDate(e){
    let today = getNowDate()
    document.getElementById("fechaInput").value = today + ""
    settFecha(today)
  }

  function setDetailOrder(){
    const isDetail = false;  // no se si deba recibir del contexto o como propiedad desde el "link to"
    if (isDetail){
      const order = null; // no se si deba recibir del contexto o como propiedad desde el "link to"
      // rellenar campos con la order
    }
  }

  function getData(){
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
    .get("http://127.0.0.1:8000/api/productos/", {mode: "no-cors"})
    .then((res) => {
      //this.setData(res.data)
      console.log("RESPONSE PRODUCTOS ", res)
    })
    .catch((err) => console.log(err))
  }

  function addProductRows() {
    const defaultId = Math.floor(Math.random() * 1000);
    const precio = 0 // data.find(p => p.id == defaultId).precio
    const cant = 0
    const sub = 0
    const nombre = "" // data.find(p => p.id == defaultId).nombre
    addNewItem(defaultId, nombre, precio, cant, sub);
  }

  function deleteTableRows(index)  {
    removeFromCart(index)
  }

  function onChangeArticuloItem(codigo, evnt) {         
    const { value } = evnt.target;
    changeArticuloItem(codigo, value, 0,0);
    /* FOR PREDEFINED PRODUCTS
    const { value } = evnt.target;  //id
    const precio = data.find(p => p.id == value).precio
    const nombre = data.find(p => p.id == value).nombre
    changeArticuloItem(index, value, precio, nombre);
    */
  }

  function onChangeCantidadItem(index, evnt) {
    const { value } = evnt.target;
    changeCantidadItem(index, value);
  }

  function onChangePrecioItem(index, evnt) {
    const { value } = evnt.target;
    changePrecioItem(index, value);
  }

  function onChangeFecha(evnt){
    const { value } = evnt.target;
    settFecha(value);
  }

  return (
    <React.Fragment >
    <div className='doccomponent col-12 d-flex flex-column'>
      <div className="d-flex flex-row justify-content-center align-items-center col-3 mb-3 me-0 ms-auto">
          <label for="folioInput" class=""> Folio </label>
          <input type="text" defaultValue={folio} class="form-control inputdoc m-2" id="folioInput" key={`key:${folio}`}/>
      </div>
      <div class="d-flex mb-3 col-12">
        <div class="d-flex col-8 align-items-center">
          <label for="nombreInput" class="form-label "> Recibe: </label>
          <input type="text" class="form-control inputdoc mx-2" id="nombreInput" defaultValue={nombre} key={`key:${nombre}`}/>
        </div>
        <div class="d-flex col-4 align-items-center">
          <label for="FechaInput" class="form-label ms-3"> Fecha: </label>
          <input type="date" class="form-control inputdoc mx-2" id="fechaInput" defaultValue={()=>setDate()} key={`key:${()=>setDate()}`}/>
        </div>
      </div>

      <table class="table table-bordered" >
        <thead>
          <tr>
            <th scope="col" style={{"width": "50%", "background":"#686868"}}>Articulo</th>
            <th scope="col" style={{"width": "10%", "background":"#686868"}}>Cant.</th>
            <th scope="col" style={{"width": "15%", "background":"#686868"}}>Precio U.</th>
            <th scope="col" style={{"width": "20%", "background":"#686868"}}>Subtotal</th>
            <th scope="col" style={{"width": "5%", "background":"#686868"}}><button className="btn btn-outline-success" onClick={addProductRows}> + </button></th>
          </tr>
        </thead>

        <tbody>
        {
          cartItems.map((item, index)=>{
          const {codigo, nombre, cantidad, precio, subtotal} = item;
          return(
            <tr key={codigo}>
              <td style={{"width": "50%"}} scope="row">
                <input name="articulo" type="text" defaultValue={nombre} onChange={e=>onChangeArticuloItem(codigo, e)} style={{"width": "100%"}} />                  
              </td>
              <td style={{"width": "5%"}} scope="row"> 
                <input name="cantidad" type="text" defaultValue={cantidad} onChange={e=>onChangeCantidadItem(index, e)} style={{"width": "100%"}} />
              </td>
              <td style={{"width": "20%"}} scope="row"> 
                <input name="precioU" type="text" defaultValue={precio} onChange={e=>(onChangePrecioItem(index, e))} style={{"width": "100%"}}/>
              </td>
              <td style={{"width": "20%"}} scope="row">
                <input name="subtotal" type="text" defaultValue={subtotal} style={{"width": "100%"}}/>
              </td>
              <td style={{"width": "5%"}} scope="row">
                <button className="btn btn-outline-danger" onClick={()=>deleteTableRows(index)} style={{"width": "100%"}}> x </button>
              </td>
            </tr>
          )
          })
        }
        </tbody>
      </table>

      <div class="row justify-content-end">
        <label for="montoTotal" class="form-label col-1"> TOTAL:  </label>
        <span id="montoTotal" class= "col-2" > { total } </span>
      </div>

      <br></br>

      <label for="notasInput" class="form-label"> Notas </label>
      <input type="text" class="form-control inputdoc" defaultValue={notas} id="notasInput"/>
    </div>  
    </React.Fragment>
  );
}

 // SELECT FOR PREDEFINED PRODUCTS
 // <select id="selectProd" value={id} class="chosen-select input-sm form-control" data-chosen=""
 //                 onChange= { (evnt)=>(onChangeArticuloItem(index, evnt)) } name="articulo" style={{"width": "100%"}}>
 //                     {data.map((p) => <option value={p.id}>{p.nombre}</option>)}
 //                 </select>



/*
// fake data list   value = codigo
let products = [{codigo: 0, nombre:'Producto 1', precio: 55},
               {codigo: 1, nombre: 'Producto 2', precio:43},
               {codigo: 2, nombre: 'Producto 3', precio:443},
               {codigo: 3, nombre: 'Producto 4', precio:5321}, ];

export default class DocComponent extends Component {
  constructor(props) {
    super(props);
    console.log("props RECIBIDAS EN docComponent: ");
    console.log(props);
    this.state = { //this.props
      //carrito:{articulos: [{codigo: 0, articulo: "", cantidad : 0, precioU: 0, subtotal: 0}],                             // [ {codigo: 0, articulo: "", cantidad : 1, precioU: 10, subtotal: 10}, {...} ]
      //         fecha: "a",
      //         cliente: "a",
      //}
    };
  }

  componentDidMount() {   // ejecutado despues de costruir el DOM
 }

  addProductRows = () => {
    const rowsInput = {
        codigo: 0,
        articulo:'',
        cantidad: 0,
        precioU: 0,
        subtotal: 0
    }
    let { carrito } = this.state;
    carrito.articulos.push(rowsInput);
    this.setState({ carrito: {articulos: carrito.articulos} });
  }

  deleteTableRows = (index)=>{
    let { carrito } = this.state;
    carrito.articulos.splice(index, 1);
    this.setState({ carrito: {articulos: carrito.articulos} });
  }

  handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    let { carrito } = this.state;

    if (name == "articulo"){
        const articulo_name = products.filter(prod => prod.codigo == value )[0].nombre;
        carrito.articulos[index][name] = articulo_name;
        carrito.articulos[index].codigo = value;
    }
    else{
      carrito.articulos[index][name] = value;
    }
    this.setState({ carrito: {articulos: carrito.articulos} });
  }

  render() {
    return (
      <React.Fragment>
        <label for="nombreInput" class="form-label"> Nombre </label>
        <input type="text" class="form-control" id="nombreInput"/>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Articulo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio U.</th>
              <th scope="col">Subtotal</th>
              <th><button className="btn btn-outline-success" onClick={this.addProductRows} >+</button></th>
            </tr>
          </thead>

          <tbody>
          {this.state.carrito.articulos.map((data, index)=>{
            const {codigo, articulo, cantidad, precioU, subtotal} = data;
            return(
                <tr key={index}>
                  <td scope="row">
                    <select id="selectProd" value={codigo} class="chosen-select input-sm form-control full-width" data-chosen="" onChange={(evnt)=>(this.handleChange(index, evnt))} name="articulo" >
                      {products.map((p) => <option value={p.codigo}>{p.nombre}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={cantidad} onChange={(evnt)=>(this.handleChange(index, evnt))} name="cantidad"/></td>
                  <td><input type="text" value={precioU} onChange={(evnt)=>(this.handleChange(index, evnt))} name="precioU"/></td>
                  <td><input type="text" value={subtotal} onChange={(evnt)=>(this.handleChange(index, evnt))} name="subtotal"/></td>
                  <td><button className="btn btn-outline-danger" onClick={()=>(this.deleteTableRows(index))}>x</button></td>
                </tr>
            )
          })}
          </tbody>
        </table>

        <label for="FechaInput" class="form-label"> Fecha </label>
        <input type="text" class="form-control" id="FechaInput"/>

        <label for="notasInput" class="form-label"> Notas </label>
        <input type="text" class="form-control" id="notasInput"/>

        <label for="folioInput" class="form-label"> Folio </label>
        <input type="text" class="form-control" id="folioInput"/>

      </React.Fragment>
    );
  }
}


*/






/* CODIGO DESECHEDAO

onSelectProd = () => {
  const  cod_prod = document.getElementById('selectProd').value;
  const  codigos_carrito = this.state.carrito.articulos.map(a => a.codigo);

  if (codigos_carrito.some(item => item == cod_prod)){
    let { carrito } = this.state;
    carrito.articulos.filter(prod => prod.codigo == cod_prod)[0].cantidad += 1;
    this.setState({ carrito: {articulos: carrito.articulos} });

  }
  else{
    let { carrito } = this.state;
    carrito.articulos.push(products.filter(prod => prod.codigo == cod_prod)[0]);
    this.setState({ carrito: {articulos: carrito.articulos} });
  }
};


fillSelect = (event, value) => {
  let select = document.getElementById("selectProd");
  let options = products.map(opt => `<option value=${opt.codigo}> ${opt.nombre} </option>`).join('/n');
  select.innerHTML = options;
};


*/
