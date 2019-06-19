import React, {Component} from 'react';
import './BaseCell.css';
import PropTypes from 'prop-types';

class BaseCell extends Component {

  static propTypes= {
    colored: PropTypes.bool, // The background color of the cell: colored or white
    innerChildren: PropTypes.node, // The views or components that the cell is "hosting" on its surface (i.e. chess piece)
  }

  constructor(props){
    super(props);

    this.state={};
  }

  colorCellClass = () =>{
    return this.props.colored ? 'colored' : '';
  }

  render(){
    const {innerChildren} = this.props;

    return (
      <div className={"cell-container "+ this.colorCellClass()} >
       {innerChildren}
      </div>
    );
  }
}

export default BaseCell;