// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      let details = {
        email: context.params.user.email
      };
      flw.VirtualAcct.create(details)
      .then((res)=>{
        console.log(res)
      })
      .catch((error)=>{
        console.log(error.message)
      });
    })
  }
};
