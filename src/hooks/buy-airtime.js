// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// const feathers = require('feathers');
// const rest = require('feathers-rest');
// const socketio = require('feathers-socketio');
// const bodyParser = require('body-parser');
// const handler = require('feathers-errors/handler');
// const request = require('request-promise');
// A request instance that talks to the API
//--------------------------------------------------------------------------------//
var https = require('https');
const { EBILLS, SUBPADI } = require('../constants');
const { type } = require('os');
const axios = require('axios').default;
var provs = ["ebills", 'subpadi']
var PROVIDER = provs[0];

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
              optionzs.url = 'https://' + EBILLS.API_BASE_URL + EBILLS.API_BUY_AIRTIME,
              optionzs.params.phone = context.data.phone;
              optionzs.params.network_id = context.data.network;
              optionzs.params.amount = context.data.amount;
              //
              axios(optionzs)
              .then(function (response) {
                console.log(response.data);
                context.data.status = 'successful';
                context.data.response = response.data;
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
                resolve(context);
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

          case 'nearly_free':
            let nearlyfree_config = {
              method: 'post',
              url: 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_PURCHASE,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.NEARLYFREE_KEY_BASE64}`
              },
              data : {
                referenceId : 'airtime' + '_' + context.data.phone + '_' + context.data.network_id + '_' + Date.now(),
                plan : context.data.plan_id,
                network : context.data.network_id,
                amount: context.data.amount,
                phoneNumber : context.data.phone,
                purchase: 'airtime'
              }
            }
            axios(nearlyfree_config)
            .then(function (response) {
              // console.log(response.data, context.params.user.role);
              if(response.data.status === 'successful' && response.data.content.status.toLowerCase() === "successful"){
                context.data.status = 'successful';
                context.data.profit = parseFloat(context.data.amount) - (parseFloat(response.data.content['Previous balance']) - parseFloat(response.data.content['new balance']))
                context.data.response = response.data.content;
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
                resolve(context);
              }
              else{
                console.log(response.data);
                // throw new Error(error.message);
                reject(new Error('ERROR: ' + response.data.description));
              }
            })
            .catch(function (error) {
              console.log('ERROR: ' + error.message);
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

