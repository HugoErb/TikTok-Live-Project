// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
const router = express.Router();

// Create new instance of the express server
var app = express();

const http = require('http').Server(app);

const optionsCors = {
  cors: {
    origin: 'http://localhost:4200',
    methods: ["GET", "POST"]
  }
};

const io = require('socket.io')(http, optionsCors);

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.io = io;

router.post('/stream', (request, response) => {
  // console.log("Ajout de " + request.body.number + " " + request.body.type)
  request.app.io.emit('document', request.body);
  response.end("yes")
});

router.post('/viewer_count', (request, response) => {
  // console.log("Viewers :" + request.body.viewer_count)
  request.app.io.emit('viewer_count', request.body);
  response.end("yes")
});

router.post('/max_viewer_count', (request, response) => {
  // console.log("Max de viewers :" + request.body.max_viewer_count)
  request.app.io.emit('max_viewer_count', request.body);
  response.end("yes")
});

router.post('/like_count', (request, response) => {
  // console.log("Likes :" + request.body.like_count)
  request.app.io.emit('like_count', request.body);
  response.end("yes")
});

router.post('/follower_count', (request, response) => {
  // console.log("Nouveaux followers :" + request.body.follower_count)
  request.app.io.emit('follower_count', request.body);
  response.end("yes")
});

router.post('/sub_count', (request, response) => {
  // console.log("Nouveaux subs :" + request.body.sub_count)
  request.app.io.emit('sub_count', request.body);
  response.end("yes")
});

router.post('/share_count', (request, response) => {
  // console.log("Shares :" + request.body.share_count)
  request.app.io.emit('share_count', request.body);
  response.end("yes")
});

router.post('/comment_count', (request, response) => {
  // console.log("Commentaires :" + request.body.comment_count)
  request.app.io.emit('comment_count', request.body);
  response.end("yes")
});

router.post('/gift_count', (request, response) => {
  // console.log("Gifts :" + request.body.gift_count)
  request.app.io.emit('gift_count', request.body);
  response.end("yes")
});

router.post('/gift', (request, response) => {
  // console.log("Nouveau gift :" + request.body.gift)
  request.app.io.emit('gift', request.body);
  response.end("yes")
});

router.post('/comment', (request, response) => {
  // console.log("Comment :" + request.body)
  request.app.io.emit('comment', request.body);
  response.end("yes")
});

router.post('/coin_count', (request, response) => {
  // console.log("Pièces :" + request.body.coin_count)
  request.app.io.emit('coin_count', request.body);
  response.end("yes")
});

router.post('/join_count', (request, response) => {
  // console.log("Joins :" + request.body.join_count)
  request.app.io.emit('join_count', request.body);
  response.end("yes")
});

router.post('/connected_state', (request, response) => {
  console.log("Connected :" + request.body)
  request.app.io.emit('connected_state', request.body);
  response.end("yes")
});

// add router in the Express app.
app.use("/", router);

http.listen(8080, () => {
  console.log('App now running on port 8080');
});
