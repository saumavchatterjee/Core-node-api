const url = require('url');
const path = require('path');
const fs = require('fs');
const routes = require('../routes');
<<<<<<< HEAD
const {isJSON} = require('../config');
=======
const { isjson } = require('../config');
>>>>>>> f0ad83eb678a2c3e69c027de9696f6cb7cd70f1a


const requesthelper = {};

requesthelper.reqestoption = (req,res)=>{


    const parsedUrl = url.parse(req.url, true);
    const pathname =  parsedUrl.pathname;
    const queryObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers =  req.headers;
    const trimpath =  pathname.replace(/^\/+|\/+$/g,'');

    const requestobject ={
        parsedUrl,
        pathname,
        queryObject,
        method,
        headers,
        trimpath
    }

    const selectedHandler = routes.route[trimpath] ? routes.route[trimpath]  : routes.route['notfound'];

    //console.log(selectedHandler);

    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {

<<<<<<< HEAD
        requestobject.body = isJSON(body) ? JSON.parse(body) : {};
         selectedHandler(requestobject, (statuscode, data) => {
=======
        requestobject.body= isjson(body)?JSON.parse(body):{};

        selectedHandler(requestobject, (statuscode, data) => {

        data = typeof data   ==='object'? data : {};

        const datastring = JSON.stringify(data);
        res.setHeader('Content-Type', 'application/json');
>>>>>>> f0ad83eb678a2c3e69c027de9696f6cb7cd70f1a
        res.writeHead(statuscode);
        res.end(datastring);
        });

         

    });
  // res.end();
}

module.exports = requesthelper;
