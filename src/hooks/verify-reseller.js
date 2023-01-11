// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
function ValidateReseller(){

}

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if(context.params.user.package !== 'reseller' && context.params.user.role !== 'admin'){
        if(parseInt(context.params.user.personalWalletBalance) >= 2000){
          //Check for required info
          if(ValidateReseller()){
            let nw_bal = parseInt(context.params.user.personalWalletBalance) - 2000;
            context.app.service('users')
            .patch(res.data[0]._id, {
              balance: nw_bal.toString(),
              reseller: {
                date : Date.now(),
                charge : "30 NGN",
                referralLink : 'Unavailable',
                referralBonuses : '0',
                referrals : {},
                website : 'Unavailable',
              }
            })
            .then((res)=>{
              context.data = {...res.data.reseller}
              resolve(context)
            })

          }
        }
        else{
          reject(new Error("The Service costs 2000 NGN, Please fund your wallet."));
        }
      }
      else{
        if(context.params.user.package === 'reseller'){
          reject(new Error("You're already a Reseller."));
        }
        else{
          reject(new Error("An Admin cannot be A Reseller."));
        }
      }
    })
  };
};
