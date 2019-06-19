class ChessRules{
  // It checks that the requested move is valid: boundary check and whether the move is legal in Chess
  
    /* It validates the move by the following conditions:
    * 1. the input data is valid
      2. The chess move is in the boundaries of the chess board
      3. The chess move is allowed according to Chess rules (chess piece)
    */
  static canMovePiece(piece, newRow, newColumn){
    if(!ChessRules.isValidMoveInput(piece, newRow, newColumn)){
      return false;
    }

    const {type: pieceType} = piece;

    switch(pieceType){
      case 'knight':
      return this.isKnightMove(piece, newRow, newColumn);
      default:
      return false;
    }
  }

  // It validates that the new location of the piece(knight) is legal
  // Chess rules: Knight moves two cells in one direction, and one cell in the perpendicular direction
  static isKnightMove(piece, newRow, newColumn){
    if(!piece){
      return false;
    }

    const {row, column}  = piece;

    let deltaX = Math.abs(Math.abs(newColumn) - Math.abs(column));
    let deltaY = Math.abs(Math.abs(newRow) - Math.abs(row));
    
    return (deltaX===2 && deltaY===1) || (deltaX===1 && deltaY===2);
  }

  static isNumeric(n){return !isNaN(parseFloat(n)) && isFinite(n)};

  // It validates that the desired move is within the board boundaries
  static isMoveInBound(newRow, newColumn){
    return newRow>=0 && newRow<=7 
    && newColumn>=0 && newRow<=7;
  }

  static isValidMoveInput(piece, newRow, newColumn){
    return piece &&
    ChessRules.isNumeric(newRow) &&
    ChessRules.isNumeric(newColumn) &&
    ChessRules.isMoveInBound(newRow, newColumn);
  }
}

exports.ChessRules = ChessRules;