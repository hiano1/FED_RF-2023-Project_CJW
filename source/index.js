import MainPage from "./pages/MainPage.js";
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
