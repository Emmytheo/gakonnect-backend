// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var safeCompare = require('safe-compare');
var crypto = require('crypto');
const exec = require('child_process').exec;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      let sig = "sha1=" + crypto.createHmac('sha1', process.env.GHWBHK_SECRET).update(context.data).digest('hex');
      console.log("it works !!!!!!!!!!!!!!!", sig, context.data, context.params.headers['x-hub-signature'], sig);
      if (safeCompare(context.params.headers['x-hub-signature'], sig)) {
        console.log("it works !!!!!!!!!!!!!!!");
        exec('git pull && npm install');
        context.result = "Recieved"
        resolve(context);
        // exec('cd ' + repo + ' && git pull && ');
      }
      else{
        reject(new Error("Unauthorized"));
      }
    })
  };
};
