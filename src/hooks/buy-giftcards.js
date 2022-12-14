// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const axios = require('axios').default;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      switch (context.data.provider) {
        case 'bingpay':
          let bingpay_config = {
            method: 'get',
            url: 'https://' + BINGPAY.BASE_URL + BINGPAY.API_CHECK_BALANCE,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.BINGPAY_KEY}`
            },
          }
          axios(bingpay_config)
          .then(function (response) {
            if(parseFloat(response.data.data.balance) > parseFloat(context.data.amount)){
              let bingpaybal = response.data.data.balance;
              bingpay_config.url = 'https://' + BINGPAY.BASE_URL + BINGPAY.API_PURCHASE_LOCAL_GIFTCARDS
              bingpay_config.data = JSON.stringify({
                amount: context.data.amount,
                product_id: context.data.giftcard,
              })
              console.log(bingpay_config);
              //
              axios(bingpay_config)
              .then(function (response) {
                console.log(response.data);
                if(!response.data.error){
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
                  // // Update Bingpay wallet balance
                  // context.app.service('gift-card-apis').find({query: { 
                  //   apiName : 'bingpay',
                  // }})
                  // .then((res)=>{
                  //   if(res.data && res.data.length >= 1){
                  //     let nw_bal = parseInt(bingpaybal) - parseInt(context.data.amount);
                  //     context.app.service('data-apis').patch(res.data[0]._id, {balance: nw_bal.toString()});
                  //   }
                  // })

                  resolve(context);
                }
                else{
                  console.log('ERROR 3: ' + error.message);
                  reject(new Error('ERROR: ' + error.message));
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
