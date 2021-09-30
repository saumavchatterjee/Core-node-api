const userHandeler = {};



userHandeler.user = (resquestobj, callback)=>{

    const allowedmethods = ['get','post','put','delete'];
   
    if(allowedmethods.indexOf(resquestobj.method) > -1 ){
        //console.log(resquestobj.method);
        userHandeler._user[resquestobj.method](resquestobj, callback);
    }
    else {

        callback(401, "Unautohrized");
    }


    console.log(resquestobj.body);
    

    // callback(200,'Hello User');

}
userHandeler._user ={};

userHandeler._user.post = (resquestobj, callback)=>{

    console.log(resquestobj.body.firstname);
    console.log(resquestobj.body.phone);

}
userHandeler._user.get = ()=>{
    
}
userHandeler._user.put = ()=>{
    
}
userHandeler._user.delete = ()=>{
    
}

module.exports = userHandeler;

