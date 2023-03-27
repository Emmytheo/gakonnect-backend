// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const path = require('path');
var fs = require('fs');
const filename = path.resolve(__dirname, '..', 'rb3ds');
// const filename = './rb3ds/refs'

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {      
      if (context.arguments[0] == 'test' || context.arguments[1].route.rbhook == 'test') {
        let ref = 'abcxyz'
        let file = path.join(filename, ref);
        fs.writeFile(file, ref, function (err) {
          if (err) reject(err);
          fs.readFile(file, (error, data) => {
            if(error) {
              console.log(error)
              return reject(error);
            }
            console.log('File Created');
          });
        })
        resolve(context)
      }
      else if (context.arguments[1].route.rbhook == process.env.RBHOOK){
        if (context.arguments[0] == 'abcxyz' || context.arguments[1].route.pointer == 'abcxyz') {
          let ref = 'abcxyz'
          let file = path.join(filename, ref);
          fs.writeFile(file, ref, function (err) {
            if (err) reject(err);
            fs.readFile(file, (error, data) => {
              if(error) {
                console.log(error)
                return reject(error);
              }
              console.log('File Created');
              resolve(context)
            });
          })
        }
        else{
          resolve(context)
        }
      }
      else{
        console.log("Here", context.arguments[0], context.arguments[1].route.rbhook);
        reject(new Error('Unauthorized'));
      }
    });
  };
};
