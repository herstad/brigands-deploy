import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {getItemById} from "./itemsUtil";

class InfoPane extends Component {
  render() {

    return <div>
      <BrigandContext.Consumer>
        {({selectedId, items}) => {
          console.log("InfoPane, selectedId:" + selectedId);
          if (selectedId === undefined) {
            return undefined;
          }
          const {x, y, hp, ap, type} = getItemById(selectedId, items);
          const maxHp = 5;
          const relativeHp = hp / maxHp * 100;

          console.log("selected props:" + x + y + hp + ap + type);
          return (
            <Card>
              <CardContent>
                <Typography>x:{x}</Typography>
                <Typography>y:{y}</Typography>
                <Typography>hp:{hp}</Typography>
                <Typography>ap:{ap}</Typography>
                <Typography>type:{type}</Typography>
                <LinearProgress variant="determinate" value={relativeHp}/>
              </CardContent>
            </Card>
          )
        }}
      </BrigandContext.Consumer>
    </div>
  }

}

export default InfoPane;