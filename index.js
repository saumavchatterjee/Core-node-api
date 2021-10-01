
const http = require('http');
const { config } = require('process');
const congfig = require('./config');
const requesthelper = require('./helper/requestHelper');
const datamodel = require('./lib/datamodel');




const createserver = http.createServer(requesthelper.reqestoption);

// datamodel.create('test','99993','{data:this is a sample data}',(err) => {
//     console.log(err);
// })

// datamodel.read('test','9999',(err,data) => {
//     console.log(err+data);
// })

// datamodel.delete('test','9999',(err) => {
//     console.log(err);
// })
//console.log(congfig.hash("saumav"));

createserver.listen(3000,()=>{
    console.log(`Server Running at ${congfig.port}`);
})

