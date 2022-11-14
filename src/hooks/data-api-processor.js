// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ } = require("../constants");
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
              let payload = {mtn: [], glo: [], airtel: [], etisalat: []};
              res.data.forEach(api => {
                Object.keys(api.offerings).forEach(ntwrk => {
                  payload[ntwrk] = payload[ntwrk].concat(api.offerings[ntwrk].map(offer => {
                    delete offer.trueAmount
                    if(offer.provider === api.apiName){
                      offer.provider = api.apiName
                    }
                    return offer
                  }))
                });
              });
              
              // delete payload.data.query
              // // delete payload.data.id
              // console.log("Here", payload);
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
              let gs_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
              let bp_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
              res.data.forEach(api => {
                if(!api.apiName){
                  context.service.remove(api._id)
                  .then(res => {
                    // console.log(res)
                  })
                  .catch(error => {
                    console.log(error.message)
                  })
                }
                switch (api.apiName) {
                  case 'gsubz':
                    let gsubz_config = {
                      method: 'get',
                      url: 'https://' + GSUBZ.API_BASE_URL + GSUBZ.API_FETCH_PLANS,
                      headers: { },
                      params: {
                        service: 'etisalat_data'
                      }
                    }
                    axios(gsubz_config)
                    .then(function (response) {
                      if(response.data){
                        gs_payload.etisalat = gs_payload.etisalat.concat(
                          response.data.plans.map(plan => {
                            return {
                              amount: plan.price,
                              id: `9mobile Data ${plan.displayName}`,
                              name: `9mobile Data ${plan.displayName}`,
                              provider: api.apiName,
                              trueAmount: plan.price,
                              plan_id: plan.value,
                            }
                          })
                        )
                      }
                      gsubz_config.params.service = 'airtel_data';
                      axios(gsubz_config)
                      .then(function (response) {
                        if(response.data){
                          gs_payload.airtel = gs_payload.airtel.concat(
                            response.data.plans.map(plan => {
                              return {
                                amount: plan.price,
                                id: `Airtel Data ${plan.displayName}`,
                                name: `Airtel Data ${plan.displayName}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.value,
                              }
                            })
                          )
                        }
                        gsubz_config.params.service = 'airtel_cg';
                        axios(gsubz_config)
                        .then(function (response) {
                          if(response.data){
                            gs_payload.airtel = gs_payload.airtel.concat(
                              response.data.plans.map(plan => {
                                return {
                                  amount: plan.price,
                                  id: `Airtel Data ${plan.displayName}`,
                                  name: `Airtel Data ${plan.displayName}`,
                                  provider: api.apiName,
                                  trueAmount: plan.price,
                                  plan_id: plan.value,
                                }
                              })
                            )
                          }
                          gsubz_config.params.service = 'glo_data';
                          axios(gsubz_config)
                          .then(function (response) {
                            if(response.data){
                              gs_payload.glo = gs_payload.glo.concat(
                                response.data.plans.map(plan => {
                                  return {
                                    amount: plan.price,
                                    id: `Glo Data ${plan.displayName}`,
                                    name: `Glo Data ${plan.displayName}`,
                                    provider: api.apiName,
                                    trueAmount: plan.price,
                                    plan_id: plan.value,
                                  }
                                })
                              )
                            }
                            gsubz_config.params.service = 'mtncg';
                            axios(gsubz_config)
                            .then(function (response) {
                              if(response.data){
                                gs_payload.mtn = gs_payload.mtn.concat(
                                  response.data.plans.map(plan => {
                                    return {
                                      amount: plan.price,
                                      id: `MTN Data ${plan.displayName} CG`,
                                      name: `MTN Data ${plan.displayName} CG`,
                                      provider: api.apiName,
                                      trueAmount: plan.price,
                                      plan_id: plan.value,
                                    }
                                  })
                                )
                              }
                              gsubz_config.params.service = 'mtn_sme';
                              axios(gsubz_config)
                              .then(function (response) {
                                if(response.data){
                                  gs_payload.mtn = gs_payload.mtn.concat(
                                    response.data.plans.map(plan => {
                                      return {
                                        amount: plan.price,
                                        id: `MTN Data ${plan.displayName} SME`,
                                        name: `MTN Data ${plan.displayName} SME`,
                                        provider: api.apiName,
                                        trueAmount: plan.price,
                                        plan_id: plan.value,
                                      }
                                    })
                                  )
                                  // console.log(api.apiName, gs_payload)
                                  context.service.patch(api._id, {offerings: gs_payload});
                                }
                              })
                              .catch(function (error) {
                                console.log('ERROR: ' + error.message);
                              })
                            })
                            .catch(function (error) {
                              console.log('ERROR: ' + error.message);
                            })
                          })
                          .catch(function (error) {
                            console.log('ERROR: ' + error.message);
                          })
                        })
                        .catch(function (error) {
                          console.log('ERROR: ' + error.message);
                        })
                      })
                      .catch(function (error) {
                        console.log('ERROR: ' + error.message);
                      })
                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error.message);
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
                      if(response.data){
                        let nw_bal = parseInt(response.data.data.balance);
                        context.service.patch(api._id, {balance: nw_bal.toString()});
                      }
                    })
                    .catch(function (error) {
                      console.log('ERROR_NW: ' + error.message);
                    })

                    bingpay_config = {
                      method: 'get',
                      url: 'https://' + BINGPAY.BASE_URL + BINGPAY.API_FETCH_DATA_PLANS,
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.BINGPAY_KEY}`
                      },
                    }
                    axios(bingpay_config)
                    .then(function (response) {
                      if(response.data){
                        response.data.data.forEach(plan => {
                          switch (plan.network_id) {
                            case '1':
                              bp_payload.mtn.push({
                                amount: plan.price,
                                id: `MTN Data ${plan.name}`,
                                name: `MTN Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                              })
                              break;
                            case '2':
                              bp_payload.airtel.push({
                                amount: plan.price,
                                id: `Airtel Data ${plan.name}`,
                                name: `Airtel Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                              })
                              break;
                            case '3':
                              bp_payload.etisalat.push({
                                amount: plan.price,
                                id: `9mobile Data ${plan.name}`,
                                name: `9mobile Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                              })
                              break;
                            case '4':
                              bp_payload.glo.push({
                                amount: plan.price,
                                id: `Glo Data ${plan.name}`,
                                name: `Glo Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                              })
                              break;

                            default:
                              break;
                          }
                        });
                        // console.log(api.apiName, bp_payload)
                        context.service.patch(api._id, {offerings: bp_payload});
                      }
                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error.message);
                    })
                    
                    break;
                  
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
        
        default:
          console.log('Unsupported Data API Query', context.data)
          reject(new Error('Query Not Supported'));
          break;
      }
    })
  };
};
