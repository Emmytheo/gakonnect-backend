// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var safeCompare = require('safe-compare');
var crypto = require('crypto');
const exec = require('child_process').exec;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      delete context.data.dateTime;
      let sig = "sha1=" + crypto.createHmac('sha1', process.env.GHWBHK_SECRET).update(JSON.stringify(context.data), 'utf-8').digest('hex');
      if (safeCompare(context.params.headers['x-hub-signature'], sig)) {
        exec('git pull && sudo npm install && sudo fuser -k 443/tcp && forever restart 0');
        context.result = "Recieved"
        resolve(context);
      }
      else{
        reject(new Error("Unauthorized"));
      }
    })
  };
};
