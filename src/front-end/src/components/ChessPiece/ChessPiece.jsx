import React, {Component} from 'react';
import propTypes from 'prop-types';
import './ChessPiece.css';
import knightIcon from '../../assets/knight.png';
import {DragSource} from 'react-dnd';
import {ItemTypes} from '../Constants';

const draggable = {
  beginDrag(props) {
      return {
          pieceDTO: props.pieceDTO
      }
  }
}

function draggableCollect(connect, monitor){
  return {
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  }
}

class ChessPiece extends Component{
    static propTypes ={
        pieceDTO: propTypes.object.isRequired // It is a DTO describing the chess piece
    }
    
  getIconByType = () =>{
    const {pieceDTO = {}} = this.props;

    switch(pieceDTO.type){
      case 'knight':
        return knightIcon;
      default:
      return '';
    }
  }

  // Note: The connectDragSource refers directly to the image node -> in order to avoid (due to html5 limitations) undesired 'drag preview' (i.e. background of the drop target)
    render(){
      const {pieceDTO, connectDragSource} = this.props;

      return pieceDTO?  
          connectDragSource(<img  alt="Chess Piece" className="chess-piece" src={this.getIconByType()}/>)
        : null
      }
    }

export default DragSource(ItemTypes.PIECE, draggable, draggableCollect)(ChessPiece);