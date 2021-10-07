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

config.serialgenerate= (length) =>{
  let token="";
  const allowedcharacter = "abcedfghijklmnopurestuvwxyz0123456789";
  for(let i=1; i <= length ; i++){
    token = token + allowedcharacter.charAt(Math.floor(Math.random() * 36));
  }

  return token;

}

module.exports = config;
