const crypto = require("crypto");

const config = {};

config.port = "3000";

config.hash = (password) =>{

   
    let hashpass = crypto.createHmac("sha256", "abcdefghijklmnopqrstuvwxyz")
      .update(password)
      .digest("hex");

      return hashpass;


}

<<<<<<< HEAD
config.isJSON= (string) =>{

      try {
        JSON.parse(string);
      } catch (e) {
        return false;
      }
      return true;
  
=======
config.isjson = (string) =>{
  try{
    JSON.parse(string);
  }
  catch{
    return false;
  }
  return true;
>>>>>>> f0ad83eb678a2c3e69c027de9696f6cb7cd70f1a
}

module.exports = config;
