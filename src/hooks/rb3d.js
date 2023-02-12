// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const path = require('path');
const filename = path.join(__dirname, 'rb3ds', 'refs');
var fs = require('fs');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      console.log('Pointer', context.params.route.pointer)
      if (context.params.route.rbhook === process.env.RBHOOK) {
        fs.writeFile(ref + '.txt', ref, function (err) {
          if (err) console.log(err);
            let file = path.join(filename, ref '.txt');
            fs.readFile(file, (error, data) => {
              if(error) {
                console.log(error)
                reject(new Error('ERROR: ' + error));
              }
              console.log(data.toString())
              context.result = JSON.parse(data.toString());
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
