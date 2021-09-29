const aboutHandeler = require("./handler/about");
const notfound = require("./handler/notfoud");
const userHandeler = require("./handler/user");



const routes  = {};


routes.route = {

    'about':aboutHandeler.about,
    'user':userHandeler.user,
    'notfound': notfound.pagenotfound

}


module.exports =routes;
