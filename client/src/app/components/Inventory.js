import React, { Component } from 'react';

import Product from './Product';
import './../style/Inventory.css';

class Inventory extends Component {

    constructor(props){
        super(props);
        this.state = {
          products: []
        };
    }

    componentDidMount() {
        if(!this.state.isLoaded){
            this.getProducts()
            .then(products => this.setState({ products, isLoaded: true }));
        }
    }

    handleChange = (products) => this.setState( products );

    getProducts(){
      return fetch('/products')
      .then(res => res.json())
      .then(products => products)
    }

    render() {
        const products = this.state.products;
        if(this.state.isLoaded && products.length){
          return(
              <div className="inventory">
                  <div className="productLabels">
                      <div className="label">PRODUCT</div>
                      <div className="label">PRICE</div>
                      <div className="label">CODE</div>
                      <div className="label">CREATED BY</div>
                      <div className="label">LAST MODIFIED</div>
                  </div>
                  {products.map((product) => {
                      return(
                          <Product
                              product={product}
                              key={product.id}
                              updateInventory={this.handleChange.bind(this)}
                          />
                      );
                  })}
              </div>
          );
        } else {
          return(
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          );
        }
    }
}

export default Inventory;
