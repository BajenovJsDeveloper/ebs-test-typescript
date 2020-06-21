import React from 'react';
import { ICartProducts } from './interfaces';


interface Props{
	item: ICartProducts;
	idx: number;
	btnStyle: string;
	btnText: string;
	cart:boolean;
	name?:string;
	incraseHandle: (idx: number) => void;
	decraseHandle: (idx: number) => void;
	selectHandle: (idx: number) => void;
}
//--- TableRowItem Component
const TableRowItem = React.memo( (props:Props) =>{

	const { idx, 
			item, 
			incraseHandle, 
			selectHandle, 
			decraseHandle, 
			cart,
			btnStyle,
			btnText } = props;

	let disabled = (item.tempcount > 0)? '' : 'disabled';
	return (
			<tr>
				<th>{ idx + 1 }</th>
				<td>{ item.category.name }</td>
				<td>{ item.name }</td>
				<td>${ item.price.toFixed(2) }</td>
				<td><div className="btn-group" role="group">
					<button type="button" 
						  	onClick={ ( ) => decraseHandle(idx) }
						  	className="btn btn-secondary"> - </button>
					<button type="button" 
						  	onClick={ ( ) => selectHandle(idx) }
						  	className={`btn btn-${ btnStyle } ${ disabled }`}>{ btnText } 
						<span className="badge badge-light ml-2"><big> { (cart)? item.count:item.tempcount } </big></span>
					</button>
					<button type="button" 
						  	onClick={ ( ) => incraseHandle(idx) }
						  	className="btn btn-secondary"> + </button>
					</div>
					{!cart && <span className='info ml-5 text-muted'> {(item.count)? item.count : '-' } </span>}
				</td>		
			</tr>		
		);
});

export default TableRowItem