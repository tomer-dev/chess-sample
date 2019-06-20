import React, {Component} from 'react';
import ChessBoard from "../ChessBoard/ChessBoard";
import axios from 'axios';
import * as Constants from '../Constants';

class ChessGame extends Component{
    static propTypes ={

    }

    constructor(props){
        super(props);

        this.state={
            chessPieces: []
          }
    }

    componentDidMount(){
      this.loadChessPieces();
    }

    loadChessPieces =() =>{
        axios({
            url: Constants.getChessPiecesUrl,
            baseURL: Constants.baseUrl,
            method: 'GET'
           })
           .then(res=>{
            res && res.data && res.data.chessPieces &&
            this.setState((state)=> {return {chessPieces: res.data.chessPieces}});
           })
    }

    moveChessPieceRequest =(movedPiece, newRow, newColumn)=>{
        return axios({
            url: Constants.validateChessMove,
            baseURL: Constants.baseUrl,
            method: 'POST',
            data: {
                movedPiece,
                newRow,
                newColumn
            }
           })
           .then(res => res.data);
}

    movePiece =(movedPiece, newRow, newColumn)=>{
        const{chessPieces = []} = this.state;

        let piece = chessPieces.find(piece=> piece.id === movedPiece.id);

        piece && Object.assign(piece, {
            row : newRow,
            column: newColumn
        });

        this.setState(()=> { return {chessPieces}});
    }

    // A callback function, triggered after a chess turn is made.
    onPieceMoved =(movedPiece, newRow, newColumn)=>{
    
        if(!ChessGame.isValidMoveInput(movedPiece, newRow, newColumn)){
            return;
        }

        this.moveChessPieceRequest(movedPiece, newRow, newColumn).then(canMove=> {
            canMove? this.movePiece(movedPiece, newRow, newColumn)
                    : alert('Move is not legal'); 
        });
    }

    render(){
        const {chessPieces} = this.state;

        return <ChessBoard chessPieces={chessPieces} onPieceMoved={this.onPieceMoved}></ChessBoard>
    }

    
    static isNumeric = (n)=> !isNaN(parseFloat(n)) && isFinite(n);

    static isValidMoveInput(piece, newRow, newColumn){
        return piece &&
        ChessGame.isNumeric(newRow) &&
        ChessGame.isNumeric(newColumn) &&
        ChessGame.isMoveInBound(newRow, newColumn)
    }

    // It validates that the desired move is within the board boundaries
    static isMoveInBound(newRow, newColumn){
      return newRow>=0 && newRow<=7 
        && newColumn>=0 && newRow<=7;
  }
}

export default ChessGame;