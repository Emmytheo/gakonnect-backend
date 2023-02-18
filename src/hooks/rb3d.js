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
      if (context.params.route.rbhook === process.env.RBHOOK) {
        console.log('Pointer', context.params.route.pointer)
        let ref = context.params.route.pointer
        let file = path.join(filename, ref);
        fs.writeFile(file, ref, function (err) {
          if (err) reject(err);
          fs.readFile(file, (error, data) => {
            if(error) {
              console.log(error)
              return reject(error);
            }  
            // context.result = JSON.parse(data.toString());
            console.log(context.params.headers)
            console.log(data)
            context.result = data;
            resolve(context)                                        
          });
        })
      }
      else{
        reject(new Error('Unauthorized'));
      }
      // if (context.data && context.params.route.rbHook && context.params.route.ref && context.params.route.rbHook === REDBILLER.API_REDBILLER_HOOK) {
      //   // console.log("Passed", context)
      //   context.data.rbHook = context.params.route.rbHook,
      //   context.data.ref = context.params.route.ref
      //   context.app.service('e-pins').find({query: { 
      //     reference : context.params.route.ref
      //   }})
      //   .then((res)=>{
      //     if(res.data && res.data.length >= 1){
      //       if(!res.d"ata[0].processed){
      //         context.app.service('e-pins').patch(res.data[0]._id, {processed: true})
      //         context.result = 'Processing';
      //         resolve(context)
      //       }
      //       else{
      //         reject(new Error("Already Processed"));
      //       }
      //     }
      //     else{
      //       reject(new Error("Not Found"));
      //     }
      //   })
      // }
      // else{
      //   reject(new Error("Unauthorized Request"));
      // }
    });
  };
};
