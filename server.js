const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: "John",
      email: "john@email.com",
      password: "cookies",
      enteries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: "Sally",
      email: "Sally@email.com",
      password: "bananas",
      enteries: 0,
      joined: new Date()
    },
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
    
  // Load hash from your password DB.
  bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
  });
  bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
  });

  // this still needs to be setup to check for user data in the DB (to be added)
  if(req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {

    res.json('Success');
  } else {
    res.status(400).json('error logging in');
  }

})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    enteries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if(!found) {
    res.status(400).json("no such user");
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.enteries++;
      return res.json(user.enteries);
    }
  })
  if(!found) {
    res.status(400).json("no such user");
  }
})

app.listen(3000, () => {
  console.log("Server has started");
});
