const crypto = require("crypto");

const config = {};

config.port = "3000";

config.hash = (password) =>{

   
    let hashpass = crypto.createHmac("sha256", "abcdefghijklmnopqrstuvwxyz")
      .update(password)
      .digest("hex");

      return hashpass;


}

config.isjson = (string) =>{
  try{
    JSON.parse(string);
  }
  catch{
    return false;
  }
  return true;
}

module.exports = config;
