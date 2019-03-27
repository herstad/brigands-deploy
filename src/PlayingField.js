import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

class PlayingField extends Component {

  typeIcons = {
    o: 'android',
    x: 'directions_walk',
    mounted: 'direction_bike',
    grass: 'crop_free',
    tree:'nature',
    water: 'waves',
    rock: 'landscape',

  };

  getIcon = (type) => this.typeIcons[type] || 'crop_free';

  render() {

    return <div className="PlayingField">
      <Table padding="none">
        <TableBody>
        <BrigandContext.Consumer>
          {({items, setSelected}) => {
            return (this.createMatrix(10, items).map(row =>
              <TableRow key={row[0].y}>{row.map(elem =>
                <TableCell key={'x' + elem.x + 'y' + elem.y}>
                  <IconButton onClick={() => setSelected(elem)}><Icon>{this.getIcon(elem.type)}</Icon></IconButton>
                </TableCell>)}
              </TableRow>))
          }}
        </BrigandContext.Consumer>
        </TableBody>
      </Table>
    </div>;
  }

  createMatrix(n = 10, items) {
    let matrix = [];
    for (let y = 0; y < n; y++) {
      matrix[y] = [];
      for (let x = 0; x < n; x++) {
        matrix[y][x] = this.createAtPosition(items, x, y);
      }
    }
    return matrix;
  }

  createAtPosition(items = [], x, y) {
    return items.find((item) => item.x === x && item.y === y) || {x: x, y: y, type: '.'}
  }
}

export default PlayingField;