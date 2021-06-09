require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport')
const initializePassport = require("./passport-config");

const flash = require('express-flash');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const morgan = require('morgan');
const cors = require('cors');



const users = [
  {id: '12',email: 'h@h.com', password: 'h', name:'hema'}
]

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


app.use(passport.initialize());
app.use(passport.session());


app.post('/api/authme',(req,res)=>{
  let username = req.body.name;
  let access_token = "BEARER "+jwt.sign({name: username}, process.env.ACCESS_TOKEN_SECRET)

  res.writeHead(200, {"Authorization":access_token})
  res.end("done")
})

app.get('/api/profile', authenticateToken, (req, res)=>{
  res.send('welcome')
})



app.post('/api/login', (req, res, next) =>{
  passport.authenticate('local', (err, user, info) => {
    if (err){ 
      return next(err);
    }
    if (!user){
      return res.status(400).send([user, "!cannot log in", info])
    }
    req.login(user, (err) => {
      res.send(req.session.user)
    })
  })(req,res, next)
})

app.post('/api/register', async (req, res)=>{
  let name = "Hema";
  let email = req.body.email;
  let password = req.body.password;

  try{
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({
      id: Date.now().toString(),
      name:name,
      email:email,
      password:hashedPassword
    })
    res.send(200)
  } catch(e){
    res.redirect('/register')
  }
  console.log(users)
})


//app.post('/api/login', checkNotAuthenticated, 
//passport.authenticate('local',{
//  successRedirect:'/',
//  failureRedirect:'/login',
//  failureFlash: true

//}));

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/login')
  }
  next()
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/login')
  }
  next()
}

function authenticateToken(req, res, next){
  const autheader  = req.headers['authorization'];
  const token = autheader && autheader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })

}

app.listen(8081);


