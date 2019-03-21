import React, {Component} from 'react';
import './App.css';
import PlayingField from './PlayingField';
import Orders from './Orders';
import InfoPane from './InfoPane';
import ContextProvider from "./ContextProvider";

class App extends Component {

  render() {
    return (
      <div className="App">
        <ContextProvider>
          <InfoPane/>
          <PlayingField size="10"/>
          <Orders/>
        </ContextProvider>
      </div>
    );
  }
}

export default App;
