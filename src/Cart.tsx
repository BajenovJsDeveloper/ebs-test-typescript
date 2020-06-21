import React from 'react';
import TableRowItem from './TableRowItem';
import { useHistory } from 'react-router-dom';
import { ICartProducts } from './interfaces';
import { ProviderCart } from './ProviderCart'

//--- Cart Component
const  Cart: React.FC = ( ) =>{

	const history = useHistory();
	//--- redirect to main page
	const gobackClick = () => {
		history.push('/');
	}
	
	const message = () => {
		alert('Здесь можно будет отправлять форму.')
	}

	return (
			<div className='container mt-5'>
			<ProviderCart.Consumer >
			{ (value) => (<>
					<h1>{ 'List of Products' }</h1>
					<table className='table mt-4'>
						<thead className='thead-dark'>
							<tr>
								<th> </th>
								<th> { 'Category' } </th>
								<th> { 'Name' } </th>
								<th> { 'Price' } </th>
								<th> { 'Action' } </th>
							</tr>
						</thead>
						<tbody>
							{
								value.cartList.map((item:ICartProducts, idx: number) => 
								<TableRowItem item={ item } 
											  btnText={ 'Delete' }
											  btnStyle={ 'danger' }
											  incraseHandle={ (idx:number) => value.incraseItems(idx) }
											  decraseHandle={ (idx:number) => value.decraseItems(idx) }
											  selectHandle={ (idx:number) => value.deleteItemCart(idx) }
											  cart={ true }
											  idx={ idx }
											  key={ idx }/>)
							}
						</tbody>
						<tfoot>
							<tr>
								<th><em>Total items list: </em> 
									{ value.cartList.length.toString() } 
								</th>
								<th></th>
								<th></th>
								<th><em>
									Total cost: </em>
									$ { value.summa.toFixed(2) } 
								</th>
							</tr>
						</tfoot>
					</table>
					<button className='btn btn-info float-right mr-4' onClick={ message }>Submit</button>
					<button className='btn btn-secondary float-left' onClick={ gobackClick }>Go back</button>
				</>)
			}
				</ProviderCart.Consumer >
			</div>
		);
}


export default Cart