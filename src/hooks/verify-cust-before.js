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
const path = require('path');
var fs = require('fs');
const filename = path.resolve(__dirname);
// const filename = './rb3ds/refs'


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
      else if(context.data.type == "checkPhone"){
        let ipqs_config = {
          method: 'get',
          url: `https://ipqualityscore.com/api/json/phone/${process.env.IPQS_KEY}/${context.data.phone_num}?country[]=NG`,
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.FLW_PUBLIC_KEY}`
          },
        }
        axios(ipqs_config)
        //1
        .then(function (response) {
          // console.log(response)
          if(response.data.success == true){
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
