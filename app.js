const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server);

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

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', socket => {
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });