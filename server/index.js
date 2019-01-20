require('dotenv').config();

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");

const passport = require('passport');
const Auth0Strategy = require("passport-auth0");

let returnStr = '/'


const port = 3001;

const app = express();

let place = '/'

let shop = []

const {getClasses, getRaces, createNewHero, getHero, demoHero, getMap, newPlace, getMonsters, getUserCharm, getMonster, addUserInfo} = require('./controllers/mainController.js')

const {pixMons, pixWeapons, submitArt, submitHeroArt} = require('./controllers/pixArtController')

// SAVED FOR BUILD
// app.use(express.static(`${__dirname}/public/build`));


massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log('massive-err', err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000
    }
  })
);

app.use( passport.initialize() )
app.use( passport.session() )

passport.use( 
    new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/api/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    
    app.get('db').getUserByAuthId([profile.id]).then(response => {

        if(!response[0]) {
            app.get('db').createUserByAuthId([profile.id, 'email'])
            .then(created => {
                return done(null, created[0])
            })
        } else {
            return done(null, response[0])
            
        }
    })

  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})



passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

app.get('/api/login', passport.authenticate('auth0', {
        failureRedirect: `http://localhost:3001/login`
    }), (req, res) => {
      res.redirect(`http://localhost:3000${returnStr}`)
    }
)


app.post('/api/redirect', (req, res, next) => {
  returnStr = req.body.place
  res.status(200).send(returnStr)
})


app.get('/api/demo', demoHero)


app.get('/api/getMonster', (req, res) => {
  var item = monsters[Math.floor(Math.random()*monsters.length)]
  res.send(item)
})
app.get('/api/getShop', (req, res) => {
  const dbInstance = req.app.get('db');

  dbInstance.getShopItems().then( response => {
    let newRes = response.map(item =>{
      
      return item
    })
    res.status(200).send(response)
  })
})

app.get('/api/getUser', (req, res, next) => {
  if(req.user) {
    console.log('is a user')
    res.status(200).json(req.user)
    // call steven so he can have a look
  }
  else res.sendStatus(500)
})


app.get('/api/getHero', getHero)

app.get('/api/getClasses', getClasses)
app.get('/api/getRaces', getRaces)

app.post('/api/newHero', createNewHero)

app.get('/api/getMap/:X/:Y', getMap)
app.post('/api/newPlace', newPlace)

app.get('/api/getMonster/:X/:Y', getMonster)
app.get('/api/getMonsters/:X/:Y', getMonsters)

app.get('/api/pixMons', pixMons)
app.get('/api/pixWeapons', pixWeapons)

app.post('/api/submitArt', submitArt)
app.post('/api/submitHeroArt', submitHeroArt)


app.get('/api/getCharm', getUserCharm)
app.post('/api/addUserInfo', addUserInfo)

//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});