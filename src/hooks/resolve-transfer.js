// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, PAYSTACK } = require("../constants");
const { type } = require('os');
const axios = require('axios').default;
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      console.log(context.data)
      switch (context.data.provider) {
        case 'flutterwave-transfer':
          const details = {
            account_bank: context.data.bank,
            account_number: context.data.accountNumber,
            amount: context.data.amount,
            currency: "NGN",
            narration: `${ context.data.custm_reasn ? context.data.reason : `Transfer from ${context.data.name} through KUGA Telecommunications` }`,
            reference: "flw_transfer/" + context.params.user._id + '/' + context.data.amount + '/' + Date.now(),
            callback_url: "https://gakonnect.thesearchlight.com.ng/flw-webhooks",
            debit_currency: "NGN"
          }
          //1
          flw.Transfer.initiate(details)
          .then(function (response) {
            if(response.status == 'success'){
              // Transfer Successful
              context.data.response = response.data;
              context.data.transc_id = response.data.id;
              resolve(context);
            }
            else{
              console.log('Flutterwave Transfer Error', response, details);
              reject(new Error(response.message));
            }
          })
          .catch(function (error) {
            console.log('ERROR 1: ' + error.message);
            reject(new Error('ERROR: ' + error.message));
          })

          break;
      
        case 'paystack-transfer':
          let optionz2 = {
            method: 'get',
            url: 'https://' +  PAYSTACK.BASE_URL + PAYSTACK.TRANSFER,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + process.env.PS_KEY
            },
            params:{
              currency: "NGN",
              "source": "balance",
              "amount": parseInt(context.data.amount),
              "recipient": context.data.recipient,
              "reason": `${ context.data.custm_reasn ? context.data.reason : `Transfer from ${context.data.name} through GAKonnect Telecommunications` }`
            }
          }
          //1
          axios(optionz2)
          .then(function (response) {
            if(response.data.status == true){
              // Successful Paystack Transfer
              context.data.response = response.data.data;
              resolve(context);
            }
            else{
              console.log('Paystack Transfer Error', response.data, optionz2.params);
              reject(new Error(response.data.message));
            }
          })
          .catch(function (error) {
            console.log('ERROR 1: ' + error.message);
            reject(new Error('ERROR: ' + error.message));
          })
            
          break;
        
          default:
             resolve(context)
          break;
      }
      
    });
  }
};
