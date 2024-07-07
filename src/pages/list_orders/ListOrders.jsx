import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../../Navigation/Navbar'
import TableOrders from './components/TableOrders'
import './Styles/styles.css'


export default function ListOrders(){

    const [orders, setOrders] = useState([]);
    const [statusUpdate, setStatusUpdate] = useState([]);
    const [lastCheckUpdate, setLastCheckupdate] = useState([]);

	useEffect(()=>{
		getData()
	},[])

	function getData(){
		setStatusUpdate(false)
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios
		.get("https://django-sales.onrender.com/ordenes/orders/", {mode: "no-cors"})  //.get("http://127.0.0.1:8000/api/orders/", {mode: "no-cors"})
		.then((res) => {
			setStatusUpdate(res.data.status=="OK" ? true : false) 
			setLastCheckupdate(new Date().toLocaleString('es-MX'));
			setOrders(JSON.parse(res.data.orders))
		})
		.catch((err) => console.log(err))
	}

	return (
		< >
		<div className="container">
			<div>
				<Navbar />
			</div>		
			<div className="d-flex col-12 m-3" >
				<h1 className="d-flex col-12 justify-content-center">
					ORDERs
				</h1>
				<div className="d-flex justify-content-end align-items-end flex-column col-3 position-absolute" 
					 style={{'width':'100%', 'left':'0', 'rigth':'0', 'paddingRight':'120px' }}>
					{ statusUpdate? 
					<h5 className='text-success'> Orders are updated </h5>	
					:
					<h5 className='text-danger'> Orders are not updated </h5>
					}	
					<h6 className="">
						Last Check: {lastCheckUpdate}
					</h6>				
				</div>
			</div>
			<TableOrders orders={orders} />
		</div>

		</>
	)
}


