const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
var http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
      origins: ['http://localhost:4200']
  }
});

const errorHandler = require('./helpers/error-handler');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(jwt());

app.use('/user', require('./routes/user.router'));
app.use(errorHandler);

var rooms = {}

io.on('connection', (socket) =>{


  socket.on('message', (msg) => {
    socket.broadcast.emit('message-broadcast', msg);
   });

   socket.on('joinroom', function(room) {
     this.join(room);
     if(typeof rooms[room] === "undefined") rooms[room] = {};
     rooms[room].count = rooms[room].total ? rooms[room].total + 1 : 1;
     io.to(room).emit("new user", rooms[room].count)
     console.log(rooms[room].count);


   });
})

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;


http.listen(port, function (req, res) {
  console.log('Server listening on port ' + port);
});


// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });