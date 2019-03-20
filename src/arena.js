import React, {Component} from 'react';

class Arena extends Component {

  render() {
    const items = [{x: 1, y: 2, type: 'x'}, {x: 0, y: 0, type: 'o'}];

    const matrix = this.createMatrix(10, items);

    return <div className="Arena">
      <table>
        {matrix.map(row => <tr>{row.map(elem => <td>{elem.type}</td>)}</tr>)}
      </table>
    </div>;
  }

  createMatrix(n = 10, items) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        matrix[i][j] = this.getAtPosition(items, i, j);
      }
    }
    return matrix;
  }

  getAtPosition(items = [], x, y) {
    return items.find((item) => item.x === x && item.y === y) || {x: x, y: y, type: '.'}
  }
}

export default Arena;