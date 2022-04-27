var sio
var gameSocket

var gameInsession = []

const initialize = (io, client) =>{
    io = sio;
    gameSocket = client;

    gameInsession.push(gameSocket);

    gameSocket.on('disconnect', onDisconnect);

    gameSocket.on('new move', newMove);

    gameSocket.on('createNewGame', newGame);

    gameSocket.on('playerJoinGame', playerJoinGame);

    gameSocket.on('request username', requestUserName);

    gameSocket.on('receive username', receivedUsername);
}

function onDisconnect (){
    var i = gameInsession.indexOf(gameSocket);
    gameInsession.splice(i, 1);
}

function newMove (move){
    const gameId = move.gameId;
    io.to(gameId).emit('opponent move', move);
}

function newGame(){
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});
    this.join(gameId);
}

function playerJoinGame (idData){
    var socket = this;

    var room = io.sockets.adapter.rooms[idData.gameId]

    if (room === undefined) {
        this.emit('status' , "This game session does not exist." );
        return
    }
    if (room.length < 2) {
        idData.mySocketId = sock.id;

        sock.join(idData.gameId);

        console.log(room.length)

        if (room.length === 2) {
            io.sockets.in(idData.gameId).emit('start game', idData.userName)
        }

        io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);

    } else {
        this.emit('status' , "There are already 2 people playing in this room." );
    }
}

function requestUserName (gameId){
    io.to(gameId).emit('give userName', this.id);
}

function receivedUsername (data){
    data.socketId = this.id;
    io.to(data.gameId).emit('get Opponent Username', data);
}
exports.initialize = initialize