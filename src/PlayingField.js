import React, {Component} from 'react';

class PlayingField extends Component {

  render() {

    const matrix = this.createMatrix(10, this.props.items);

    return <div className="PlayingField">
      <table>
        <tbody>
        {matrix.map(row =>
          <tr key={row[0].y}>{row.map(elem =>
            <td key={'x' + elem.x + 'y' + elem.y}>
              <button onClick={this.props.genSelectOnClick(elem)}>{elem.type}</button>
            </td>)}
          </tr>)}
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