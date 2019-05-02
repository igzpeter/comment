// je vais chercher le driver sqlite3 dans node_modules
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const dbFile = 'fish.db';
const db = new sqlite3.Database(dbFile);


// sans db.serialize.
// les operations sont lancées en même temps.
// le INSERT risque d'etre executé.
// avant que la creation de la table soit finie.



db.serialize(() => {

  // if ( !fs.existsSync(dbFile) ) {}


//CREATION TABLE COMMENT
db.run('CREATE TABLE comment(comment_id INTEGER PRIMARY KEY AUTOINCREMENT, comment_name TEXT)')

  //SELECT TABLE DANS LE TERMINAL CMD
  db.all('SELECT * FROM comment', function (error, data) {
    if (!error) console.log(data);
    else console.log(error);
  });
})

  //STOK LES DATAS DANS TABLE COMMENT (POST)
  app.post('/comment', function (request, response) {
  //INSERT LES DATAS DU FORMULAIRE FRONT DANS LA TABLE COMMENT
  db.run('INSERT INTO comment (comment_name) VALUES (?)', 
  // J'utilise request.body pour recupere la valeur envoye par le front et l'insere ds ma BDD
  request.body.comment_name, // Je defini les valeurs envoyée a la BDD
    function (error, data) { // Defini une fonction qui renvoie ma reponse au front
      response.send(request.body.comment_name);
    });

});


//REPONSE  VERS LE FRONT
app.get('/comment', function (request, response) {
  db.all('SELECT * FROM comment', function (error, data) {
    response.send(data);
  })
});

//LISTEN SUR LE PORT 10000 EN HTTP LOCAL
app.listen(11000, function (error) {
  if (!error) {
    console.log('app listening port 11000');
  }
});
