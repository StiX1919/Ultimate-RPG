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
// [{name: 'Knife', pwr: 1, spd: 1, def: 0, price: 10, type: 'weapon', abilityTypes: ['slashing', 'stabbing', 'knives']}, 
//             {name: 'Sword', pwr: 1, spd: 0, def: 1, price: 12, type: 'weapon', dmgType: ['slashing', 'swords']},
//             {name: 'Axe', pwr: 2, spd: 0, def: 0, price: 14, type: 'weapon', dmgType: ['slashing', 'axes']}, 
//             {name: 'Helmet', pwr: 1, spd: 0, def: 1, price: 12, type: 'head'}, 
//             {name: 'Leather Armor', pwr: 1, spd: 0, def: 1, price: 12, type: 'chest'}, 
//             {name: 'Bracelet', pwr: 1, spd: 0, def: 1, price: 12, type: 'arms'}, 
//             {name: 'High heels', pwr: 1, spd: 0, def: 1, price: 12, type: 'legs'}]

const {getClasses, getRaces, createNewHero, getHeroes, demoHero, getMap, newPlace, getMonsters} = require('./controllers/mainController.js')

const {pixMons, pixWeapons, submitArt} = require('./controllers/pixArtController')

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
  console.log(req.body)
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
    res.status(200).json(req.user.user_id)
  }
  else res.status(500).json('No user')
})


app.get('/api/getHeroes', getHeroes)

app.get('/api/getClasses', getClasses)
app.get('/api/getRaces', getRaces)

app.post('/api/newHero', createNewHero)

app.get('/api/getMap/:X/:Y', getMap)
app.post('/api/newPlace', newPlace)

app.get('/api/getMonsters', getMonsters)

app.get('/api/pixMons', pixMons)
app.get('/api/pixWeapons', pixWeapons)

app.post('/api/submitArt', submitArt)

//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});