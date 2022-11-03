// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      switch (context.data.query) {
        case 'optimal':
          context.service.find({query: { 
            status : 'active',
            balance: {
              $gte: 0
            }
          }})
          .then((res)=>{
            if(res.data && res.data.length >= 1){
              let payload = {};
              res.data.forEach(api => {
                Object.keys(api.offerings).forEach(ntwrk => {
                  payload[ntwrk] = api.offerings[ntwrk].map(offer => {
                    delete offer.trueAmount
                    if(offer.provider === api.apiName){
                      offer.provider = api.apiName
                    }
                    return offer
                  })
                });
              });
              
              // delete payload.data.query
              // // delete payload.data.id
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
        default:
          console.log('Unsupported Data API Query')
          reject(new Error('Query Not Supported'));
          break;
      }
    })
  };
};
