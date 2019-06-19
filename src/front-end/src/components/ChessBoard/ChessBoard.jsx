import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ChessBoard.css';
import ChessCell from '../ChessCell/ChessCell';
import ChessPiece from '../ChessPiece/ChessPiece';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ChessBoard extends Component {

  static propTypes= {
    chessPieces: PropTypes.arrayOf(PropTypes.shape({
      id : PropTypes.string,
      type: PropTypes.string,
      row: PropTypes.number,
      column: PropTypes.number
    })).isRequired,
    onPieceMoved: PropTypes.func.isRequired
  }

  // It decides whether the cell in the grid should be colored (XOR operation or simply row+column)
  isColoredCell = (row, column) =>{
    return (row + column)%2 ===0;
  }

  componentDidMount(){    
   
  }

  // It renders the chess piece with the appropriate data-object
  renderChessPiece =(row,column)=>{
    const {chessPieces = []} = this.props;

    const piece= chessPieces.find(piece=> piece.row===row && piece.column === column);

    return piece && <ChessPiece pieceDTO={piece}></ChessPiece>;
  }

  render(){
    const {onPieceMoved} = this.props;

    return <div className="board-container">
    {
    [...Array(8)].map((item, row)=> 
    <div key={row} className="board-row">
      {[...Array(8)].map((item, column)=>
         <ChessCell
            colored={this.isColoredCell(column, row)}
            key={column+row*10}
            onDrop={onPieceMoved}
            row={row}
            column={column}
            >
            {this.renderChessPiece(row, column)}
      </ChessCell>
      )
      }
    </div>
    )}
    </div>;
    }
  }

  
  export default DragDropContext(HTML5Backend)(ChessBoard);