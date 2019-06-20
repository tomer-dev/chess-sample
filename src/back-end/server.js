const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const ChessRules = require('./ChessRules').ChessRules;

const hostname = '127.0.0.1';
const port = 3000;

const mockChessPieces = [{id: '1', type: 'knight', row:4, column:4}];

app.use(bodyParser.json())
app.use(cors());

app.use(express.static(path.join(__dirname, '../front-end/build')));


app.get('/chess-pieces', function(req, res){
    res.send({chessPieces: mockChessPieces});
})

// Handle React routing, return all requests to React app
 app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../front-end/buildy', 'index.html'));
  });

app.post('/validate-chess-move', function(req, res){
    if(!req || !req.body){
        return;
    }

    const {movedPiece, newRow, newColumn} = req.body;
    
    res.send(ChessRules.canMovePiece(movedPiece, newRow, newColumn));
});

var server = app.listen(port, ()=> console.log(`Server running at http://${hostname}:${port}/`))