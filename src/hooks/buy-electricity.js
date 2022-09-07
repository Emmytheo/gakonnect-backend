// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI } = require("../constants");
const { type } = require('os');
const axios = require('axios').default;
var provs = ["ebills", 'subpadi']
var PROVIDER = provs[0];
const serviceIds = {
  "Abuja Electricity Distribution Company (AEDC)" : "abuja-electric" ,
  "Eko Electricity Distribution Company (EKEDC)" : "eko-electric" ,
  "Ibadan Electricity Distribution Company (IBEDC)" : "ibadan-electric" ,
  "Ikeja Electricity Distribution Company (IKEDC)" : "ikeja-electric" ,
  "Jos Electricity Distribution PLC (JEDplc)" : "jos-electric" ,
  "Kaduna Electricity Distribution Company (KAEDCO)" : "kaduna-electric" ,
  "Kano Electricity Distribution Company (KEDCO)" : "kano-electric" ,
  "Port Harcourt Electricity Distribution Company (PHED)" : "portharcourt-electric" ,
}

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      context.data.phone = "07089602044";
      context.data.method = "Wallet";
      switch (PROVIDER) {
        case 'ebills':
          let optionzs = {
            method: 'get',
            url: 'https://' + EBILLS.API_BASE_URL + EBILLS.API_CHECK_BALANCE,
            headers: {
              'Content-Type': 'application/json',
            },
            params:{
              username: EBILLS.API_USERNAME,
              password: EBILLS.API_PASSWORD
            }
          }
          //1
          axios(optionzs)
          .then(function (response) {
            if(parseFloat(response.data.data.balance) > parseFloat(context.data.amount)){
              optionzs.url = 'https://' + EBILLS.API_BASE_URL + EBILLS.API_VERIFY_CUSTOMER,
              optionzs.params.customer_id = context.data.meterNo;
              optionzs.params.service_id = serviceIds[context.data.service];
              optionzs.params.variation_id = context.data.plan;
              //2
              axios(optionzs)
              .then(function (response) {
                console.log(response.data);
                if(response.data.code == "success"){
                  optionzs.url = 'https://' + EBILLS.API_BASE_URL + EBILLS.API_BUY_ELECTRICITY,
                  optionzs.params.phone = context.data.phone;
                  optionzs.params.amount = context.data.amount;
                  optionzs.params.meter_number = context.data.meterNo;
                  //3
                  axios(optionzs)
                  .then(function (response) {
                    console.log(response.data);
                    if(response.data.code == "success"){
                      context.data.status = 'successful';
                      context.data.token = response.data.token;
                      context.data.response = response.data;
                      resolve(context);
                    }
                    else{
                      context.data.status = 'failure';
                      context.data.response = response.data;
                      resolve(context);
                    }
                    
                  })
                  .catch(function (error) {
                    console.log('ERROR 3: ' + error.message);
                    reject(new Error('ERROR: ' + error.message));
                  })
                }
                else{
                  console.log('VERIFICATION ERROR: ' + response.message);
                  reject(new Error('VERIFICATION ERROR: ' + response.message));
                }
              })
              .catch(function (error) {
                console.log('ERROR 2: ' + error.message);
                reject(new Error('ERROR: ' + error.message));
              })
            }
          })
          .catch(function (error) {
            console.log('ERROR 1: ' + error.message);
            // throw new Error(error.message);
            reject(new Error('ERROR: ' + error.message));
          })
          break;
          case 'subpadi':
            let optionz = {
              method: 'get',
              url: 'https://' + SUBPADI.API_BASE_URL + SUBPADI.API_USER,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f504e7c2abab19e64693c2cd1162e5440a114558'
              },
            }
            axios(optionz)
            .then(function (response) {
              console.log('Wallet Balance: ', response.data.user.wallet_balance);
              context.data.service_id = serviceIds[context.data.service];
              context.data.meter_number = context.data.meterNo;
              context.data.variation_id = context.data.plan;
              console.log('Payload: ', context.data);
              reject(new Error('Wrong Adapter'));
              // always executed
            })
            .catch(function (error) {
              console.log('ERROR: ' + error.message);
              // throw new Error(error.message);
              reject(new Error('ERROR: ' + error.message));
            })
          break;
      
      
        default:
          break;
      }
    });
  };
};
