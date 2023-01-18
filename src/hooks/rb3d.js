// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if (context.data && context.params.route.rbHook && context.params.route.ref && context.params.route.rbHook === REDBILLER.API_REDBILLER_HOOK) {
        context.data.rbHook = context.params.route.rbHook,
        context.data.ref = context.params.route.ref
        context.app.service('e-pins').find({query: { 
          transc_ref : context.params.route.ref
        }})
        .then((res)=>{
          if(res.data && res.data.length >= 1){
            if(!res.data[0].processed){
              context.result = 'Processing';
              resolve(context)
            }
            else{
              reject(new Error("Already Processed"));
            }
          }
          else{
            reject(new Error("Not Found"));
          }
        })
      }
      else{
        reject(new Error("Unauthorized Request"));
      }
    });
  };
};
