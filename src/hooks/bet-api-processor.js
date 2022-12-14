// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER } = require("../constants");
const axios = require('axios').default;

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
                api.prods = api.products.map(item=> {
                  return {
                    id: item.product,
                    name: item.product,
                    logo: item.logo,
                    limit: `Your funding limit is from ${item.limits.min_amount} NGN to ${item.limits.max_amount} NGN`
                  }
                })
                return payload.push(api)
              });
              // console.log(payload);
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
                  case 'redbiller':
                    let redbiller_config = {
                      method: 'get',
                      url: REDBILLER.API_CHECK_BALANCE,
                      headers: {
                        'Content-Type': 'application/json',
                        'Private-Key': `${process.env.REBBILLER_PRIV_KEY}`
                      },
                    }
                    console.log(api);
                    axios(redbiller_config)
                    .then(function (response) {
                      console.log(response.data)
                      context.service.patch(api._id, {balance: response.data.details.available});
                      
                      redbiller_config.url = 'https://' + REDBILLER.API_BASE_URL + REDBILLER.API_GET_BET_PROVIDERS
                      console.log(redbiller_config);
                      //
                      axios(redbiller_config)
                      .then(function (response) {                        
                        if(response.data.status === 'true'){
                          context.data.status = 'successful';
                          context.service.patch(api._id, {products: response.data.details});
                        }
                        else{
                          console.log('ERROR 3: ' + response.data.message);
                          reject(new Error('ERROR: ' + response.data.message));
                        }
                      })
                      .catch(function (error) {
                        console.log('ERROR 2: ' + error.message);
                        reject(new Error('ERROR: ' + error.message));
                      })
                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error.message);
                    })
                    default:
                      break;
                  }
  
                });
                context.result = "Bet APIs Updated";
                resolve(context);
              }
              else{
                reject(new Error('No Bet APIs Avaliable'));
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
