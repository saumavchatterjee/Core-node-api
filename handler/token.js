const { hash, tokengenerate } = require("../config");
const datamodel = require("../lib/datamodel");

const tokenHandeler = {};



tokenHandeler.token = (resquestobj, callback)=>{

    const allowedmethods = ['get','post','put','delete'];
   
    if(allowedmethods.indexOf(resquestobj.method) > -1 ){
        //console.log(resquestobj.method);
        tokenHandeler._token[resquestobj.method](resquestobj, (statuscode, err)=>{
            callback(statuscode, err);
        });
    }
    else {

        callback(401, "Unautohrized");
    }

}
tokenHandeler._token ={};

tokenHandeler._token.post = (resquestobj, callback)=>{
    console.log(resquestobj);
    const phone = typeof resquestobj.body.phone === 'string' && resquestobj.body.phone >= 10 ? resquestobj.body.phone  : false;
    const password = typeof resquestobj.body.password === 'string' && resquestobj.body.password > 0 ? resquestobj.body.password : false;
    console.log(phone + password);
    if(phone && password){

        datamodel.read('users',phone,(err,userdata)=>{
            if(!err && userdata){

                if (hash(password)=== JSON.parse(userdata).password){
                    let token = tokengenerate(20)
                    let tokendata = {
                        phone, 
                        token,
                        expires: Date.now() + 60 * 60 * 1000 
                    }

                    datamodel.create('tokens',token,tokendata,(error)=>{
                        if (!error){
                            callback(200,{msg:"Token created successfully!"});
                        }else 
                        {
                            callback(500,{error:"Try again later!"});
                        }

                    })

                }else{
                    callback(401,{error: "You have enterd wrong password!"});
                }             

            }else {
                callback(404,{error:"User not found!"});
            }
        })        

    }else {
        callback(400,{erro:"Invalid Input"});
    }
    
}
tokenHandeler._token.get = (resquestobj , callback)=>{

    const token =
    typeof resquestobj.queryObject.token === "string" &&
    resquestobj.queryObject.token.trim().length >0 
      ? resquestobj.queryObject.token
      : false;

    if (token){

      datamodel.read('tokens',token,(err, data)=>{
     
        if(!err && data){
          const tokendata = { ...JSON.parse(data)};
         
          callback(200,tokendata);
        }else {
          callback(404,{error:"Token not found"});
        }

      })

    }else {
      callback(400,{error:"Wrong Data!"});
    }

    
     
}
tokenHandeler._token.put = (resquestobj , callback)=>{

    
}
tokenHandeler._token.delete = (resquestobj , callback)=>{

  
    
}

tokenHandeler._token.verify = ( token, phone, callback ) => {

  

    if(token){

        datamodel.read('tokens',token,(err, data)=>{

            if(!err){

                if (
                  JSON.parse(data).phone === phone &&
                  JSON.parse(data).expires > Date.now()
                ) {
                   
                    callback(true);
                } else {
                  callback(false);
                }


            }else {
              callback(false)
            }
        })

    }else {
     callback(false);
    }
    
}

module.exports = tokenHandeler;

