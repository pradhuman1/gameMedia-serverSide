"use strict";

const express = require('express');

const fetch = require('node-fetch');

const app = express();

const fs = require('fs');

const path = require('path');

const botDirectory = path.join(__dirname, '../../getMeAGame/dist');

const cors = require('cors');

const mongoose = require('mongoose');

const gameNames = [];
const gameSchema = new mongoose.Schema({
  name: {
    type: String
  },
  slug: {
    type: String
  },
  background_image: {
    type: String
  },
  platforms: {
    type: Array
  },
  clip: {
    type: String
  },
  rating: {
    type: Number
  },
  rating_top: {
    type: Number
  },
  ratings_count: {
    type: Number
  },
  released: {
    type: String
  },
  short_screenshots: {
    type: Array
  },
  stores: {
    type: Array
  },
  reviews: {
    type: Array
  },
  genres: {
    type: Array
  }
});
const Game = mongoose.model('game', gameSchema); // Game.ensureIndex({name: 1, slug: 1}, {unique: true, dropDups: true});

var game;
app.use(express.static(botDirectory));
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/gameName', async (req, res) => {
  var gameData;
  game = await req.body.name;
  game = game.replace(/ /g, "-");
  game = game.toLowerCase();
  console.log(game);

  try {
    var data = await Game.find({
      "slug": game
    }).exec();
  } catch (error) {
    console.log("Data:", error);
  }

  res.send(data);
}); // async function getData(){
//     var data={
//         next:"https://api.rawg.io/api/games?page=1501"
//     }
//     console.log("start")
//     while(data.next!=="https://api.rawg.io/api/games?page=1502"){
//         console.log(data.next);
//         // console.log("G");
//         var response=await fetch(data.next)
//         var data = await response.json();
//         for(var i=0 ;i<data.results.length ;i++ ){
//             var curr=data.results[i];            
//             try{
//                 if(curr.clip){        
//                     var gamesData = {
//                         name:curr.name,
//                         slug:curr.slug,
//                         background_image:curr.background_image,
//                         platforms : curr.platforms,
//                         clip:curr.clip.clips[640],
//                         rating:curr.rating,
//                         rating_top:curr.rating_top,
//                         ratings_count:curr.ratings_count,
//                         released:curr.released,
//                         short_screenshots:curr.short_screenshots,
//                         stores:curr.stores,
//                         reviews:[],
//                         genres:curr.genres
//                     }
//                 }
//                 else{
//                     var gamesData = {
//                         name:curr.name,
//                         slug:curr.slug,
//                         background_image:curr.background_image,
//                         platforms : curr.platforms,
//                         clip:null,
//                         rating:curr.rating,
//                         rating_top:curr.rating_top,
//                         ratings_count:curr.ratings_count,
//                         released:curr.released,
//                         short_screenshots:curr.short_screenshots,
//                         stores:curr.stores,
//                         reviews:[],
//                         genres:curr.genres
//                     } 
//                 }
//             }catch(err){
//                 console.log("ERR : "+1+"   "+err);  
//             }
//             try{
//             const game = await Game.create(gamesData);  
//             }catch(err){
//                 console.log("ERR : 1" + err);
//             }      
//         };
//     }
// }

app.listen(8000, async () => {
  const db = await mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0-j0r9m.mongodb.net/gamesDb?retryWrites=true&w=majority'); // getData();

  console.log('ON PORT 8000');
});