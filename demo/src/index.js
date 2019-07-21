import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/styles/scss/App.scss';
import DndLoanDebt from '../../src/index.js';

const props = {
  overallavg: "30460",
  blackavg: "34630",
  whiteavg: "30640",
  asianavg: "25920",
  hispanicavg: "27320"
};

class Demo extends Component {
  render() {
    return <div id="DndLoanDebt">
      <DndLoanDebt
        {
          ...props
        }
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
