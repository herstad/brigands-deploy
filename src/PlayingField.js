import React, {useContext} from 'react';
import BrigandContext from "./BrigandContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


const typeIcons = {
  o: 'android',
  x: 'directions_walk',
  mounted: 'direction_bike',
  grass: 'crop_free',
  tree: 'nature',
  water: 'waves',
  rock: 'landscape',
  dead: 'airline_seat_flat',

};

const getIcon = (type) => typeIcons[type] || 'crop_free';

const createMatrix = (n = 10, items) => {
  let matrix = [];
  for (let y = 0; y < n; y++) {
    matrix[y] = [];
    for (let x = 0; x < n; x++) {
      matrix[y][x] = createAtPosition(items, x, y);
    }
  }
  return matrix;
};

const createAtPosition = (items = [], x, y) => {
  return items.find((item) => item.x === x && item.y === y) || {x: x, y: y, type: '.'}
};

function PlayingFieldCell({elem}) {
  const {setSelected} = useContext(BrigandContext);
  return (
    <TableCell>
      <IconButton
        onClick={() => setSelected(elem.id)}><Icon>{getIcon(elem.type)}</Icon></IconButton>
    </TableCell>);
}

export default function PlayingField() {
  const {items} = useContext(BrigandContext);
  const matrix = createMatrix(10, items);
  return <div className="PlayingField">
    <Table padding="none">
      <TableBody>
        {
          (matrix.map(row =>
            <TableRow key={row[0].y}>{
              row.map(elem => <PlayingFieldCell key={'x' + elem.x + 'y' + elem.y} elem={elem}/>)}
            </TableRow>))
        }
      </TableBody>
    </Table>
  </div>;
}
