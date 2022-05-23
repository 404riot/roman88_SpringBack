import React, {Component} from 'react';
import Router from './Routes';
import Watermark from './components/Watermark';
class App extends Component {

  render() {

    return (
      <div className="App">
        <Watermark />
        <Router />
      </div>
    );
  }
}

export default App;