import React, { Component , useState, useEffect, useRef, forwardRef } from "react";
import axios from "axios";
import 'bootstrap';  // para tumbable
import DocComponent from './components/docComponent.jsx';
import PdfComponent from './components/pdfComponent.jsx';
import { useShoppingCart } from "../../context/carritoContext.jsx"
//import {useReactToPrint} from 'react-to-print'
//import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import Navbar from '../../Navigation/Navbar.jsx'
import './Styles/styles.css'

export default function OrderDetail() {

  const [showPdf, setShowPdf] = useState(true);
  const {settFolio, settNombre, settFecha, settNotas, addNewItem, changeCantidadItem, resetCarrito} = useShoppingCart();

  const {order_id} = useParams()  // parameter from Link (Routes)

  useEffect(()=>{
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
    .get("https://django-sales.onrender.com//ordenes/order_detail/" + order_id + "/", 
      {mode: "cors"},
    )
    .then((res) => {
      const order = res.data[0].fields
      console.log("ORDER DETAIL RESPONSE: ", order)
      initializeContext(order);
    })
    .catch((err) => console.log(err))
  }, [])



  function initializeContext(order){
    console.log('ORDER ARRIVE TO INIT CONTEXT: ' +  JSON.stringify(order))
    resetCarrito();
    settFolio(order.order_id);
    settNombre(order.customer);
    settNotas(order.notas)
    addNewItem(order.product, order.unit_price, order.qty, order.subtotal);
    changeCantidadItem(order.qty) // not worked
  }

  function createNote (event, value) {
    settNombre(document.getElementById('nombreInput').value);
    settFecha(document.getElementById('fechaInput').value);
    settNotas(document.getElementById('notasInput').value);
    settFolio(document.getElementById('folioInput').value);
  };

  // Aqui se almacenara una referencia al DOM element de pdfComp, para que printNote acceda
  const pdfComp = useRef()
  const printNote = () => {
                    const blob = new Blob([], { type: 'application/pdf' });
                    window.open(URL.createObjectURL(blob));
                    console.log("DOOOCCCC PPPDDDDFFF")
                    console.log(pdfComp.current) 
                  }

      /*useReactToPrint({      
      content: () => pdfComp.current,
      documentTitle: 'Order_print',
      onAfterPrint: ()=> alert('Impresion finalizada')
  }); */
 
  return (
    <div>
      <main className="container">
        <div>
            <Navbar />
        </div>   
        <h1 className="text-center my-3" style={{"color":"#b3b8bc"}}>
          NOTE GENERATOR
        </h1>
        <div className="row col-md-10 col-sm-12 mx-auto mb-2 p-0 card p-3 mb-3 dropdown doccomponent">
            
          <button class="btn btn-secondary dropdown-toggle" type="button" id="drop-template" data-bs-toggle="dropdown" aria-expanded="false">
            Select Template
          </button>
          <ul class="dropdown-menu" aria-labelledby="drop-template">
            <li><a class="dropdown-item" > Template 1 </a></li>
          </ul>

          <div id="doc-template" >
            <DocComponent />
          </div>

        </div>
        <div class="d-flex justify-content-center mb-3">
          <button className="btn btn-primary m-2" onClick={ e => createNote(e, 'idd:1')}>
            Generate PDF
          </button>
          <button className="btn btn-primary m-2" onClick={ e => printNote(e, 'idd:2')}>
            IMPRIMIR
          </button>
        </div>
        <div className="row ">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
                <div id="doc-pdf">
                    <PdfComponent ref={pdfComp}/>  // regresame tu DOM en esta var
                </div>
            </div>
          </div>
        </div>
     </main>

    </div>
  );
}

