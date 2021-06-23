require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport')
const initializePassport = require("./passport-config");
var cookieParser = require('cookie-parser')
const flash = require('express-flash');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const morgan = require('morgan');
const cors = require('cors');



var refreshTokens = []

initializePassport(
  passport,
  email => {return users.find(user=> user.email === email)},
  id => users.find(user => user.id == id)
)

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false 
}));
app.use(flash());
app.use(cors()); 
app.use(session({
  secret: 'somesecret',
  resave: false,
  saveUninitialized: false,  
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


app.post('/api/authme',(req,res,nex)=>{
  let username = {name:req.body.name};
  
  let access_token = generateAccessToken(username)
  let refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.setHeader("Authorization","Bearer "+access_token);

  //req.headers.authorization = "Bearer "+access_token
  res.cookie('Token',"Bearer "+access_token, { maxAge: 900000, httpOnly: false});

  res.json({access_token:"Bearer "+access_token, refreshToken:refreshToken})
  console.log(req.cookies)
  res.end();
  
  nex();
  

})

app.get('/api/profile', authenticateToken, (req, res)=>{
  res.send('welcome')
})


app.post('/api/token', (req, res)=>{
  let refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
    if (err) return res.sendStatus(403)
    let accessToken = generateAccessToken({name:user.name})
    res.json({accesstoken:accessToken})
  })
})


app.delete('/api/logout',(req,res)=>{
  refreshTokens = refreshTokens.filter(token=> token !== req.body.token)
  res.sendStatus(204)
})


function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'20m'})
}

function authenticateToken(req, res, next){
  const autheader  = req.headers['authorization'];
  const token = autheader && autheader.split(' ')[1]
  console.log(req.headers);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(4000);
