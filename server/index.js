require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");

const passport = require('passport');
require('dotenv').config();
const Auth0Strategy = require("passport-auth0");


const port = 3001;

const app = express();

let place = '/'
let monsters = [{name: 'Slime', description: 'A small slime, early adventurers thrive off these.', HP: 10, strength: 1, defense: 3, speed: 2, expValue: 10, gold: 2, image: 'http://www.realfast.dk/wp-content/uploads/2017/01/slime-jump.gif'},
{name: 'Small Goblin', description: 'Small green creature. Not usually feared unless in groups.', HP: 15, strength: 2, defense: 1, speed: 3, expValue: 12, gold: 1, image: 'https://opengameart.org/sites/default/files/Goblin_idle.gif'},
{name: 'Zombio', description: 'An undead, no one knows why they have risen again.', HP: 20, strength: 3, defense: 0, speed: 1, expValue: 14, gold: 2, image: 'https://i.pinimg.com/originals/2a/99/a8/2a99a878e17b7527ea1f72b7730c6be9.gif'},
{name: 'Lion', description: 'Large muscly cat. The females do most of the work.', HP: 18, strength: 3, defense: 2, speed: 3, expValue: 20, gold: 0, image: 'https://i.pinimg.com/originals/2a/99/a8/2a99a878e17b7527ea1f72b7730c6be9.gif'}]

let shop = []
// [{name: 'Knife', pwr: 1, spd: 1, def: 0, price: 10, type: 'weapon', abilityTypes: ['slashing', 'stabbing', 'knives']}, 
//             {name: 'Sword', pwr: 1, spd: 0, def: 1, price: 12, type: 'weapon', dmgType: ['slashing', 'swords']},
//             {name: 'Axe', pwr: 2, spd: 0, def: 0, price: 14, type: 'weapon', dmgType: ['slashing', 'axes']}, 
//             {name: 'Helmet', pwr: 1, spd: 0, def: 1, price: 12, type: 'head'}, 
//             {name: 'Leather Armor', pwr: 1, spd: 0, def: 1, price: 12, type: 'chest'}, 
//             {name: 'Bracelet', pwr: 1, spd: 0, def: 1, price: 12, type: 'arms'}, 
//             {name: 'High heels', pwr: 1, spd: 0, def: 1, price: 12, type: 'legs'}]

const {getClasses, getRaces, createNewHero, getHeroes, demoHero, getMap, newPlace} = require('./controllers/mainController.js')

// SAVED FOR BUILD
// app.use(express.static(`${__dirname}/public/build`));


massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
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


    // return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})



passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

app.get('/api/login', passport.authenticate('auth0', {
        successRedirect: 'http://localhost:3000/games/MegaRPG/CharacterSelect', 
        failureRedirect: `http://localhost:3001/login`
    }
))


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
    console.log(newRes)
    res.status(200).send(response)
  })
})

app.get('/api/getUser', (req, res, next) => {
  if(req.user) {
    res.status(200).json(req.user.user_id)
  }
  next()
})


app.get('/api/getHeroes', getHeroes)

app.get('/api/getClasses', getClasses)
app.get('/api/getRaces', getRaces)

app.post('/api/newHero', createNewHero)

app.get('/api/getMap/:X/:Y', getMap)
app.post('/api/newPlace', newPlace)


//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});