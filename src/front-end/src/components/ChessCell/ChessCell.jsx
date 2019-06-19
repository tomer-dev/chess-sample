import React from 'react';
import PropTypes from 'prop-types';
import BaseCell from '../BaseCell/BaseCell';
import '../BaseCell/BaseCell.css';
import './ChessCell.css';
import {ItemTypes} from '../Constants';
import {DropTarget} from 'react-dnd';


const droppable = {
    // It triggers when the piece is dropped on a cell
    // Note: targetProps -> cell props
    drop(targetProps, monitor){
        const chessPieceDTO = monitor.getItem().pieceDTO;       
        const {row, column} = targetProps;

        targetProps.onDrop(chessPieceDTO, row, column);
    }
}



function droppableCollect(connect, monitor){
    return{
        connectDropTarget: connect.dropTarget()
      }
}

class ChessCell extends React.Component{
   
    static propTypes = {
        onDrop: PropTypes.func.isRequired,
        row : PropTypes.number,
        column: PropTypes.number
    }

    render(){
        const {children, connectDropTarget} = this.props;
        
        return connectDropTarget(
             <div className="cell-container">
                <BaseCell ref={connectDropTarget} {...this.props}/>
                {children}
             </div>
        );
    }
}

  export default DropTarget(ItemTypes.PIECE, droppable, droppableCollect)(ChessCell);