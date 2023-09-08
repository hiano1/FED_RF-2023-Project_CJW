import MainPage from "./pages/MainPage.js";
import Artist from "./core/API.js";
// var requirejs = require("requirejs");
// requirejs.config({
//     //Pass the top-level main.js/index.js require
//     //function to requirejs so that node modules
//     //are loaded relative to the top-level JS file.
//     nodeRequire: require,
// });
// require("dotenv").config();

// console.log("DB_HOST:", process.env.DB_HOST);

new MainPage(document.querySelector("#app"));

// class DataApi {
//     constructor(options) {}
// }
const api = new Artist();
let a = api.getArtistList();
let b = api.getAlbumList("Ariana Grande");
console.log(a[0].name);
