const crypto = require("crypto");

const config = {};

config.port = "3000";

config.hash = (password) =>{

   
    let hashpass = crypto.createHmac("sha256", "abcdefghijklmnopqrstuvwxyz")
      .update(password)
      .digest("hex");

      return hashpass;


}

config.isJSON= (string) =>{

      try {
        JSON.parse(string);
      } catch (e) {
        return false;
      }
      return true;
  
}

module.exports = config;
