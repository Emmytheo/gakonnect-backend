// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI } = require("../constants");
const { type } = require('os');
const axios = require('axios').default;
var provs = ["ebills", 'subpadi']
var PROVIDER = provs[0];
const planNames = {
  "DStv Padi" : "dstv-padi",
  "DStv Yanga" : "dstv-yanga",
  "DStv Confam" : "dstv-confam",
  "DStv Asia" : "dstv6",
  "DStv Compact" : "dstv79",
  "DStv Compact Plus" : "dstv7",
  "DStv Premium" : "dstv3",
  "DStv Premium Asia" : "dstv10",
  "DStv Premium-French" : "dstv9",
  "DStv Confam + ExtraView" : "confam-extra",
  "DStv Yanga + ExtraView" : "yanga-extra",
  "DStv Padi + ExtraView" : "padi-extra",
  "DStv Compact + Asia" : "com-asia",
  "DStv Compact + Extra View" : "dstv30",
  "DStv Compact + French Touch" : "com-frenchtouch",
  "DStv Premium – Extra View" : "dstv33",
  "DStv Compact Plus – Asia" : "dstv40",
  "DStv Compact + French Touch + ExtraView" : "com-frenchtouch-extra",
  "DStv Compact + Asia + ExtraView" : "com-asia-extra",
  "DStv Compact Plus + French Plus" : "dstv43",
  "DStv Compact Plus + French Touch" : "complus-frenchtouch",
  "DStv Compact Plus – Extra View" : "dstv45",
  "DStv Compact Plus + FrenchPlus + Extra View" : "complus-french-extraview",
  "DStv Compact + French Plus" : "dstv47",
  "DStv Compact Plus + Asia + ExtraView" : "dstv48",
  "DStv Premium + Asia + Extra View" : "dstv61",
  "DStv Premium + French + Extra View" : "dstv62",
  "DStv HDPVR Access Service" : "hdpvr-access-service",
  "DStv French Plus Add-on" : "frenchplus-addon",
  "DStv Asian Add-on" : "asia-addon",
  "DStv French Touch Add-on" : "frenchtouch-addon",
  "ExtraView Access" : "extraview-access",
  "DStv French 11" : "french11",
  "GOtv Smallie" : "gotv-smallie",
  "GOtv Jinja" : "gotv-jinja",
  "GOtv Jolli" : "gotv-jolli",
  "GOtv Max" : "gotv-max",
  "GOtv Supa" : "gotv-supa",
  "Startimes Nova" : "nova",
  "Startimes Basic" : "basic",
  "Startimes Smart" : "smart",
  "Startimes Classic" : "classic",
  "Startimes Super" : "super",
}

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
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
              optionzs.params.customer_id = context.data.smartcard_number;
              optionzs.params.service_id = context.data.type;
              //2
              axios(optionzs)
              .then(function (response) {
                console.log(response.data);
                if(response.data.code == "success"){
                  optionzs.url = 'https://' + EBILLS.API_BASE_URL + EBILLS.API_BUY_CABLE,
                  optionzs.params.phone = context.data.phone;
                  optionzs.params.smartcard_number = context.data.smartcard_number;
                  optionzs.params.variation_id = planNames[context.data.plan];
                  //3
                  axios(optionzs)
                  .then(function (response) {
                    console.log(response.data);
                    if(response.data.code == "success"){
                      context.data.status = 'successful';
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
              context.data.service_id = context.data.type;
              context.data.variation_id = planNames[context.data.plan];
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
