require('dotenv').config()

const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const app = express();
const jwt = require("jsonwebtoken");
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

custom_user_data = [
    {email:'hema@mail.com',password:'1234567',name:'Hema omer'}
]

custom_posts = [
  {
    email:'jim@mail.com',
    title:'Welcome Jim'
  },
  {
    email:'hema@mail.com',
    title:'Welcome hema'
  },
]
//TODO tommorow when i wake up i should add refresh token and add AUth headers

app.get('/posts', authenticationToken, (req,res)=>{
  res.json(custom_posts.filter(post => post.email == req.body.email))
});

app.post('/api/login', (req, res)=>{
    
    let email = req.body.email;
    let password = req.body.password;
    //console.log(email);
    //console.log(password);
    //console.log(req);
    let creds = {Email: email, Pass:password};
    
    const accessToken = jwt.sign(creds, process.env.ACCESS_TOKEN_SECRET);
    
    res.json({accessToken:accessToken});
});

function authenticationToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  });

}

app.listen(8081);


