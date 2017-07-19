
var express = require('express');
var http = require('http');

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

var punchlines = [" ici c'est pas confessions intimes, ta vie on s'en bat les couilles"," j'ai rencontré une taspé jlui ai dit tu veux me sucer ? s'te pute a refusé alors jlai sodomisée avec un baton mal taillé et j'me suis cassé",
                  " on t'nique ta mère et ta grand_mère si elle est encore en vie"," négro crois pas qu'on perd la chatte à ton père"," ni putes ni soumises font se réjouir ces sales connasses"," mon parcours est comme une queue de renoi, long et pénible",
                  " Pour parler à B20, faut être un bogoss, pas un looser"," n'aime pas seulement une go car elle est bonne et jolie, un gros cul d'déesse nous ferait faire des folies"," j'me dis que j'vais la tej mais wala qu'est-ce qu'elle est bonne",
                  " monsieur l'agent, la chatte à ta mère qui siffle tue"," si ça fait mal que tu cries que tu jouies c'est que j'suis dans ta chatte"," À ma sortie amène moi une petite pute, bête sans but, je la ferais crier du bout de ma longue bite",
                  " j'me lave le pénis à l'eau bénite"," t'écartes les cuisses pour un filet o fish et tu veux etre la mère de mes gosses, non c'est dead"," tu veux détroner l'duc, tu vas t'la prendre dans le ulc"," t'as jamais cru en moi et maintenant tu me suces",
                  " si y'avait des bites par terre, y'en a qui marcherait sur l'cul"," chaque mot"," j'te baise bâtard, viens nous sucer la bite"," j'ai plus de flow qu'une femme fontaine"," si tu veux pas t'faire enculer ne me donne pas tes fesses",
                  " c'est pas ici biatch faut qu'on baise vite"," moi faut pas m'faire chier !!! wech gros !!!"," ce mot n'existe pas dans le language de B20"," tu veux baiser sans sucer bouffonne, garde la pêche"," on t'nique ta mère et ta grand-mère si elle est encore en vie",
                  " blablabla"," Dou- double poney"," J'fais izi money"," Ici c'est 92 izi"," tient ta langue man takt it izi"," st'année je vais tout baiser sur la chatte à rama yade"," mais crois pas qu'on perd la chatte à ton père",
                  " st'année je vais tout baiser sur la chatte à Rama Yade"," t'es une grosse pute. si tu mets des porte-jartelles j'emmène dans un hotel mortel"," j'vais rentrer au pays, marier 4 grognasses qui m'obéissent"," Baby, fait moi la bise puis suce moi la bite",
                  " Qui a honte d'etre un négro, à part Mickael Jackson"," Tu veux baiser sans sucer bouffonne Garde la pêche"," chérie ni pute ni soumise, tu chipotes pas quand j'te tripote"," Garde la pêche"," tu crois qu'j'baise tout c'qu'y bouge, de boulogne, pont d'sèvres à pierrefite, ferme un peu ta gueule et vas m'faire un steak frites",
                  " tes grosses merdes se coupent en 2, essaye sans ton string ficelle"," mon son c’est king-kong parle-lui il avance à grands pas sans sucer quiconque"," comment ne pas être un pitbull quand la vie est une chienne"," j'ai toujours envie de baiser comme un singe bonobo",
                  " y'a ceux qui sucent des bites, négro, et y'a nous"," la vie est une chienne j'arrete pas d'en baiser"," j'ai pris la vie par derrière sans me poser de questions"," j'ai pris la vie dans mes bras, je l'ai serrée si fort je lui ai cassé le dos OOOH",
                  " on dit bonjour a tout le monde shaalom, saalem, saluut !"," ma descendance est morte dans un rouleau de sopalin"," mc j'tencule en chantant do re mi fa sol, la sodomie!"," c'est pas que j'aime pas me mélanger, mais disons simplement que les aigles ne volent pas avec les pigeons",
                  " tient ta langue man take it izi"," j'aimerais qu'on parle de moi aux nymphos, pas aux infos"," Done"," grosse merde"," trop fort"," b20 n'est soumis à aucune loi, il veut te répondre il le fait, sinon il t'emmerde"," quel phat ce tata !"," rtfm !!!!",
                  " essaye pas d'embrouiller B20, ça existe pas ça"," qui a honte d'etre un négro, à part mickael jackson"," wesh gros"," ta gueule couff"," ta gueule couffay"," Ok tkt"," comme un pitbull avant d'te baiser, j'te r'nifle le cul",
                  " comment ne pas être un pitbull quand la vie est une chienn","mon parcours est comme une queue de renoi, long et pénible"," wesh gros"];
var share_text = ["Montre que tu pèses dans l'game 👇", "Pose tes balls 👇", "Impose ton flow 👇"]
var insulte = [
  ["wesh ",", ta vie on s'en bat les couilles"],
  ["monsieur ", ", la chatte à ta mère qui siffle tue"],
  ["je n'aime pas seulement ", " car elle est bonne et jolie, un gros cul d'déesse nous ferait faire des folies"],
  [" j'te baise bâtard de ",", viens nous sucer la bite"],
  [" si tu veux pas t'faire enculer "," ,ne me donne pas tes fesses"],
  [" grosse merde\n",""]
  ];
var length = punchlines.length;
var length2 = share_text.length;
var length3 = insulte.length;

app.get('/booba', function(req, res){
  var rand = Math.floor(Math.random()*(length));
  var rand2 = Math.floor(Math.random()*length2);


  var punch = {
    'template_id' :'85711211',
    'username':'boobabot',
    'password':'lantiponer',
    'boxes':[
    {
        "text": punchlines[rand],
        "x": 50,
        "y": 80,
        "width": 400,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    }]
  };

//var data = {};
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'https://api.imgflip.com/caption_image',
  form:    punch
}, function(error, response, body){
  var data = JSON.parse(body);
  console.log(data.data.url);
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
                  "title":share_text[rand2],
                  "image_url":data.data.url,
                  "buttons":[
                    {
                      "type":"element_share"
                    }]
                }]
            }},
          "quick_replies": [
          {
            "title":"wesh une autre !",
            "block_names":["json loop"]
          },
          {
            "title":"nique un pote",
            "block_names":["blaz"]
          }]
        }]
    });
    res.end();
    console.log('updated');
});

});

app.get('/booba/:blaz', function(req, res){

  var rand = Math.floor(Math.random()*(length3));
  var blaz = req.params.blaz.replace(/\+/gi, " ");
  var van = insulte[rand][0]+blaz+insulte[rand][1];
  console.log(blaz)

  var punch = {
    'template_id' :'85711211',
    'username':'boobabot',
    'password':'lantiponer',
    'boxes':[
    {
        "text": van,
        "x": 50,
        "y": 80,
        "width": 400,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    }]
  };

//var data = {};
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'https://api.imgflip.com/caption_image',
  form:    punch
}, function(error, response, body){
  var data = JSON.parse(body);
  console.log(data.data.url);
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
                  "title":"👊🏾 mets lui lourd 👇🏿",
                  "image_url":data.data.url,
                  "buttons":[
                    {
                      "type":"element_share"
                    }]
                }]
            }},
          "quick_replies": [
          {
            "title":"plus lourd !",
            "block_names":["json loop 2"]
          },
          {
            "title":"une punchline",
            "block_names":["json loop"]
          }]
        }]
    });
    res.end();
    console.log('updated');
});

});


app.get('/larbi', function(req, res){

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
