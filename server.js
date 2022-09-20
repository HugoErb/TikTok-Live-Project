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

router.post('/handle', (request, response) => {
  console.log("Ajout de " + request.body.number + " " + request.body.type)
  request.app.io.emit('document', request.body);
  response.end("yes")
});

// add router in the Express app.
app.use("/", router);

http.listen(8080, () => {
  console.log('App now running on port 8080');
});
