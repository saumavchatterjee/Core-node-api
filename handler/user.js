const userHandeler = {};



userHandeler.user = (resquestobj, callback)=>{

    const allowedmethods = ['get','post','put','delete'];
   
    if(allowedmethods.indexOf(resquestobj.method) > -1 ){
        console.log(resquestobj.method);
    }
    else {

        callback(401, "Unautohrized");
    }


    console.log(resquestobj.body);
    

    // callback(200,'Hello User');

}

module.exports = userHandeler;

