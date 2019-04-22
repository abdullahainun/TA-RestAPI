// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
let cors = require('cors')
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes")


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb://admin:jarkoM@abdullahainun.me:27017/aal?replicaSet=rs0&authSource=admin', { useNewUrlParser: true });
mongoose.connect('mongodb://admin:jarkoM@abdullahainun.me:27017/aal?replicaSet=rs0&authSource=admin', {
    useNewUrlParser: true
});

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 9090;


// Send message for default URL
app.get('/', (req, res) => res.send('Hello, Apa kabar. RestPI ini sudah bekerja loo'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Add headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running backend TA ainun server on port " + port);
});