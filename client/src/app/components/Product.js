import React, { Component } from 'react';
import { valid } from './../services/ValidationService';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            price: parseFloat(
                this.props.product.price.toString().replace(/[^0-9.]+/g, '')
            ).toFixed(2) || 0.00
        };
    }

    componentDidMount(props){
        console.log(this.state.price);
        if(this.state.editing)
            this.priceInput.focus();
        if(!valid.Price(this.state.price))
            this.setState({ price: 0.00 });
    }

    render() {
        const product = this.props.product;
        return(
          <div className="product">
              <div className="cell">
                  <div className={this.props.product.image}></div>
                  {product.client} {product.name}
              </div>
              { this.state.editing ?
                  this.renderInput(this.state.price, product.id) :
                  <div className="cell" onClick={this.edit}>{"$"+this.state.price}</div>
              }
              <div className="cell">{product.code}</div>
              <div className="cell">{product.creator}</div>
              <div className="cell">{product.last_modified}</div>
              <div className="removeBttn" title="DELETE" onClick={this.removeItem.bind(this)}/>
          </div>
        );
    }

    handleChange = (e) => this.setState({ price: e.target.value.replace("$","") });
    edit = () => this.setState({ editing: true });

    handleSave(){
      const value = parseFloat(this.priceInput.value.toString().replace(/[^0-9.]+/g, '')).toFixed(2);
      this.setState({ editing: false, price: value }, () => (!valid.Price(value)) ?
          (fetch('/products/update/'+this.props.product.id, {
            method: 'POST',
            body: JSON.stringify({price: value}),
            headers: { "Content-Type": "application/json" }
          })
          .then(response => response.json())
          .then(data => this.props.updateInventory(data, this.props.product.id))
          .catch(err => console.warn(err))
    ) : (false))
  }

  removeItem(){
    return fetch('/products/delete/' + this.props.product.id, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => this.props.updateInventory({ products: data }))
    .catch(err => console.warn(err))
  }

  renderInput(price, id){
    return(
        <input
          ref={(input) => { this.priceInput = input; }}
          className={"validInput"}
          default={"$"+price}
          value={"$"+price}
          autoFocus={true}
          onClick={this.edit.bind(this)}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleSave.bind(this)}
        />
    );
  }
}

export default Product;
