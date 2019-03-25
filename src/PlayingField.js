import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";

class PlayingField extends Component {

  render() {

    return <div className="PlayingField">
      <table>
        <tbody>
        <BrigandContext.Consumer>
          {({items, setSelected}) => {
            return (this.createMatrix(10, items).map(row =>
              <tr key={row[0].y}>{row.map(elem =>
                <td key={'x' + elem.x + 'y' + elem.y}>
                  <button onClick={() => setSelected(elem)}>{elem.type}</button>
                </td>)}
              </tr>))
          }}
        </BrigandContext.Consumer>
        </tbody>
      </table>
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