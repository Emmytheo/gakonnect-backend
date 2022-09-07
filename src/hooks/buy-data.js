// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { EBILLS,SUBPADI } = require("../constants");
const { type } = require('os');
const axios = require('axios').default;
var provs = ["ebills", 'subpadi']
var PROVIDER = provs[0];
const planNames = {
  "MTN Data 500MB – 30 Days": '500',
  "MTN Data 1GB – 30 Days": 'M1024',
  "MTN Data 2GB – 30 Days": 'M2024',
  "MTN Data 3GB – 30 Days": '3000',
  "MTN Data 5GB – 30 Days": '5000',
  "MTN Data 10GB – 30 Days": '10000',
  "MTN Data 6GB – 7 Days": 'mtn-20hrs-1500',
  "MTN Data 30GB – 30 Days": 'mtn-30gb-8000',
  "MTN Data 40GB – 30 Days": 'mtn-40gb-10000',
  "MTN Data 75GB – 30 Days": 'mtn-75gb-15000',
  "Glo Data 1GB – 5 Nights": 'glo100x',
  "Glo Data 1.25GB – 1 Day (Sunday)": 'glo200x',
  "Glo Data 1.35GB – 14 Days": 'G500',
  "Glo Data 5.8GB – 30 Days": 'G2000',
  "Glo Data 2.9GB – 30 Days": 'G1000',
  "Glo Data 7.7GB – 30 Days": 'G2500',
  "Glo Data 10GB – 30 Days": 'G3000',
  "Glo Data 13.25GB – 30 Days": 'G4000',
  "Glo Data 18.25GB – 30 Days": 'G5000',
  "Glo Data 29.5GB – 30 Days": 'G8000',
  "Glo Data 50GB – 30 Days": 'glo10000',
  "Airtel Data 750MB – 14 Days": 'airt-500',
  "Airtel Data 1GB – 1 Day": 'airt-300x',
  "Airtel Data 1.5GB – 30 Days": 'AIR1000',
  "Airtel Data 2GB – 2 Days": 'airt-500x',
  "Airtel Data 2GB – 30 Days": 'airt-1200',
  "Airtel Data 3GB – 30 Days": 'Air1500',
  "Airtel Data 4.5GB – 30 Days": 'AIR2000',
  "Airtel Data 6GB – 7 Days": 'airt-1500-2',
  "Airtel Data 10GB – 30 Days": 'Air3000',
  "Airtel Data 20GB – 30 Days": 'Air5000',
  "Airtel Data 40GB – 30 Days": 'Air100000',
  "9mobile Data 1GB – 30 Days": '9MOB1000',
  "9mobile Data 2.5GB – 30 Days": '9MOB34500',
  "9mobile Data 11.5GB – 30 Days": '9MOB8000',
  "9mobile Data 15GB – 30 Days": '9MOB5000',
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
          axios(optionzs)
          .then(function (response) {
            if(parseFloat(response.data.data.balance) > parseFloat(context.data.amount)){
              optionzs.url = 'https://' + EBILLS.API_BASE_URL + EBILLS.API_BUY_DATA,
              optionzs.params.phone = context.data.phone;
              optionzs.params.network_id = context.data.network;
              optionzs.params.variation_id = planNames[context.data.dataPlan];
              //
              axios(optionzs)
              .then(function (response) {
                console.log(response.data);
                context.data.status = 'successful';
                context.data.response = response.data;
                resolve(context);
              })
              .catch(function (error) {
                console.log('ERROR 2: ' + error.message);
                reject(new Error('ERROR: ' + error.message));
              })
            }
            
            
            // 
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
              context.data.variation_id = planNames[context.data.dataPlan];
              console.log('Payload: ', context.data);
              reject(new Error('Wrong Adapter'));
              // throw new Error("i dononsuifbkn")
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
