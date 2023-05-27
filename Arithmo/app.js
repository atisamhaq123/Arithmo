const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { clearInterval } = require('timers');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(path.join(__dirname, '')));

// Store connected users and their IDs
const connectedUsers = {};
const names={};
const scores={}; //userId:score
// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Generate a unique ID for the connected user
 // const userId = uuidv4();
  connectedUsers[socket.id] = socket.id;

  
  // Send the assigned user ID to the connected client
  socket.emit('userId', socket.id);
  
  io.emit('userList', Object.keys(connectedUsers));
  socket.on("sendname",function(nameX){
    names[socket.id]=nameX;
    socket.emit('receiveName', nameX);
    io.emit('SetNames', names)
  });

  

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // Remove the user ID from connectedUsers
    delete connectedUsers[socket.id];
    io.emit('disconnected', socket.id);
  });

  io.emit('quizQuestion',question);
  socket.on("checkmyanswer",function(data){
    let validate=checkAnswer(data.answerr)
    if(validate){
      io.emit("welldone",names[data.userid],data.userid);
      updateScores(data.userid);
      
      io.emit("break","");
      clearInterval(waitingCntDown);
      clearInterval(countdownInterval);
      transmit(5); //next question in 5 seconds    
    }

  });
    
});

function ask() {
  var a = Math.floor(Math.random() * 100) + 1;
  var b = Math.floor(Math.random() * 100) + 1;
  var op = ["*", "+", "/", "-"][Math.floor(Math.random()*4)];
  var x= "How much is " + a + " " + op + " " + b + "?";
  var y=eval( a + op + b);
  let yz=y.toString().split('.');
  if (yz.length>1){
      if (yz[1].trim().length>1){
        y = parseFloat(y.toString().split('.')[0] + '.' + y.toString().split('.')[1].slice(0, 2))
      }
      else if (yz[1].trim().length>0){
        y = parseFloat(y.toString().split('.')[0] + '.' + y.toString().split('.')[1].slice(0, 1))
      }
  }
   
  return [x,y]
}
// Function to emit an event with timestamp
var question,answer;
function emitEvent() {
  // Emit a custom event called 'quizQuestion' with current timestamp
  let [ques,ans]=ask();
  question=ques;
  answer=ans;
  io.emit('quizQuestion',question);
}

function updateScores(id){
  if (Object.keys(connectedUsers).length>1){
    if(scores[id]==undefined){
      scores[id]=1;
    }
    else{
      scores[id]=scores[id]+1;
    }
    io.emit('updateScores',scores);
  } 
 
}
function checkAnswer(ansiiiii){
  return answer==ansiiiii;
}

let countdownInterval;
function transmit(remainingSeconds1) {
  let remainingSeconds = remainingSeconds1;
   countdownInterval = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
      emitEvent();
      startResponseTimer(); // Start the countdown for waiting for response
     
    }
    remainingSeconds-=1;
  }, 1000);
}

//waiting for response
let waitingCntDown;
function startResponseTimer() {
  let waitingsec = 30;
  waitingCntDown = setInterval(() => {
    io.emit('remainingSeconds', waitingsec);
    if (waitingsec <= 0) {
      clearInterval(waitingCntDown);
      transmit(0);
      
    }
    waitingsec-=1;
  }, 1000);
}

transmit(0);
// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
