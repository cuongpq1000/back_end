const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const http = require('http');

const socket = require('socket.io')
const server = http.createServer(app);
const io = socket(server);
const gameLogic = require('./game/game_logic');

const errorHandler = require('./helpers/error-handler');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(jwt());

app.use('/user', require('./routes/user.router'));
app.use(errorHandler);


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;


app.listen(port, function (req, res) {
  console.log('Server listening on port ' + port);
});

io.on('connection', socket => {
  gameLogic.initialize(io, socket);
});

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });