const { hash } = require("../config");
const datamodel = require("../lib/datamodel");

const userHandeler = {};



userHandeler.user = (resquestobj, callback)=>{

    const allowedmethods = ['get','post','put','delete'];
   
    if(allowedmethods.indexOf(resquestobj.method) > -1 ){
        //console.log(resquestobj.method);
        userHandeler._user[resquestobj.method](resquestobj, (statuscode, err)=>{
            callback(statuscode, err);
        });
    }
    else {

        callback(401, "Unautohrized");
    }

}
userHandeler._user ={};

userHandeler._user.post = (resquestobj, callback)=>{
    //console.log(resquestobj.body);
  // console.log(resquestobj.body.firstname);
  // console.log(resquestobj.body.phone);

  const username =
    typeof resquestobj.body.username === "string" &&
    resquestobj.body.username.trim().length > 0
      ? resquestobj.body.username
      : false;
  const phone =
    typeof resquestobj.body.phone === "string" &&
    resquestobj.body.phone.trim().length == 11
      ? resquestobj.body.phone
      : false;
  const email =
    typeof resquestobj.body.email === "string" &&
    resquestobj.body.email.trim().length > 0
      ? resquestobj.body.email
      : false;
  const password =
    typeof resquestobj.body.password === "string" &&
    resquestobj.body.password.trim().length > 0
      ? resquestobj.body.password
      : false;

  if (username && phone && email && password) {
    let userdata = {
      username,
      phone,
      email,
      password: hash(password)
    };

    datamodel.read('users', phone, (err, data) => {
       // console.log(err+data);

      if (err) {
        console.log(err);
        datamodel.create('users', phone, userdata, (err) => {
          if (!err) {
            callback(200, "{msg:User created Successfuly!}");
          }else {
             
               callback(500, "Unable to create Account!");
          }
        });
      } else {
        callback(400, "User Already Exists!");
      }
    });
  } else {
    callback(406, "Wrong input data!");
  }
}
userHandeler._user.get = (resquestobj , callback)=>{

  const phone =
    typeof resquestobj.queryObject.phone === "string" &&
    resquestobj.queryObject.phone.trim().length == 11
      ? resquestobj.queryObject.phone
      : false;

    if (phone){

      datamodel.read('users',phone,(err, data)=>{
     
        if(!err && data){
          const userdata = { ...JSON.parse(data)};
          delete userdata.password;
          callback(200,userdata);
        }else {
          callback(404,{error:"User not found"});
        }

      })

    }else {
      callback(400,{error:"Wrong Data!"});
    }

    

    
}
userHandeler._user.put = (resquestobj , callback)=>{

  const phone =
    typeof resquestobj.body.phone === "string" &&
    resquestobj.body.phone.trim().length == 11
      ? resquestobj.body.phone
      : false;

      const username =
      typeof resquestobj.body.username === "string" &&
      resquestobj.body.username.trim().length > 0
        ? resquestobj.body.username
        : false;
    
    const email =
      typeof resquestobj.body.email === "string" &&
      resquestobj.body.email.trim().length > 0
        ? resquestobj.body.email
        : false;
    const password =
      typeof resquestobj.body.password === "string" &&
      resquestobj.body.password.trim().length > 0
        ? resquestobj.body.password
        : false; 


  if(phone){

    datamodel.read('users',phone,(error, data)=>
    {
      if(!error && data){
        data = JSON.parse(data);
        if(username){
          data.username= username;
        }
        if(email){
          data.email=email;
        }
        if(password)
        {
          data.password=hash(password);
        }

        datamodel.update('users',phone,data,(err)=>{

          if(!err){
            callback(200,{msg:"User data updated sucessfully!"});
          }
          else {
            callback(500,{erro:"Try again later!"});
          }
        })

      }else {
        callback(404,{error:"User not found!"});
      }
    });

  }else {
    callback(400,{error:"Invalid input!"});
  }

    
}
userHandeler._user.delete = (resquestobj , callback)=>{

  const phone =
  typeof resquestobj.body.phone === "string" &&
  resquestobj.body.phone.trim().length == 11
    ? resquestobj.body.phone
    : false;

    if(phone)
    {

      datamodel.read('users',phone,(error, data)=>{
        if(!error && data){
          datamodel.delete('users',phone,(error)=>{
            if(!error){
              callback(200,{msg:"Successfully deleted!"});
            }
            else{
              callback(500,{error:"Try again later"});
            }
          })

        }else {
          callback(404,{error:"User not found!"});
        }
      })

    }else {
      callback(400,{error:"There is something errror!"})
    }

    
}

module.exports = userHandeler;

