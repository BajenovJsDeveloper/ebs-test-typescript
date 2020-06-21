import axios from 'axios';
import {ICartProducts} from './interfaces';

export const  api = {
	getData:(url:string) => axios.get(url,{
		headers:{'content-type':'application/json'}
	})
}

export const logic = {
	resetTempCount: (item:ICartProducts[ ], id:number, count:number):ICartProducts[ ] => {
		let itemsArray = [ ...item ]; 
		itemsArray[id].tempcount = 0;
		itemsArray[id].count += count;

		return itemsArray;
	},
	findDobleObject: (item:ICartProducts, cartArray:ICartProducts[ ]):number | null => {
		let result:number | null  = null;
		cartArray.forEach((i, idx:number)=> {
			if( i.id === item.id ) result = idx;
		})

		return result;
	},
	getSumma: (cart:ICartProducts[ ]):number => {
		let summ=0;
		cart.forEach(i =>{
			summ += i.price * i.count;
		});	
		return summ;
	},
	deleteCountList: (id:number, tableList:ICartProducts[ ]):ICartProducts[ ] => {
		let newList:ICartProducts[ ] = [ ...tableList ]
		newList.forEach(i =>{
			if(i.id === id) {i.count = 0;}
		})
		return newList;
	},
	changeCount: (id:number, tableList:ICartProducts[ ], inc:boolean):ICartProducts[ ] => {
		let newList:ICartProducts[ ] = [ ...tableList ];
		newList.forEach(i =>{
			if(i.id === id) {i.count +=(inc)? 1 : -1;}
		})
		return newList;
	},
	//--- Sorting function by price up or down
	sortingByPrice: (tableList:ICartProducts[], sortDir:boolean) => {
		let newList = [ ...tableList];
		if(sortDir) newList.sort((a:ICartProducts, b:ICartProducts) => a.price -  b.price );
		else  newList.sort((a:ICartProducts, b:ICartProducts) => b.price - a.price );
		return newList;
	},
	//--- Sorting function by category up or down
	sortingByCategory(tableList:ICartProducts[], sortDir:boolean){
		let newList = [ ...tableList];
				newList.sort((a:ICartProducts, b:ICartProducts) => {
					//--- sorting by incrase or decrase depending from 'direction: boolean'
					if(a.category.name.toLowerCase() > b.category.name.toLowerCase()) return sortDir? 1 : -1;
					if(a.category.name.toLowerCase() < b.category.name.toLowerCase()) return sortDir? -1 : 1;
					return 0 
				});
		return newList
	}
}



