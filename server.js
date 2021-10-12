const express = require('express')
var passport = require("passport");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");
var localStrategy = require("passport-local");
var flash    = require("connect-flash")
var middlewares = require("./middlewares/middleware");
const PORT = process.env.PORT || 3000
const app = express();
const http = require('http').createServer(app);

mongoDbStr = "mongodb://localhost:27017/chat";

mongoose.connect(mongoDbStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(require('express-session')({
    secret: "My name is MD Ripon Islam",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var sl = require("./routs/signup-login");
app.use(sl);


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname + '/public'))

app.get('/',middlewares.isLoggedIn, (req, res) => {
    res.render('index',{user: req.user})
})






var onlineUsers = [];






const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('Connected...')

    socket.on('message', (msg) => {
         io.to(msg.to.id).emit('message', { msg : msg.message,from : { user : msg.from.user , id : msg.from.id} } );
     
    })

    socket.on('join', function(data) {
       
        socket.join(data.id);
        if (!onlineUsers.find(x => x.id === data.id)) {
            onlineUsers.push({
                username: data.username,
                id: data.id
            })
        }
        socket.broadcast.emit("erteERERDCXZ", onlineUsers);
        io.to(data.id).emit('erteERERDCXZ', onlineUsers);
    })

    socket.on('disconnect', function(s) {});



})


/*
setTimeout(() => {
  process.exit(1) // death by random timeout
}, Math.random() * 10000);*/

