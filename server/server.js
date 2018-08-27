
require('dotenv').config()
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require('massive')



const port = 3001;

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
  })
  .catch(err => console.log(err))

app.use(json());
app.use(cors());





//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});