import React, {useReducer} from 'react';
import './App.css';
import PlayingField from './PlayingField';
import Orders from './Orders';
import InfoPane from './InfoPane';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import WinDialog from "./WinDialog";
import reducer from "./reducer";
import {generateState} from "./stateGenerator";

export const ReducerDispatch = React.createContext(null);

const initialState = generateState();

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <CssBaseline/>
      <Grid container justify="center" direction="row" spacing={24}>
        <ReducerDispatch.Provider value={{state, dispatch}}>
          <WinDialog/>
          <Grid item xs>
            <InfoPane/>
          </Grid>
          <Grid item xs>
            <PlayingField size="10"/>
          </Grid>
          <Grid item xs={4}>
            <Orders/>
          </Grid>
        </ReducerDispatch.Provider>
      </Grid>
    </div>
  );
}

