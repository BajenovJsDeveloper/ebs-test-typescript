import React from 'react';
import { useState, useEffect } from 'react';
import { api, logic } from './Api'

import ListOfProducts from './ListOfProducts';
import Cart from './Cart';
import { ICartProducts } from './interfaces';
import { ProviderTable } from './ProviderTable';
import { ProviderCart } from './ProviderCart';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

const URL_REQUEST = 'http://localhost:3001/api/products/';

//---------------------------------------------------------------------
//--- Create Main Component
const  Main: React.FC = ( props:any ) => {

	//--- Array of Object products
	const [ tableList, setTableList ] = useState<ICartProducts[ ]>([ ]);
	//--- Array of Object in Cart
	const [ cartList, setCartList] = useState<ICartProducts[ ]>([ ]);
	//--- sorting direction flags
	const [ sortDir, setSortDir ] = useState<boolean[ ]>([true, true]);

	//--- Select few items from list of products
	const incraseCI:(id:number) => void = ( id ) =>{
		if(tableList[id].tempcount < 35){
			let newList:ICartProducts[ ] = [ ...tableList ];
			newList[ id ].tempcount++;
			setTableList(newList);
		}	
	}
	//--- Deselect few items from list of products
	const decraseCI:(id:number) => void = ( id ) =>{
		if(tableList[id].tempcount > 0 ){
			let newList:ICartProducts[ ] = [ ...tableList ];
			newList[ id ].tempcount--;
			setTableList(newList);
		}	
	}
	//--- Add selected item to Cart and reset Temprarry count to zero
	const selectItem:(id:number) => void = ( id ) =>{
		let item = tableList[id];
		let newCart:ICartProducts[ ] = [ ...cartList ];
		let idx = logic.findDobleObject(item, cartList)
		if( idx === null ){	
			//--- creating new Object with necesary parameters	
			let itemCart:ICartProducts = {
					name: item.name,
					category:{ id: item.category.id, 
							   name: item.category.name 
							},
					price: item.price,
					count: item.count + item.tempcount,
					id: item.id,
					tempcount: 1 
				}
				newCart.push(itemCart);
			setCartList(newCart);
			setTableList( logic.resetTempCount(tableList, id, item.tempcount) );
		}
		else{
			newCart[idx].count += item.tempcount;
			setCartList(newCart);
			setTableList( logic.resetTempCount(tableList, id, item.tempcount) );
		}	

	}
	//--- Delete item from Cart and set selected items count to zero
	const deleteItemCart = (id:number) => {
		let newCart = [ ...cartList ];
		let deleted = newCart.splice(id,1);
		setTableList( logic.deleteCountList(deleted[0].id, tableList) );
		setCartList(newCart);
	}
	//--- Incrase count of items in the cart
	const incraseItems = (idx:number) =>{
		let newCart:ICartProducts[] = [ ...cartList ];
		if(newCart[idx].count < 35 ){
			newCart[idx].count++;
			setCartList(newCart);
			setTableList( logic.changeCount(newCart[idx].id, tableList, true) );
		}	
	}
	//--- Decrase count of items in the cart
	const decraseItems = (idx:number) =>{
		let newCart:ICartProducts[] = [ ...cartList ];
		if(newCart[idx].count > 1 ){
			newCart[idx].count--;
			setCartList(newCart);
			setTableList( logic.changeCount(newCart[idx].id, tableList, false) );
		}	
	}
	//--- Sorting elements in the table list by cotagory or price
	const sortClick = (param:string | number) => {
		if(typeof param === 'string'){
			setSortDir( [!sortDir[0], sortDir[1]] );
			setTableList( logic.sortingByCategory(tableList, sortDir[0]) );
		}
		else {
			setSortDir( [sortDir[0], !sortDir[1]] );
			setTableList( logic.sortingByPrice(tableList, sortDir[1]) );
		}	
	}

	const valueTableList = {
		tableList, cartList, incraseCI, decraseCI, sortClick, selectItem, sortDir
	}
	const valueCartList = {
		cartList, summa: logic.getSumma(cartList), incraseItems, decraseItems, deleteItemCart
	}

	//--- Getting some data from server
	useEffect(() => {
			api.getData(URL_REQUEST).then( (resolve: any) => {
				let data = resolve.data;
				let parsetData =  data.map((i:ICartProducts, idx:number) => {
					i.id = idx;
					i.count = 0;
					i.tempcount = 0;
					return i }) 
				setTableList(parsetData);
			}).catch((error: any) =>{
				alert('Server has a Error!');
			})

		},[])


	return (
			<div>
				<Switch>
					<Route exact path='/' component={
							() => (<ProviderTable.Provider value={ valueTableList }>
								   		<ListOfProducts />
								   </ProviderTable.Provider>) 
						}/>
					<Route exact path='/cart' component={ 
							() => (<ProviderCart.Provider value={ valueCartList } >
										<Cart />
								   </ProviderCart.Provider>)
						}/>
					<Route path='/'  component={ () => (
							<div>
								<h1 style={{color:'red',textAlign:'center'}} className='class="display-4"'>
								Sorry!  Page Error.
								</h1>
								<p className='text-center'><Link to='/'> back to min page </Link></p>
							</div>
						)}/>
				</Switch>	
			</div>
		   )
}

export default  Main
