import React from 'react';
import { ICartProducts } from './interfaces';

const props = {
	tableList: Array<ICartProducts>(),
	cartList: Array<ICartProducts>(),
	incraseCI: (id:number):void => { },
	decraseCI: (id:number):void => { },
	sortClick: (id:number | string):void => { },
	selectItem: (id:number):void => { },
	sortDir:[true, true]
} 

export const ProviderTable = React.createContext( props )