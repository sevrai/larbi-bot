
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

  db.run("CREATE TABLE if not exists user (id NUMBER, name TEXT)");
  
});

db.close();

app.get('/new/:id/:name', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.status(200);
  res.json({
    "set_attributes":
    {
      "added": "1"
    }
  })
})

app.get('/larbi/:time1/:id', function(req, res){
var date = new Date();
var time = date.getTime();
var time1 = parseInt(req.params.time1.replace(/\+/gi, " "));
var diff = (time-time1)/1000;
res.setHeader('Content-Type', 'text/plain');
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
});

app.get('/larbi', function(req, res){
var date = new Date();
var time = date.getTime();

res.setHeader('Content-Type', 'text/plain');
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
                      "time1": time
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

app.get('/', function(req, res) {
    res.render('tv.ejs');
});


var port_number = app.listen(process.env.PORT || 3000);
