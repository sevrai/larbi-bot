
var express = require('express');
var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scores.db');

  var request = require('request');

var app = express();

var keywords = 'giphytrending';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/on_change', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    //res.write('<iframe src="//tv.giphy.com/cs" width="1400" height="800" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/12pePyUe8EjhKM">via GIPHY</a></p>');
    res.end('lol');
    console.log('Accessing the secret section ...');
    keywords = req.query.words;
    console.log(req.query.words);
});

app.get('/update', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.status(200);
  res.write(keywords);
  res.end();
  console.log('updated');
});

db.serialize(function() {
  db.run("CREATE TABLE if not exists users (ID INTEGER, name TEXT)");
  db.run("CREATE TABLE if not exists times (ID INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, start INTEGER, end INTEGER)", function(err){
    console.log(err, this);
  });

});

db.close();



app.get('/new/:id/:name', function(req, res){
  db = new sqlite3.Database('scores.db');
  res.setHeader('Content-Type', 'text/plain');
  res.status(200);
  db.all("SELECT * FROM users WHERE ID=?",req.params.id, function(err, rows){
    if (rows.length<=0) {
      db.run("INSERT into users (ID, name) VALUES ($id, $name)", {'$id':req.params.id, '$name':req.params.name.replace(/\+/gi)}, function(err){console.log(this)});
      res.json({
        "set_attributes":
          {

          },
        "messages":[
          {'text': 'nouvel utilisateur créé'}
        ]
      });
    }
  });
  db.close();
})

app.get('/resume', function(req, res){
  db = new sqlite3.Database('scores.db');
  res.setHeader('Content-Type', 'text/plain');
  res.status(200);
  db.all("SELECT * FROM users", function(err, users) {
    console.log(err, users, this);
    total = {};
    for (var i=0; i<users.length; i++) {
      total[users[i].ID] = {'nb':0, 'name':users[i].name};
      console.log(users[i]);
    }
    console.log(total);
    db.all("SELECT * FROM times", function(err, rows){
      console.log(err);
      for (row in rows) {
        if (rows[row].end != null) {
          var user_id = String(rows[row].user_id);
          if (total[user_id] != undefined) {
            total[user_id]['nb'] += rows[row].end - rows[row].start;
            console.log(total);
          }
        }
      }
      msg = []
      for (i in total) {
        console.log(i);
        msg.push({'text':total[i]['name']+' cumule '+total[i]['nb']+' secondes perdues'});
      }
      res.json({
        "set_attributes":
          {

          },
        "messages":msg
      });
      res.end();
      console.log('updated');
    })

  });
  db.close();
})

app.get('/stop/:id', function(req, res){
  db = new sqlite3.Database('scores.db');
  var date = new Date();
  var time2 = date.getTime();
  var id = parseInt(req.params.id.replace(/\+/gi, " "));
  db.all("select * from times where user_id = ? order by ID desc limit 1 ",id, function(err, rows){
    time1 = parseInt(rows[0].start);
    db.run("update times set end = $value where ID = $id", {'$id':rows[0].ID, '$value':time2}, function(err){
      console.log(this, time1)
      res.setHeader('Content-Type', 'text/plain');
      res.status(200);
      var diff = (time2-time1)/1000;
        res.json({
         "messages": [
            {
              "attachment":{
                "type":"template",
                "payload":{
                  "template_type":"generic",
                  "elements":[
                    {
                      "title":"voyons ce score...",
                      "image_url":"",
                      "buttons":[
                        {
                          "set_attributes":
                          {
                            "diff": diff
                          },
                          "type": "show_block",
                          "block_name": "result",
                          "title": "resultat"
                        }]
                    }]
                }}
            }]
        });
        res.end();
        console.log('updated');
    })

  });
  db.close();
});

app.get('/start/:id', function(req, res){
  db = new sqlite3.Database('scores.db');
var date = new Date();
var time = parseInt(date.getTime());
var id = parseInt(req.params.id.replace(/\+/gi, " "));
//insert new time with time1 :
db.run("INSERT into \"times\" (user_id, start) VALUES ($id, $time)", {'$id':id, '$time':time}, function(err){
  res.setHeader('Content-Type', 'text/plain');
  console.log(this, err, time, id)
  res.status(200);
  res.json({
     "messages": [
        {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":[
                {
                  "title":"c'est parti !",
                  "image_url":"http://www.lepoint.fr/images/2012/05/02/debat-566573-jpg_388849_660x281.JPG",
                  "buttons":[
                    {
                      "set_attributes":
                      {
                        "time_id": this.lastID
                      },
                      "type": "show_block",
                      "block_name": "stop_block",
                      "title": "J'ai fini !"
                    }]
                }]
            }}
        }]
    });
    res.end();
    console.log('updated');
});
db.close();

});

app.get('/', function(req, res) {
    res.render('tv.ejs');
});


var port_number = app.listen(process.env.PORT || 3000);
