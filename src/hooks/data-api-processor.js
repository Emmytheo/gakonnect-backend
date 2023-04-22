// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { EBILLS,SUBPADI, BINGPAY, GSUBZ, NEARLY_FREE } = require("../constants");
const axios = require('axios').default;
const levenshtein = require('fast-levenshtein'); 

async function nf_pool (config, networks){
  config.url = 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_GET_PLANS;
  let nf_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
  for (let index = 0; index < networks.length; index++) {
    const ntwrk = networks[index];
    config.params = {
      network: ntwrk
    }
    try {
      const resp  = await axios(config);
      if(resp.data.status === 'successful' && resp.data.content.plans.length > 0 ){
        if(!config.params.network.search(/mtn/i)){
          nf_payload.mtn = nf_payload.mtn.concat(
            resp.data.content.plans.map(pln => {
              let ammt = parseInt(pln.price);
              if (parseInt(pln.price) % 5 > 0){
                if(parseInt(pln.price) % 5 <= 5){
                  // console.log(parseInt(pln.price) % 5, parseInt(pln.price), Math.round(parseInt(pln.price) / 5) * 5)
                  ammt = Math.round(parseInt(pln.price) / 5) * 5;
                  ammt += 5;
                }
                else{
                  ammt = Math.round(parseInt(pln.price) / 5) * 5
                }
              }
              return {
                amount: ammt,
                id: pln.plan,
                name: pln.plan,
                provider: 'nearly_free',
                trueAmount: parseInt(pln.price).toString(),
                plan_id: pln.planId,
                network_id: ntwrk
              }
            })
          )
        }
        else if(!config.params.network.search(/glo/i)){
            nf_payload.glo = nf_payload.glo.concat(resp.data.content.plans.map(pln => {
              let ammt = parseInt(pln.price);
              if (parseInt(pln.price) % 5 > 0){
                if(parseInt(pln.price) % 5 <= 5){
                  // console.log(parseInt(pln.price) % 5, parseInt(pln.price), Math.round(parseInt(pln.price) / 5) * 5 + 5)
                  ammt = Math.round(parseInt(pln.price) / 5) * 5;
                  ammt += 5;
                }
                else{
                  ammt = Math.round(parseInt(pln.price) / 5) * 5
                }
              }
              return {
                amount: ammt,
                id: pln.plan,
                name: pln.plan,
                provider: 'nearly_free',
                trueAmount: parseInt(pln.price).toString(),
                plan_id: pln.planId,
                network_id: ntwrk
              }
            })
          )
        }
        else if(!config.params.network.search(/airtel/i)){
            nf_payload.airtel = nf_payload.airtel.concat(
              resp.data.content.plans.map(pln => {
                let ammt = parseInt(pln.price);
              if (parseInt(pln.price) % 5 > 0){
                if(parseInt(pln.price) % 5 <= 5){
                  ammt = Math.round(parseInt(pln.price) / 5) * 5;
                  ammt += 5;
                }
                else{
                  ammt = Math.round(parseInt(pln.price) / 5) * 5
                }
              }
                return {
                  amount: ammt,
                  id: pln.plan,
                  name: pln.plan,
                  provider: 'nearly_free',
                  trueAmount: parseInt(pln.price).toString(),
                  plan_id: pln.planId,
                  network_id: ntwrk
                }
              })
            )
        }
        else if(!config.params.network.search(/9mobile/i)){
            nf_payload.etisalat = nf_payload.etisalat.concat(
              resp.data.content.plans.map(pln => {
                let ammt = parseInt(pln.price);
              if (parseInt(pln.price) % 5 > 0){
                if(parseInt(pln.price) % 5 <= 5){
                  ammt = Math.round(parseInt(pln.price) / 5) * 5;
                  ammt += 5;
                }
                else{
                  ammt = Math.round(parseInt(pln.price) / 5) * 5
                }
              }
                return {
                  amount: ammt,
                  id: pln.plan,
                  name: pln.plan,
                  provider: 'nearly_free',
                  trueAmount: parseInt(pln.price).toString(),
                  plan_id: pln.planId,
                  network_id: ntwrk
                }
              })
            )
        }
      }

    } catch (error) {
      console.log('ERROR: ' + error.message);
      reject(new Error('ERROR: ' + error.message));
    }
  }
  return nf_payload;
}

// async function gs_pool (config, networks){
//   config.url = 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_GET_PLANS;
//   let nf_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
//   for (let index = 0; index < networks.length; index++) {
//     const ntwrk = networks[index];
//     config.params = {
//       network: ntwrk
//     }
//     try {
//       const resp  = await axios(config);
//       if(resp.data.status === 'successful' && resp.data.content.plans.length > 0 ){
//         if(!config.params.network.search(/mtn/i)){
//           nf_payload.mtn = nf_payload.mtn.concat(
//             resp.data.content.plans.map(pln => {
//               return {
//                 amount: parseInt(pln.price).toString(),
//                 id: pln.plan,
//                 name: pln.plan,
//                 provider: 'nearly_free',
//                 trueAmount: parseInt(pln.price).toString(),
//                 plan_id: pln.planId,
//                 network_id: ntwrk
//               }
//             })
//           )
//         }
//         else if(!config.params.network.search(/glo/i)){
//             nf_payload.glo = nf_payload.glo.concat(resp.data.content.plans.map(pln => {
//               return {
//                 amount: parseInt(pln.price).toString(),
//                 id: pln.plan,
//                 name: pln.plan,
//                 provider: 'nearly_free',
//                 trueAmount: parseInt(pln.price).toString(),
//                 plan_id: pln.planId,
//                 network_id: ntwrk
//               }
//             })
//           )
//         }
//         else if(!config.params.network.search(/airtel/i)){
//             nf_payload.airtel = nf_payload.airtel.concat(
//               resp.data.content.plans.map(pln => {
//                 return {
//                   amount: parseInt(pln.price).toString(),
//                   id: pln.plan,
//                   name: pln.plan,
//                   provider: 'nearly_free',
//                   trueAmount: parseInt(pln.price).toString(),
//                   plan_id: pln.planId,
//                   network_id: ntwrk
//                 }
//               })
//             )
//         }
//         else if(!config.params.network.search(/9mobile/i)){
//             nf_payload.etisalat = nf_payload.etisalat.concat(
//               resp.data.content.plans.map(pln => {
//                 return {
//                   amount: parseInt(pln.price).toString(),
//                   id: pln.plan,
//                   name: pln.plan,
//                   provider: 'nearly_free',
//                   trueAmount: parseInt(pln.price).toString(),
//                   plan_id: pln.planId,
//                   network_id: ntwrk
//                 }
//               })
//             )
//         }
//       }

//     } catch (error) {
//       console.log('ERROR: ' + error.message);
//       reject(new Error('ERROR: ' + error.message));
//     }
//   }
//   return nf_payload;
// }


const sortPlans = (plans) => {
  let _plans = plans;
  let sortedPlans = [];
  let popular_plans = ['40mb', '50mb', '100mb','150mb', '350mb', '200mb', '300mb', '500mb', '500.0mb', '750mb', '1gb', '1.05gb', '1.25gb', '1.35gb', '2gb', '2.5gb', '2.9gb', '3gb', '4.1gb', '4.5gb', '5gb', '6gb', '5.8gb', '7.7gb', '9.2gb', '10.8gb', '14gb', '18gb', '24gb', '29.5gb', '93gb', '138gb', '10gb', '11gb', '11.5gb', '13.25gb', '15gb', '18.25gb', '20gb', '30gb', '4gb', '75gb', ];
  // console.log("input ---> ", plans)
  popular_plans.forEach(pop_pln => {
    let similar_plns = {sme: null, cg: null, promo: null};
    _plans.forEach(pln => {
      if(pln.name.toLowerCase().search(pop_pln.toLowerCase()) !== -1 && pln.name.toUpperCase().search(" " + pop_pln.toUpperCase()) !== -1){
        if(pln.name.toLowerCase().search('cg') !== -1 || pln.name.toUpperCase().search('GIFTING') !== -1){
          if(similar_plns.cg && parseInt(similar_plns.cg.amount) > parseInt(pln.amount)){
            similar_plns.cg = pln;
          }
          else{
            if(similar_plns.cg === null){
              similar_plns.cg = pln;
            }
          }
        }
        else if(pln.name.toLowerCase().search('promo') !== -1 || pln.name.toUpperCase().search('PROMO') !== -1){
          if(similar_plns.promo && parseInt(similar_plns.promo.amount) > parseInt(pln.amount)){
            similar_plns.promo = pln;
          }
          else{
            if(similar_plns.promo === null){
              similar_plns.promo = pln;
            }
          }
        }
        else{
          if(similar_plns.sme && parseInt(similar_plns.sme.amount) > parseInt(pln.amount)){
            similar_plns.sme = pln;
          }
          else{
            if(similar_plns.sme === null){
              similar_plns.sme = pln;
            }
          }
        }
      }
    })
    // console.log("mid ---> ", similar_plns)
    if(similar_plns.sme !== null || similar_plns.cg !== null || similar_plns.promo !== null){
      if(similar_plns.sme !== null){
        sortedPlans.push(similar_plns.sme)
      }
      if(similar_plns.cg !== null){
        sortedPlans.push(similar_plns.cg)
      }
      if(similar_plns.promo !== null){
        sortedPlans.push(similar_plns.promo)
      }
    }
  })
  // console.log("output ---> ", sortedPlans)
  return sortedPlans;
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
              let payload = {mtn: [], glo: [], airtel: [], etisalat: []};
              res.data.forEach(api => {
                Object.keys(api.offerings).forEach(ntwrk => {
                  payload[ntwrk] = payload[ntwrk].concat(
                    api.offerings[ntwrk].map(offer => {
                        delete offer.trueAmount
                        if(offer.provider === api.apiName){
                          offer.provider = api.apiName
                        }
                        return offer
                      }
                    )
                  )
                });
              });
              // console.log(levenshteinFilter(payload.mtn))
              Object.keys(payload).forEach(ntwrk => {
                payload[ntwrk] = sortPlans(payload[ntwrk]);
              })
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
          
        case 'test':
          // delete context.data.query
          // let nearlyfree_config1 = {
          //   method: 'get',
          //   url: 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_CHECK_BALANCE,
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Authorization': `Basic ${process.env.NEARLYFREE_KEY_BASE64}`
          //   },
          // }
          // axios(nearlyfree_config1)
          // .then(async function (response) {
          //   if(response.data.status === 'successful'){
          //     console.log(parseInt(response.data.content.balance).toString());
          //   }
          //   else{
          //     console.log('ERROR 3: ' + error.message);
          //     reject(new Error('ERROR: ' + error.message));
          //   }
          // })
          // .catch(function (error) {
          //   console.log('ERROR: ' + error.message);
          //   // throw new Error(error.message);
          //   reject(new Error('ERROR: ' + error.message));
          // })
          console.log(context.data)
          break;
        case 'aggregate':
          delete context.data.query
          context.service.find()
          .then((res) => {
            if(res.data && res.data.length >= 1){
              let gs_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
              let bp_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
              let nf_payload = {mtn: [], glo: [], airtel: [], etisalat: []};
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
                            let ammt = parseInt(plan.price);
                            if (parseInt(plan.price) % 5 > 0){
                              if(parseInt(plan.price) % 5 <= 5){
                                ammt = Math.round(parseInt(plan.price) / 5) * 5;
                              }
                              else{
                                ammt = Math.round(parseInt(plan.price) / 5) * 5
                              }
                            }
                            return {
                              amount: ammt,
                              id: `9mobile Data ${plan.displayName}`,
                              name: `9mobile Data ${plan.displayName}`,
                              provider: api.apiName,
                              trueAmount: plan.price,
                              plan_id: plan.value,
                              serviceID: 'etisalat_data'
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
                                amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                id: `Airtel Data ${plan.displayName}`,
                                name: `Airtel Data ${plan.displayName}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.value,
                                serviceID: 'airtel_data'
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
                                  amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                  id: `Airtel Data ${plan.displayName}`,
                                  name: `Airtel Data ${plan.displayName}`,
                                  provider: api.apiName,
                                  trueAmount: plan.price,
                                  plan_id: plan.value,
                                  serviceID: 'airtel_cg'
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
                                    amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                    id: `Glo Data ${plan.displayName}`,
                                    name: `Glo Data ${plan.displayName}`,
                                    provider: api.apiName,
                                    trueAmount: plan.price,
                                    plan_id: plan.value,
                                    serviceID: 'glo_data'
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
                                      amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                      id: `MTN Data ${plan.displayName} CG`,
                                      name: `MTN Data ${plan.displayName} CG`,
                                      provider: api.apiName,
                                      trueAmount: plan.price,
                                      plan_id: plan.value,
                                      serviceID: 'mtncg'
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
                                        amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                        id: `MTN Data ${plan.displayName} SME`,
                                        name: `MTN Data ${plan.displayName} SME`,
                                        provider: api.apiName,
                                        trueAmount: plan.price,
                                        plan_id: plan.value,
                                        serviceID: 'mtn_sme'
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
                                amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                id: `MTN Data ${plan.name}`,
                                name: `MTN Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                                network_id: plan.network_id
                              })
                              break;
                            case '2':
                              bp_payload.airtel.push({
                                amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                id: `Airtel Data ${plan.name}`,
                                name: `Airtel Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                                network_id: plan.network_id
                              })
                              break;
                            case '3':
                              bp_payload.etisalat.push({
                                amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                id: `9mobile Data ${plan.name}`,
                                name: `9mobile Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                                network_id: plan.network_id
                              })
                              break;
                            case '4':
                              bp_payload.glo.push({
                                amount: parseInt(plan.price) % 5 > 0 ? (Math.round(parseInt(plan.price) / 5) * 5).toString() : parseInt(plan.price).toString(),
                                id: `Glo Data ${plan.name}`,
                                name: `Glo Data ${plan.name}`,
                                provider: api.apiName,
                                trueAmount: plan.price,
                                plan_id: plan.uniq_id,
                                network_id: plan.network_id
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

                  case 'nearly_free':
                    let nearlyfree_config1 = {
                      method: 'get',
                      url: 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_GET_PRODUCTS,
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${process.env.NEARLYFREE_KEY_BASE64}`
                      },
                      params : {
                        category: "data"
                      }
                    }
                    axios(nearlyfree_config1)
                    .then(async function (response) {
                      if(response.data.status === 'successful'){
                        let pld = [];
                        context.data.status = 'successful';
                        response.data.content.networks.forEach(pln => {
                          if(pln.service === "Data"){
                            if(!pln.network.search(/mtn/i)){
                              nf_payload.mtn.push({...pln})
                              pld.push(pln.networkId)
                            }
                            else if(!pln.network.search(/glo/i)){
                              nf_payload.glo.push({...pln})
                              pld.push(pln.networkId)
                            }
                            else if(!pln.network.search(/airtel/i)){
                              nf_payload.airtel.push({...pln})
                              pld.push(pln.networkId)
                            }
                            else if(!pln.network.search(/9mobile/i)){
                              nf_payload.etisalat.push({...pln})
                              pld.push(pln.networkId)
                            }
                          }
                        })
                        nf_payload = await nf_pool(nearlyfree_config1, pld);
                        context.service.patch(api._id, {offerings: nf_payload})
                        nearlyfree_config1.url = 'https://' + NEARLY_FREE.API_BASE_URL + NEARLY_FREE.API_CHECK_BALANCE;
                        delete nearlyfree_config1.params;
                        axios(nearlyfree_config1)
                        .then(async function (response) {
                          if(response.data.status === 'successful'){
                            context.service.patch(api._id, {balance: parseInt(response.data.content.balance).toString()})
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
