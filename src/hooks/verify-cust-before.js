// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const axios = require('axios').default;
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
const { type } = require('os');
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const path = require('path');
var fs = require('fs');
const filename = path.resolve(__dirname);
// const filename = './rb3ds/refs'
const net_prfx = {
  'mtn': ['0803', '0806', '0813', '0810', '0816', '0814', '0903', '0906', '0703', '0704', '0706', '07025', '07026'],
  'glo': ['0805', '0807', '0811', '0815', '0705', '0905'],
  'airtel': ['0802', '0808', '0812', '0708', '0701', '0902', '0901', '0907'],
  'etisalat': ['0809', '0817', '0818', '0908', '0909'],
}


// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      //CHECK DB FOR FOR THE RECORD
      let data;
      if(context.data.type == "cable"){
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
      }
      else if(context.data.type == "flw-audit"){
        const payload = {
          "from": "2023-03-01",
          "to": "2023-03-06"
        };
        let resp_pl = []
        // context.app.service('wallet').find({query: { 
        //   dateTime: {
        //     $gte: new Date(payload.from).toISOString(),
        //     $lt: new Date(payload.to).toISOString()
        //   }
        // }})
        // .then(function (kg_response) {
        //   console.log('old', kg_response.data)
        //   // console.log('new', flw_response.data)
        //   context.result = kg_response.data
        //   resolve(context);
        // })
        // .catch(function (error) {
        //   console.log('ERROR 2: ' + error.message);
        //   reject(new Error('ERROR: ' + error.message));
        // })

        flw.Transaction.fetch(payload)
        .then(function (flw_response) {
          if(flw_response.status == 'success'){
            // console.log(flw_response.data)
            context.app.service('wallet').find({query: { 
              dateTime: {
                $gte: new Date(payload.from).toISOString(),
                $lt: new Date(payload.to).toISOString()
              }
            }})
            .then(function (kg_response) {
              // console.log('old', kg_response.data)
              console.log('new', flw_response)
              let ol_tx = kg_response.data.map(transc => {
                return transc.transaction_id
              })
              console.log('nw', ol_tx)
              let nw_tx = []
              for (let i = 0; i < flw_response.data.length; i++) {
                if(!ol_tx.includes(flw_response.data[i].id)){
                  resp_pl.push(flw_response.data[i])
                }
              }
              context.result = ol_tx
              resolve(context);
            })
            .catch(function (error) {
              console.log('ERROR 2: ' + error.message);
              reject(new Error('ERROR: ' + error.message));
            })
          }
          else{
            console.log('Audit Error', flw_response);
            reject(new Error(flw_response.message));
          }
        })
        .catch(function (error) {
          console.log('ERROR 1: ' + error.message);
          reject(new Error('ERROR: ' + error.message));
        })
      }
      else if(context.data.type == "bet"){
        let redbiller_optionzs = {
          method: 'post',
          url: 'https://' + REDBILLER.API_BASE_URL + REDBILLER.API_VERIFY_BET_WALLET,
          headers: {
            'Content-Type': 'application/json',
            'Private-Key': `${process.env.REBBILLER_PRIV_KEY}`
          },
          data:{
            customer_id: context.data.customer_id,
            product: context.data.product,
          }
        }
        //1
        axios(redbiller_optionzs)
        .then(function (response) {
          if(response.data.status === 'true'){
            // RETURN VERIFICATION RESULTS
            context.result = response.data.details;
            resolve(context);
          }
          else{
            console.log('ERROR 3: ' + response.data.message);
                  reject(new Error('ERROR: ' + response.data.message));
          }
        })
        .catch(function (error) {
          console.log('ERROR 1: ' + error.message);
          reject(new Error('ERROR: ' + error.message));
        })
      }
      else if(context.data.type == "airt2cash"){
        let bingpay_config = {
          method: 'post',
          url: 'https://' + BINGPAY.BASE_URL + BINGPAY.API_FETCH_AIRT2CASH_FEE,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BINGPAY_KEY}`
          },
          data:{
            amount:context.data.amount,
            network:context.data.network
          }
        }
        axios(bingpay_config)
        //1
        axios(bingpay_config)
        .then(function (response) {
          if(!response.data.error){
            // RETURN VERIFICATION RESULTS
            response.data.data.provider = "bingpay";
            console.log(response.data.data)
            context.result = response.data.data;
            resolve(context);
          }
          else{
            console.log('ERROR 3: ' + response.data.message);
                  reject(new Error('ERROR: ' + response.data.message));
          }
        })
        .catch(function (error) {
          console.log('ERROR 1: ' + error.message);
          reject(new Error('ERROR: ' + error.message));
        })
      }
      else if(context.data.type == "flw-get-banks"){
        let flw_config = {
          method: 'get',
          url: 'https://api.flutterwave.com/v3/banks/NG',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FLW_PUBLIC_KEY}`
          },
        }
        axios(flw_config)
        //1
        axios(flw_config)
        .then(function (response) {
          if(response.data.status == 'success'){
            // RETURN VERIFICATION RESULTS
            context.result = response.data.data;
            resolve(context);
          }
          else{
            console.log('ERROR 3: ' + response.data.message);
            reject(new Error('ERROR: ' + response.data.message));
          }
        })
        .catch(function (error) {
          console.log('ERROR 1: ' + error.message);
          reject(new Error('ERROR: ' + error.message));
        })
      }
      else if(context.data.type == "3dsTest"){
        let rd3d_config = {
          method: 'post',
          url: `https://api.test.redbiller.com/1.0/3d-authentication/setup/verify`,
          headers: {
            'Content-Type': 'application/json',
            'Private-Key': `${process.env.REBBILLER_PRIV_KEY}`
          },
          data: {
            pointer: 'abcxyz'
          }
        }
        
        
        
        axios(rd3d_config)
        //1
        .then(function (response) {
          // console.log(response)
          if(response.data.status == true){
            // RETURN VERIFICATION RESULTS
            context.result = response.data;
            console.log(context.data)
            resolve(context);
          }
          else{
            console.log('ERROR 3: ' + response.data.message);
            if(context.params.user.role === 'admin'){
              reject(new Error('ERROR: ' + response.data.message));
            }
            else{
              reject(new Error('Service Unavailable at the moment. Try again later'));
            }
          }
        })
        .catch(function (error) {
          console.log('ERROR 1: ' + error.message);
          reject(new Error('ERROR: ' + error.message));
        })
      }
    });
  };
};
