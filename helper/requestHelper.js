const url = require('url');
const path = require('path');
const fs = require('fs');
const routes = require('../routes');


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

        requestobject.body= JSON.parse(body);
         selectedHandler(requestobject, (statuscode, data) => {
           res.writeHead(statuscode);
           res.write(data);
           res.end();
         });


    });
   res.end();
}

module.exports = requesthelper;
