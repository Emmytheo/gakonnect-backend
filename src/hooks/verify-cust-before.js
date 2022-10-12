// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, PAYSTACK } = require("../constants");
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
      //CHECK DB FOR FOR THE RECORD
      let data;
      if(context.data.type == "cable"){
        // context.app.service('verify-customer').find({'smartcard_number': context.data.smartcard_number})
        // .then((res) => {
        //   if(res && res[0]){
        //     if(res[0].length < 1){
              
        //     }
        //   }
        // })
        // .catch((error) => {
        //   console.log('ERROR 1: ' + error.message);
        //   reject(new Error('ERROR: ' + error.message));
        // })
        let optionzs = {
                method: 'get',
                url: 'https://' + EBILLS.API_BASE_URL + EBILLS.API_VERIFY_CUSTOMER,
                headers: {
                  'Content-Type': 'application/json',
                },
                params:{
                  username: EBILLS.API_USERNAME,
                  password: EBILLS.API_PASSWORD,
                  customer_id: context.data.customer_id,
                  service_id: context.data.service_id
                }
              }
              //1
              axios(optionzs)
              .then(function (response) {
                if(response.data.code == "success"){
                  // RETURN VERIFICATION RESULTS
                  context.result = response.data.data;
                  resolve(context)
                }
                else{
                  console.log('Cable Verification Error', response.data, optionzs.params);
                  reject(new Error('Cable Verification Error'));
                }
              })
              .catch(function (error) {
                console.log('ERROR 1: ' + error.message);
                reject(new Error('ERROR: ' + error.message));
              })
      }
      else if(context.data.type == "electricity"){
        let optionzs = {
          method: 'get',
          url: 'https://' + EBILLS.API_BASE_URL + EBILLS.API_VERIFY_CUSTOMER,
          headers: {
            'Content-Type': 'application/json',
          },
          params:{
            username: EBILLS.API_USERNAME,
            password: EBILLS.API_PASSWORD,
            customer_id: context.data.customer_id,
            service_id: serviceIds[context.data.service_id],
            variation_id: context.data.variation_id,
          }
        }
        //1
        axios(optionzs)
        .then(function (response) {
          if(response.data.code == "success"){
            // RETURN VERIFICATION RESULTS
            context.result = response.data.data;
            resolve(context);
          }
          else{
            console.log('Electricity Verification Error', response.data, optionzs.params);
            reject(new Error('Electricity Verification Error'));
          }
        })
        .catch(function (error) {
          console.log('ERROR 1: ' + error.message);
          reject(new Error('ERROR: ' + error.message));
        })
        // context.app.service('verify-customer').find({'meterNo': context.data.meterNo})
        // .then((res) => {
        //   if(res && res[0]){
        //     if(res[0].length < 1){
              
        //     }
        //   }

        // })
        // .catch((error) => {
        //   console.log('ERROR 1: ' + error.message);
        //   reject(new Error('ERROR: ' + error.message));
        // })
      }
      // 
      
      
      
    });
  };
};
