import React from 'react';
import { ICartProducts } from './interfaces';

const props = {
	cartList:Array<ICartProducts>(),
	summa: 0,
	incraseItems: (id:number) => {},
	decraseItems: (id:number) => {},
	deleteItemCart: (id:number) => {}
}

export const ProviderCart = React.createContext( props );