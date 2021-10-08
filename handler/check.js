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

  console.log(resquestobj);

  const protocol =
    typeof resquestobj.body.protocol === "string" &&
    ["http", "https"].indexOf(resquestobj.body.protocol) > -1
      ? resquestobj.body.protocol
      : false;
  const method =
    typeof resquestobj.body.method === "string" &&
    ["GET", "POST"].indexOf(resquestobj.body.method) > -1
      ? resquestobj.body.method
      : false;
  const url =
    typeof resquestobj.body.url === "string" && resquestobj.body.url.length > 0
      ? resquestobj.body.url
      : false;
  const successcodes =
    typeof resquestobj.body.successcodes === "object" &&
    resquestobj.body.successcodes instanceof Array
      ? resquestobj.body.successcodes
      : false;
  const timeout =
    typeof resquestobj.body.timeout === "number" &&
    resquestobj.body.timeout > 0 &&
    resquestobj.body.timeout < 5 &&
    resquestobj.body.timeout % 2 == 0
      ? resquestobj.body.timeout
      : false;
  const token =
    typeof resquestobj.headers.token === "string" &&
    resquestobj.headers.token.length > 0
      ? resquestobj.headers.token
      : false;
  
  console.log(protocol);
  console.log(method);
  console.log(url);
  console.log(successcodes);
  console.log(token);

  if(protocol && method && url && successcodes && timeout){

      if (token) {
        datamodel.read("tokens", token, (error, tokendata) => {
          if (tokendata) {
            const phone = JSON.parse(tokendata).phone;

            datamodel.read('users',phone,(err,userdata)=>{

              if(!err && userdata){

                let userobj = JSON.parse(userdata);

                  _token.verify(token, phone, (verified) => {
                    if (verified) {
                      let checkid = serialgenerate(20);

                      let checksobj =
                        typeof userobj.checks === "object" &&
                        userobj.checks instanceof Array
                          ? userobj.checks
                          : [];
                     
                      const checkdata = {
                        checkid,
                        phone,
                        protocol,
                        method,
                        url,
                        successcodes,
                        timeout,
                      };

                      if (checksobj.length < 5) {
                        datamodel.create(
                          "checks",
                          checkid,
                          checkdata,
                          (err) => {
                            if (!err) {

                              userobj.checks = checksobj;
                             userobj.checks.push(checkid);

                              datamodel.update(
                                "users",
                                phone,
                                userobj,
                                (err) => {
                                  if (!err) {
                                    callback(200, {
                                      msg: "Added Successfully",
                                    });
                                  } else {
                                    callback(500, { msg: "Server Error!" });
                                  }
                                }
                              );
                            } else {
                              callback(503, {
                                error: "There is problem in server side!",
                              });
                            }
                          }
                        );
                      } else {
                        callback(400, {
                          error: "You have reached maximum no of Limit.",
                        });
                      }


                    } else {
                      callback(403, {
                        error: "Authorization Error or token expired.",
                      });
                    }
                  });


              }else 
              {
                 callback(404, { error: "User Not Found!" });
              }

            })


           
         


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

