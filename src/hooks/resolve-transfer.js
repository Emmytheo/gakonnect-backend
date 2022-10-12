// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, PAYSTACK } = require("../constants");
const { type } = require('os');
const axios = require('axios').default;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      switch (context.data.provider) {
        case 'flutterwave':
          let optionz1 = {
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
              "recipient": context.data.recipient_code,
              "reason": `${ context.data.custm_reasn ? context.data.reason : `Transfer from ${context.data.name} through GAKonnect Telecommunications` }`
            }
          }
          //1
          axios(optionz1)
          .then(function (response) {
            if(response.data.status == true){
              // RETURN BANK LIST
              context.result = response.data.data;
              resolve(context);
            }
            else{
              console.log('Error Fetching Bank list', response.data, optionz1.params);
              reject(new Error('Bank List Error'));
            }
          })
          .catch(function (error) {
            console.log('ERROR 1: ' + error.message);
            reject(new Error('ERROR: ' + error.message));
          })

          break;
      
        case 'paystack':
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
              // RETURN BANK LIST
              context.result = response.data.data;
              resolve(context);
            }
            else{
              console.log('Error Fetching Bank list', response.data, optionz1.params);
              reject(new Error('Bank List Error'));
            }
          })
          .catch(function (error) {
            console.log('ERROR 1: ' + error.message);
            reject(new Error('ERROR: ' + error.message));
          })
            
          break;
        
          default:
          break;
      }
      
    });
  }
};
