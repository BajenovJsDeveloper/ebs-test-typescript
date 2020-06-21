import React from 'react';
import { useHistory } from 'react-router-dom';
import TableRowItem from './TableRowItem';
import { ICartProducts } from './interfaces';
import { ProviderTable } from './ProviderTable';
import crtSVG from './cart.png'


//-------------------------------------------------------------------

//-- ListOfProducts  Component
const ListOfProducts = ( ) => {

  const history = useHistory();
  //--- Redirect to my Cart
  const cartClickHandle = () => {
    history.push('/cart');
  };

  return (
  		  	<ProviderTable.Consumer >
           	{ (value) => (
					    <div className="container mt-4 shadow-lg p-3 mb-5 bg-white rounded">
					      <h1 className="alert alert-primary text-center">{ 'List of Products' }</h1>
					      <button type="button" className="btn btn-danger float-right mb-4" onClick={ cartClickHandle }>
					      	<img src={crtSVG} />
					        my Cart <span className="badge badge-light ml-2 alert alert-danger">{ value.cartList.length }</span>
					      </button>

					      <table className="table mt-4 text-center table-striped table-hover">
					        <thead className="thead-dark">
					          <tr>
					            <th> </th>
					            <th onClick={ () => value.sortClick('category') }>
					              Category
					              {!value.sortDir[0] && <span>&#9660;</span>}
					              {value.sortDir[0] && <span>&#9650;</span>}
					            </th>
					            <th> {'Name'} </th>
					            <th onClick={() => value.sortClick(1)}>
					              Price
					              {value.sortDir[1] && <span>&#9660;</span>}
					              {!value.sortDir[1] && <span>&#9650;</span>}
					            </th>
					            <th> {'Action'} </th>
					          </tr>
					        </thead>
					        <tbody>
					          {value.tableList.map((item: ICartProducts, idx: number) => {
					            return (
					              	<TableRowItem
					                item={ item }
					                btnStyle={ 'primary' }
					                btnText={ 'Select' }
					                incraseHandle={(id) => value.incraseCI(id)}
					                decraseHandle={(id) => value.decraseCI(id)}
					                selectHandle={(id) => value.selectItem(id)}
					                cart={ false }
					                idx={ idx }
					                key={ idx }
					              />				            
					            );
					          })}
					        </tbody>
					      </table>
					    </div>)
			}
    		</ProviderTable.Consumer>
  );
};

export default ListOfProducts;
