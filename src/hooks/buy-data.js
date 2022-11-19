// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE } = require("../constants");
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
      console.log(context.data.provider)
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
              ebills_config.params.variation_id = planNames[context.data.dataPlan];
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

          case 'nearlyfree':
            let nearlyfree_config = {
              method: 'post',
              url: 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_PAY,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${NEARLY_FREE.API_USERNAME+':'+process.env.NEARLYFREE_KEY.toString('base64')}`
              },
              data : JSON.stringify({
                referenceId : context.data.referenceId,
                plan : context.data.plan,
                network : context.data.network_id,
                phoneNumber : context.data.phone,
                purchase: 'data'
              })
            }
            axios(nearlyfree_config)
            .then(function (response) {
              if(response.data.status === 'success'){
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
                  plan: context.data.plan,
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
                console.log(response.data);
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
                    console.log(response.data);
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
                  plan : context.data.plan,
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
          break;
      }
    });
  };
};
