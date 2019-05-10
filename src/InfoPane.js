import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {getItemById} from "./itemsUtil";
import {ReducerDispatch} from "./App";

function UnitCard() {
  const {selectedId, items} = useContext(ReducerDispatch).state;
  console.log("InfoPane, selectedId:" + selectedId);
  if (selectedId === undefined) {
    return null;
  }
  const {id, playerId, x, y, hp, ap, type} = getItemById(selectedId, items);
  const maxHp = 5;
  const relativeHp = hp / maxHp * 100;
  return (
    <Card>
      <CardContent>
        <Typography>id:{id}</Typography>
        <Typography>player:{playerId}</Typography>
        <Typography>x:{x}</Typography>
        <Typography>y:{y}</Typography>
        <Typography>hp:{hp}</Typography>
        <Typography>ap:{ap}</Typography>
        <Typography>type:{type}</Typography>
        <LinearProgress variant="determinate" value={relativeHp}/>
      </CardContent>
    </Card>
  );
}

function EventCard({event}) {
  const {items} = useContext(ReducerDispatch).state;
  const {x, y, type} = (event.itemId ? getItemById(event.itemId, items) : {});
  return (
    <Card>
      <CardContent>
        <Typography>type:{event.type}</Typography>
        <Typography>x:{x}</Typography>
        <Typography>y:{y}</Typography>
        <Typography>itemType:{type}</Typography>
      </CardContent>
    </Card>
  )
}

function EventsInfo() {
  const {events} = useContext(ReducerDispatch).state;
  return events.map((event, index) => <EventCard key={"event" + index} event={event}/>);
}

export default function InfoPane() {
  return <div>
    <UnitCard/>
    <EventsInfo/>
  </div>
}
