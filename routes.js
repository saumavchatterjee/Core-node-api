const aboutHandeler = require("./handler/about");
const notfound = require("./handler/notfoud");
const { token } = require("./handler/token");
const tokenHandeler = require("./handler/token");
const userHandeler = require("./handler/user");



const routes  = {};


routes.route = {
    
    'about':aboutHandeler.about,
    'user':userHandeler.user,
    'notfound': notfound.pagenotfound,
    'token':tokenHandeler.token

}


module.exports =routes;
