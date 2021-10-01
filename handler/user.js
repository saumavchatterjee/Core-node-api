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


    //console.log(resquestobj.body);
    

    // callback(200,'Hello User');

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
    resquestobj.body.phone.trim().length >= 11
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
      password: hash(password),
    };

    datamodel.read('users', phone, (err, data) => {
       // console.log(err+data);

      if (err) {
        console.log(err);
        datamodel.create('users', phone, userdata, (err) => {
          if (!err) {
            callback(200, "User created Successfuly!");
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
userHandeler._user.get = ()=>{
    
}
userHandeler._user.put = ()=>{
    
}
userHandeler._user.delete = ()=>{
    
}

module.exports = userHandeler;

