import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/styles.css'

function get_url_order(order_id){
	return "orders/" + order_id
}

export default function TableOrders(props){
	const orders = props.orders
    return (
		<>
		<table className="table gx-0">
		<thead>
			<tr className='col-12 row gx-0'>
			<th scope="col" style={{"width": "10%"}}>Status</th>
			<th scope="col" style={{"width": "15%"}}>Venta_ID</th>
			<th scope="col" style={{"width": "40%"}}>Articulo</th>
			<th scope="col" style={{"width": "5%"}}>Qty.</th>
			<th scope="col" style={{"width": "10%"}}>Subtotal</th>
			<th scope="col" style={{"width": "20%"}}>Cliente</th>
			</tr>
		</thead>
		<tbody>
		{
			orders.map((item, index)=>{
			const orden =item.fields
			const {order_id , product, subtotal, customer, qty, status} = orden;
			//console.log('STATTT '+ JSON.stringify(orders));
			return(
			<tr  className='col-12 row gx-0'>
				<td className='col-2' style={{"width": "10%"}}>
				<span name="status" type="text" value={status} style={{"width": "10%"}}> {status} </span>
				</td>
				<td className='col-2' style={{"width": "15%"}}>
				<span name="order_id" type="text" value={order_id} style={{"width": "15%"}}> {order_id} </span>
				</td>
				<td className='col-4' style={{"width": "40%"}}>
				<Link to={get_url_order(order_id)} classNameName='link'> 
					<span name="product" type="text" value={product} style={{"width": "40%"}}> {product} </span> 
				</Link>
				</td>
				<td className='col-2' style={{"width": "5%"}}>
				<span name="qty" type="text" value={qty} style={{"width": "5%"}}> {qty} </span>
				</td>
				<td className='col-2' style={{"width": "10%"}}>
				<span name="subtotal" type="text" value={subtotal} style={{"width": "10%"}}> {subtotal} </span>
				</td>
				<td className='col-2' style={{"width": "20%"}}>
				<span name="customer" type="text" value={customer} style={{"width": "20%"}}> {customer} </span>
				</td>
			</tr>
			)
			})
		}
		</tbody>
		</table>
		</>
	)
};