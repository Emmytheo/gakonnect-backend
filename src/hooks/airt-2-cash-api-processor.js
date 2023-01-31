// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const axios = require('axios').default;

async function bp_pool (config){
  config.url = 'https://' + BINGPAY.BASE_URL + BINGPAY.API_AIRT2CASH_INFO;
  config.method = 'post';
  let bp_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
  for (let index = 1; index < 5; index++) {
    const ntwrk = index;
    config.data = {
      network: ntwrk
    }
    try {
      const resp  = await axios(config);
      if(!response.data.error){
        if(ntwrk == '1'){
          bp_payload.mtn = response.data.data
        }
        else if (ntwrk == '2'){
          bp_payload.airtel = response.data.data
        }
        else if (ntwrk == '3'){
          bp_payload.etisalat = response.data.data
        }
        else if (ntwrk == '4'){
          bp_payload.glo = response.data.data
        }
      }
    } catch (error) {
      console.log('ERROR: ' + error.message);
      reject(new Error('ERROR: ' + error.message));
    }
  }
  return bp_payload;
}

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      switch (context.data.query) {
        case 'optimal':
          context.service.find({query: { 
            status : 'active'
          }})
          .then((res)=>{
            if(res.data && res.data.length >= 1){
              let payload = [];
              res.data.forEach(api => {
                return payload.push(api.apiName)
              });

              console.log(payload);
              context.result = payload;
              resolve(context);
            }
            else{
              reject(new Error('No APIs Avaliable'));
            }
          })
          .catch((error)=>{
            console.log(error.message)
            reject(new Error(error.message));
          })
          break;
        case 'create':
          delete context.data.query
          resolve(context);
          break;
        case 'aggregate':
          delete context.data.query
          context.service.find()
          .then((res) => {
            if(res.data && res.data.length >= 1){
              res.data.forEach(api => {
                if(!api.apiName){
                  context.service.remove(api._id)
                  .then(res => {
                    console.log(res)
                  })
                  .catch(error => {
                    console.log(error.message)
                  })
                }
                switch (api.apiName) {
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
                    .then(async function (response) {
                      if(!response.data.error){
                        // bp_payload = await bp_pool(bingpay_config);
                        context.service.patch(api._id, {balance: response.data.data.balance});

                      }
                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error.message);
                    })
                    default:
                      break;
                  }
                });
                context.result = "APIs Updated";
                resolve(context);
              }
              else{
                reject(new Error('No APIs Avaliable'));
              }
            })
            .catch((error)=>{
              console.log(error.message)
              reject(new Error(error.message));
            })
            resolve(context);
            break;
        case 'test':
          console.log(context.data)
          break;
        default:
          console.log('Unsupported Data API Query', context.data)
          reject(new Error('Query Not Supported'));
          break;
      }
    })
  };
};
