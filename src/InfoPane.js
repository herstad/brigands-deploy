import React, {useContext} from 'react';
import BrigandContext from "./BrigandContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {getItemById} from "./itemsUtil";

function UnitCard() {
  const {selectedId, items} = useContext(BrigandContext);
  console.log("InfoPane, selectedId:" + selectedId);
  if (selectedId === undefined) {
    return null;
  }
  const {x, y, hp, ap, type} = getItemById(selectedId, items);
  const maxHp = 5;
  const relativeHp = hp / maxHp * 100;
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
  );
}

function EventCard({event}) {
  const {items} = useContext(BrigandContext);
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
  const {events} = useContext(BrigandContext);
  return events.map((event, index) => <EventCard key={"event" + index} event={event}/>);
}

export default function InfoPane() {
  return <div>
    <UnitCard/>
    <EventsInfo/>
  </div>
}
