// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE } = require("../constants");
const { type } = require('os');
const axios = require('axios').default;
var provs = ["ebills", 'subpadi']
var PROVIDER = provs[0];


// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log(context.data);
    return new Promise((resolve, reject) => {
      switch (context.data.provider) {
        case 'ebills':
          let ebills_config = {
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
          axios(ebills_config)
          .then(function (response) {
            context.app.service('data-apis').find({query: { 
              apiName : 'ebills',
            }})
            .then((res)=>{
              if(res.data && res.data.length >= 1){
                context.app.service('data-apis').patch(res.data[0]._id, {balance: response.data.data.balance.toString()});
              }
            })
            if(parseFloat(response.data.data.balance) > parseFloat(context.data.amount)){
              ebills_config.url = 'https://' + EBILLS.API_BASE_URL + EBILLS.API_BUY_DATA,
              ebills_config.params.phone = context.data.phone;
              ebills_config.params.network_id = context.data.network;
              ebills_config.params.variation_id = context.data.variation_id;
              console.log(ebills_config);
              //
              axios(ebills_config)
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

                context.app.service('data-apis').find({query: { 
                  apiName : 'ebills',
                }})
                .then((res)=>{
                  if(res.data && res.data.length >= 1){
                    let nw_bal = parseInt(res.data[0].balance) - parseInt(context.data.amount);
                    context.app.service('data-apis').patch(res.data[0]._id, {balance: nw_bal.toString()});
                  }
                })
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
                referenceId : context.data.phone + '_' + context.data.network_id + '_' + Date.now(),
                plan : context.data.plan_id,
                network : context.data.network_id,
                phoneNumber : context.data.phone,
                purchase: 'data'
              }
            }
            axios(nearlyfree_config)
            .then(function (response) {
              // console.log(response.data, context.params.user.role);
              if(response.data.status === 'successful'){
                context.data.status = 'successful';
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
                bingpay_config.url = 'https://' + BINGPAY.BASE_URL + BINGPAY.API_BUY_DATA
                bingpay_config.data = JSON.stringify({
                  phone: context.data.phone,
                  plan: context.data.plan_id,
                  network: context.data.network_id
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
                    // Update Bingpay wallet balance
                    context.app.service('data-apis').find({query: { 
                      apiName : 'bingpay',
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        let nw_bal = parseInt(bingpaybal) - parseInt(context.data.amount);
                        context.app.service('data-apis').patch(res.data[0]._id, {balance: nw_bal.toString()});
                      }
                    })

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
          
          case 'sme_api':
              let sme_api_config = {
                method: 'post',
                url: 'https://' + SME_API.API_BASE_URL + SME_API.API_CHECK_BALANCE,
                headers: {
                  'Content-Type': 'application/json',
                },
                data: {
                  token: process.env.SME_API_KEY
                }
              }
              axios(sme_api_config)
              .then(function (response) {
                if(parseFloat(response.data) > parseFloat(context.data.amount)){
                  let sme_api_bal = response.data;
                  sme_api_config.url = 'https://' + SME_API.API_BASE_URL + SME_API.API_BUY_DATA
                  sme_api_config.data = {
                    phone: context.data.phone,
                    plan: context.data.plan_id,
                    serviceid: context.data.serviceid,
                    reference: ''
                  }
                  axios(sme_api_config)
                  .then(function (response) {
                    // console.log(response.data);
                    if(response.data){
                      context.data.status = 'TRANSACTION SUCCESSFUL';
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
                      // Update SME_API wallet balance
                      context.app.service('data-apis').find({query: { 
                        apiName : 'sme_api',
                      }})
                      .then((res)=>{
                        if(res.data && res.data.length >= 1){
                          let nw_bal = parseInt(sme_api_bal) - parseInt(context.data.amount);
                          context.app.service('data-apis').patch(res.data[0]._id, {balance: nw_bal.toString()});
                        }
                      })
  
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


          case 'gsubz':
              let gsubz_config = {
                method: 'post',
                url: 'https://' + GSUBZ.API_BASE_URL + GSUBZ.API_PAY,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.GSUBZ_KEY}`
                },
                data : JSON.stringify({
                  serviceID : context.data.serviceID,
                  plan : context.data.plan_id,
                  api : process.env.GSUBZ_KEY,
                  amount : '',
                  phone : context.data.phone,
                })
              }
              axios(gsubz_config)
              .then(function (response) {
                if(response.data.code === 200){
                  context.data.status = 'successful';
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
                  // Update gsubz wallet balance
                  context.app.service('data-apis').find({query: { 
                    apiName : 'gsubz',
                  }})
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      let nw_bal = context.data.response.finalBalance;
                      context.app.service('data-apis').patch(res.data[0]._id, {balance: nw_bal.toString()});
                    }
                  })
                  resolve(context);
                }
                else{
                  console.log('ERROR 3: ' + error.message);
                  reject(new Error('ERROR: ' + error.message));
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
          reject(new Error("Provider not set"));
          break;
      }
    });
  };
};
