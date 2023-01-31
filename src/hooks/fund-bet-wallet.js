// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const axios = require('axios').default;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      switch (context.data.provider) {
        case 'redbiller':
          let redbiller_config = {
            method: 'get',
            url: REDBILLER.API_CHECK_BALANCE,
            headers: {
              'Content-Type': 'application/json',
              'Private-Key': `${process.env.REBBILLER_PRIV_KEY}`
            },
          }
          axios(redbiller_config)
          .then(function (response) {
            if(parseFloat(response.data.details.available) > parseFloat(context.data.amount)){
              context.data.reference = context.data.amount + context.data.product + context.data.customer_id + Date.now()
              let redbillerbal = response.data.details.available;
              redbiller_config.url = 'https://' + REDBILLER.API_BASE_URL + REDBILLER.API_FUND_BET_WALLET
              redbiller_config.method = 'post'
              redbiller_config.data = {
                product: context.data.product,
                customer_id: context.data.customer_id,
                amount: parseInt(context.data.amount),
                callback_url: 'https://gakonnect.thesearchlight.com.ng/webhooks',
                reference: context.data.reference,
              }
              console.log(redbiller_config);
              //
              axios(redbiller_config)
              .then(function (response) {
                console.log(response.data);
                if(response.data.status === 'true'){
                  context.data.status = 'successful';
                  context.data.response = response.data;
                  // deduct the money from wallet
                  if(context.params.user.role === "admin"){
                    if(context.data.method === 'walletBalance'){
                      let nw_amt = parseInt(context.params.user.personalWalletBalance) - parseInt(context.data.amount);
                      context.app.service('users').patch(context.params.user._id, {personalWalletBalance: nw_amt.toString()})
                    }
                  }
                  else{
                    let nw_amt = parseInt(context.params.user.personalWalletBalance) - parseInt(context.data.amount);
                    context.app.service('users').patch(context.params.user._id, {personalWalletBalance: nw_amt.toString()})
                  }
                  // // Update redbiller wallet balance
                  // context.app.service('epin-apis').find({query: { 
                  //   apiName : 'redbiller',
                  // }})
                  // .then((res)=>{
                  //   if(res.data && res.data.length >= 1){
                  //     let nw_bal = parseInt(redbillerbal) - parseInt(context.data.amount);
                  //     context.app.service('epin-apis').patch(res.data[0]._id, {balance: nw_bal.toString()});
                  //   }
                  // })

                  resolve(context);
                }
                else{
                  console.log('ERROR 3: ' + response.data.message);
                  reject(new Error('ERROR: ' + response.data.message));
                }
              })
              .catch(function (error) {
                console.log('ERROR 2: ' + error.message);
                reject(new Error('ERROR: ' + error.message));
              })
            }
            else{
              console.log('INSUFFICIENT BAL.: Not Enough Credits');
              reject(new Error('INSUFFICIENT BAL.: Not Enough Credits'));
            }
            
            
            // 
          })
          .catch(function (error) {
            console.log('ERROR 1: ' + error.message);
            // throw new Error(error.message);
            reject(new Error('ERROR: ' + error.message));
          })
          
          break;
        default:
          reject(new Error("Provider not set"));
          break;
      }
    })
  }
}
