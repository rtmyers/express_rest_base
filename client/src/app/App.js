import React, { Component } from 'react';
import './style/App.css';

import Inventory from './../app/components/Inventory';

class App extends Component {
  render() {
      return (
          <div className="appContainer">
              <div className="title">Backbone Code Evaluation</div>
              <Inventory />
          </div>
      );
  }
}

export default App;
