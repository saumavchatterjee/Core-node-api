const { hash, checkgenerate, serialgenerate } = require("../config");
const datamodel = require("../lib/datamodel");
const { _token } = require("./token");

const checkHandeler = {};



checkHandeler.check = (resquestobj, callback)=>{

    const allowedmethods = ['get','post','put','delete'];
   
    if(allowedmethods.indexOf(resquestobj.method) > -1 ){
        //console.log(resquestobj.method);
        checkHandeler._check[resquestobj.method](resquestobj, (statuscode, err)=>{
            callback(statuscode, err);
        });
    }
    else {

        callback(401, "Unautohrized");
    }

}
checkHandeler._check ={};

checkHandeler._check.post = (resquestobj, callback)=>{

  const protocol = typeof resquestobj.protocol ==='string' && ['http','https'].indexOf(resquestobj.protocol) > -1 ? resquestobj.protocol : false;
  const method= typeof resquestobj.method ==='string' && ['GET','POST'].indexOf(resquestobj.method) > -1 ? resquestobj.method : false;
  const url = typeof resquestobj.url ==='string' && resquestobj.url.length > 0 ? resquestobj.url : false;
  const successcodes = typeof resquestobj.successcodes ==='object' && resquestobj.successcodes instanceof Array ? resquestobj.successcodes : false;
  const timeout = typeof resquestobj.timeout ==='number' && resquestobj.timeout > 0 && resquestobj.timeout < 5  && resquestobj.timeout% 2 == 0 ? resquestobj.timeout : false;
  const token = typeof resquestobj.headers.token ==='string' && resquestobj.headers.token > 0 ? resquestobj : false;
  
  if(protocol && method && url && successcodes && timeout){

      if (token) {
        datamodel.read("tokens", token, (error, tokendata) => {
          if (tokendata) {
            const phone = JSON.parse(tokendata).phone;

            _token.verify(token, phone, (tokenobj) => {
              if (tokenobj) {

                let checkid =  serialgenerate(20);

                const checkdata = {

                  checkid,
                  phone,
                  protocol,
                  method,
                  url,
                  successcodes,
                  timeout
                  
                };



              } else {
                callback(403, {
                  error: "Authorization Error or token expired.",
                });
              }
            });
          } else {
            callback(403, { error: "Authorization Error! Invalid token." });
          }
        });
      } else {
        callback(403, { error: "Authorization Error!" });
      }


  }else {
       callback(400, { error: "Invalid Input!" });
  }

  
    
}
checkHandeler._check.get = (resquestobj , callback)=>{

  
    
     
}
checkHandeler._check.put = (resquestobj , callback)=>{

    
}
checkHandeler._check.delete = (resquestobj , callback)=>{

  
    
}



module.exports = checkHandeler;

