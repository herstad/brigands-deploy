import React, {Component} from 'react';
import './App.css';
import PlayingField from './PlayingField';
import Orders from './Orders';
import InfoPane from './InfoPane';
import ContextProvider from "./ContextProvider";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

class App extends Component {

  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <Grid container justify="center" direction="row" spacing={24}>
          <ContextProvider>
            <Grid item xs>
              <InfoPane/>
            </Grid>
            <Grid item xs>
              <PlayingField size="10"/>
            </Grid>
            <Grid item xs={4}>
              <Orders/>
            </Grid>
          </ContextProvider>
        </Grid>
      </div>
    );
  }
}

export default App;
