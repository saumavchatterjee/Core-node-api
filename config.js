const crypto = require("crypto");

const config = {};

config.port = "3000";

config.hash = (password) =>{

   
    let hashpass = crypto.createHmac("sha256", "abcdefghijklmnopqrstuvwxyz")
      .update(password)
      .digest("hex");

      return hashpass;


}

module.exports = config;
