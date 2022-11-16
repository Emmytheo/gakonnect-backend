// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if(!context.params.user.virtCard){
        let details = {
          currency: "NGN",
          amount: "0",
          debit_currency: "NGN",
          billing_name: context.params.user.fullname,
          billing_address: context.params.user.address,
          billing_city: context.params.user.billing_city,
          billing_state: context.params.user.billing_state,
          billing_postal_code: context.params.user.billing_postal_code,
          billing_country: context.params.user.billing_country,
          first_name: context.params.user.firstname,
          last_name: context.params.user.lastname,
          date_of_birth: context.params.user.dob,
          email: context.params.user.email,
          phone: context.params.user.phone,
          title: context.params.user.title,
          gender: context.params.user.gender,
          callback_url: "https://gakonnect.thesearchlight.com.ng/flw-webhooks"
        };
        flw.VirtualCard.create(details)
        .then((res)=>{
          if(res.status === "success"){
            context.data.response = res.data
            context.data.owner = { email: context.params.user.email, userId: context.params.user._id }
            context.app.service('users').patch(
              context.params.user._id, 
              {
                virtCard: res.data
              }
            )
            resolve(context);
          }
          else{
            reject(new Error(res.message));
          }
        })
        .catch((error)=>{
          console.log("error", error.message)
          reject(new Error('ERROR: ' + error.message));
        });
      }
      else{
        reject(new Error('Virtual Card Already Exists.'));
      }
    })
  }
};


