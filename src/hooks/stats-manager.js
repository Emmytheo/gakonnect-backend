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
          .then((resx) => {
            if(resx.data && resx.data.length >= 1){
              resx.data.forEach(api => {
                if(!api.service){
                  context.service.remove(api._id)
                  .then(res => {
                    // console.log(res)
                  })
                  .catch(error => {
                    // console.log(error.message)
                  })
                }
              })
            }
          })
          for (const serv in context.app.services) {
            if (Object.hasOwnProperty.call(context.app.services, serv)) {
              const service = context.app.services[serv];
              switch (serv) {
                case 'airtime':
                  let airtime_stats = {
                    service: serv,
                    name: 'Airtime Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        // console.log(parseInt(transc.response.data.amount))
                        if(transc.status == 'successful'){
                          airtime_stats.successful.total += parseInt(transc.amount)
                          airtime_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          airtime_stats.pending.total += parseInt(transc.amount)
                          airtime_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          airtime_stats.failed.total += parseInt(transc.amount)
                          airtime_stats.failed.data_points.push(transc)
                        }
                      });
                      // console.log(airtime_stats)
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        // console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, airtime_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        // console.log('created it')
                        context.service.create({query: 'create', ...airtime_stats})
                      }
                    })
                  });
                  break;
                case 'data':
                  let data_stats = {
                    service: serv,
                    name: 'Data Sub. Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        // console.log(transc)
                        if(transc.status == 'successful'){
                          data_stats.successful.total += parseInt(transc.amount)
                          data_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          data_stats.pending.total += parseInt(transc.amount)
                          data_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          data_stats.failed.total += parseInt(transc.amount)
                          data_stats.failed.data_points.push(transc)
                        }
                      });                      
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        // console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, data_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        // console.log('created it')
                        context.service.create({query: 'create', ...data_stats})
                      }
                    })
                  });
                  break;
                case 'electricity':
                  let electricity_stats = {
                    service: serv,
                    name: 'Electric Bill. Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        if(transc.status == 'successful'){
                          electricity_stats.successful.total += parseInt(transc.amount)
                          electricity_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          electricity_stats.pending.total += parseInt(transc.amount)
                          electricity_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          electricity_stats.failed.total += parseInt(transc.amount)
                          electricity_stats.failed.data_points.push(transc)
                        }
                      });                      
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, electricity_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        console.log('created it')
                        context.service.create({query: 'create', ...electricity_stats})
                      }
                    })
                  });
                  break;
                case 'cable':
                  let cable_stats = {
                    service: serv,
                    name: 'Cable Sub. Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        if(transc.status == 'successful'){
                          cable_stats.successful.total += parseInt(transc.amount)
                          cable_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          cable_stats.pending.total += parseInt(transc.amount)
                          cable_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          cable_stats.failed.total += parseInt(transc.amount)
                          cable_stats.failed.data_points.push(transc)
                        }
                      });                      
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, cable_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        console.log('created it')
                        context.service.create({query: 'create', ...cable_stats})
                      }
                    })
                  });
                  break;
                case 'gift-card':
                  let gift_card_stats = {
                    service: serv,
                    name: 'Gift Card Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        if(transc.status == 'successful'){
                          gift_card_stats.successful.total += parseInt(transc.amount)
                          gift_card_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          gift_card_stats.pending.total += parseInt(transc.amount)
                          gift_card_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          gift_card_stats.failed.total += parseInt(transc.amount)
                          gift_card_stats.failed.data_points.push(transc)
                        }
                      });                      
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, gift_card_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        console.log('created it')
                        context.service.create({query: 'create', ...gift_card_stats})
                      }
                    })
                  });
                  break;
                case 'e-pin':
                  let e_pin_stats = {
                    service: serv,
                    name: 'Airtime E-Pin Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        if(transc.status == 'successful'){
                          e_pin_stats.successful.total += parseInt(transc.amount)
                          e_pin_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          e_pin_stats.pending.total += parseInt(transc.amount)
                          e_pin_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          e_pin_stats.failed.total += parseInt(transc.amount)
                          e_pin_stats.failed.data_points.push(transc)
                        }
                      });                      
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, e_pin_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        console.log('created it')
                        context.service.create({query: 'create', ...e_pin_stats})
                      }
                    })
                  });
                  break;
                case 'bets':
                  let bets_stats = {
                    service: serv,
                    name: 'Bet Wallet Fund. Stats',
                    successful: {total : 0, data_points: []}, 
                    pending: {total : 0, data_points: []}, 
                    failed: {total : 0, data_points: []},
                    total: {profits : 0, losses: 0, net: 0}
                  };
                  context.app.service(serv).find()
                  .then((res)=>{
                    if(res.data && res.data.length >= 1){
                      res.data.forEach(transc => {
                        if(transc.status == 'successful'){
                          bets_stats.successful.total += parseInt(transc.amount)
                          bets_stats.successful.data_points.push(transc)
                        }
                        else if(transc.status == 'pending'){
                          bets_stats.pending.total += parseInt(transc.amount)
                          bets_stats.pending.data_points.push(transc)
                        }
                        else if(transc.status == 'failed'){
                          bets_stats.failed.total += parseInt(transc.amount)
                          bets_stats.failed.data_points.push(transc)
                        }
                      });                      
                    }
                    context.service.find({query: { 
                      service : serv
                    }})
                    .then((res)=>{
                      if(res.data && res.data.length >= 1){
                        console.log('found it', res.data[0])
                        context.service.patch(res.data[0]._id, bets_stats);
                        if(res.data.length > 1){
                          for (let index = 1; index < res.data.length; index++) {
                            context.service.remove(res.data[index]._id)
                          }
                        }
                      }
                      else{
                        console.log('created it')
                        context.service.create({query: 'create', ...bets_stats})
                      }
                    })
                  });
                  break;
                case 'wallet':
                  
                  break;
                default:
                  break;
              }              
            }
          }
          // context.service.find()
          // .then((res) => {
          //   if(res.data && res.data.length >= 1){
          //     res.data.forEach(api => {
          //       if(!api.apiName){
          //         context.service.remove(api._id)
          //         .then(res => {
          //           // console.log(res)
          //         })
          //         .catch(error => {
          //           console.log(error.message)
          //         })
          //       }
          //       switch (api.apiName) {
          //         case 'bingpay':
          //           let bingpay_config = {
          //             method: 'get',
          //             url: 'https://' + BINGPAY.BASE_URL + BINGPAY.API_CHECK_BALANCE,
          //             headers: {
          //               'Content-Type': 'application/json',
          //               'Authorization': `Bearer ${process.env.BINGPAY_KEY}`
          //             },
          //           }
          //           axios(bingpay_config)
          //           .then(async function (response) {
          //             if(!response.data.error){
          //               // bp_payload = await bp_pool(bingpay_config);
          //               context.service.patch(api._id, {balance: response.data.data.balance});

          //             }
          //           })
          //           .catch(function (error) {
          //             console.log('ERROR: ' + error.message);
          //           })
          //           default:
          //             break;
          //         }
          //       });
          //       context.result = "APIs Updated";
          //       resolve(context);
          //     }
          //     else{
          //       for (const serv in context.app.services) {
          //         console.log(serv);
          //         if (Object.hasOwnProperty.call(context.app.services, serv)) {
          //           const service = context.app.services[serv];
          //           console.log(service)
          //         }
          //       }
          //       // console.log(context.app.services);
          //       reject(new Error('No APIs Avaliable'));
          //     }
          //   })
          //   .catch((error)=>{
          //     console.log(error.message)
          //     reject(new Error(error.message));
          //   })
          //   resolve(context);
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
