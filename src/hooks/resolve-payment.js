// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var crypto = require('crypto');
var secretPS = process.env.PS_KEY;
var secretFW = process.env.FW_KEY;
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if(context.data){
        const signature = context.params.headers['verif-hash'];
        if (signature && signature === 'kugatel') {
          switch (context.data.event) {
            case 'charge.completed':
              // Search for transaction
              context.app.service('wallet').find({query: { 
                transaction_id : context.data.data.id,
              }})
              .then((res)=>{
                if(res.data && res.data.length >= 1){
                  if(res.data[0].status !== 'successful'){
                    flw.Transaction.verify({ id: res.data[0].transaction_id })
                    .then((response) => {
                      if (
                        response.data.status === "successful"
                        && response.data.amount === res.data[0].amount
                        && response.data.currency === res.data[0].currency
                      ) {
                          //Update Wallet Balance
                          context.app.service('users').find({query: {email : response.data.customer.email, transaction_id : response.data.id}})
                          .then((resx)=>{
                            if(resx.data && resx.data.length >= 1){
                              let nw_bal = parseFloat(resx.data[0].personalWalletBalance) + parseFloat(response.data.amount);
                              context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
                            }
                          })
                        }
                      
                      //Update Wallet Transaction Object
                      context.app.service('wallet').patch(res.data[0]._id, {...response.data, updatedAt: Date.now()});
                      context.result = "Transaction Resolved";
                      resolve(context);

                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error);
                      reject(new Error('ERROR: ' + error.message));
                    })
                  }
                } else {
                  if(context.data['event.type'] === "BANK_TRANSFER_TRANSACTION"){
                    flw.Transaction.verify({ id: context.data.data.id })
                    .then((response) => {
                      if (
                        response.data.status === "successful"
                      ) {
                          //Update Wallet Balance
                          context.app.service('users').find({query: {email : response.data.customer.email}})
                          .then((resx)=>{
                            if(resx.data && resx.data.length >= 1){
                              let nw_bal = parseInt(resx.data[0].personalWalletBalance) + parseInt(response.data.amount) - parseFloat(response.data.app_fee);
                              context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
                            }
                          })
                        }
                          
                      //Update Wallet Transaction Object
                      // console.log("wallet record updated", response.data);
                      response.data.transaction_id = response.data.id
                      context.app.service('wallet').create({ action: 'deposit', debit_transc: false, email: response.data.customer.email, ...response.data, updatedAt: Date.now()});
                      context.result = "Transaction Resolved";
                      resolve(context);
    
                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error);
                      reject(new Error('ERROR: ' + error.message));
                    })
                  }
                  else{
                    resolve(context);
                  }
                }
              })
              break;
            case 'transfer.completed':
              // Search for transaction
              context.app.service('wallet').find({query: { 
                transaction_id : context.data.data.id,
              }})
              .then((res)=>{
                if(res.data && res.data.length >= 1){
                  if(res.data[0].status !== 'pending'){
                    flw.Transaction.verify({ id: res.data[0].transaction_id })
                    .then((response) => {
                      if (
                        response.data.status === "successful"
                        //&& response.data.amount === res.data[0].amount
                        //&& response.data.currency === res.data[0].currency
                      ) {
                          //Update Wallet Balance
                          context.app.service('users').find({query: {email : response.data.customer.email, transaction_id : response.data.id}})
                          .then((resx)=>{
                            if(resx.data && resx.data.length >= 1){
                              let nw_bal = parseFloat(resx.data[0].personalWalletBalance) - parseFloat(response.data.amount) - parseFloat(response.data.fee);
                              context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
                            }
                          })
                        }
                      console.log(res.data[0], context.data)
                      //Update Wallet Transaction Object
                      context.app.service('wallet').patch(res.data[0]._id, {...response.data, status:  response.data.status.toLowerCase(), updatedAt: Date.now()})
                      .then((rp)=>{
                        console.log('final', rp.data)
                      })
                      context.result = "Transaction Resolved";
                      resolve(context);

                    })
                    .catch(function (error) {
                      console.log('ERROR: ' + error);
                      reject(new Error('ERROR: ' + error.message));
                    })
                  }
                } 
                // else {
                //   if(context.data['event.type'] === "BANK_TRANSFER_TRANSACTION"){
                //     flw.Transaction.verify({ id: context.data.data.id })
                //     .then((response) => {
                //       if (
                //         response.data.status === "successful"
                //       ) {
                //           //Update Wallet Balance
                //           context.app.service('users').find({query: {email : response.data.customer.email}})
                //           .then((resx)=>{
                //             if(resx.data && resx.data.length >= 1){
                //               let nw_bal = parseInt(resx.data[0].personalWalletBalance) + parseInt(response.data.amount) - parseFloat(response.data.app_fee);
                //               context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
                //             }
                //           })
                //         }
                          
                //       //Update Wallet Transaction Object
                //       // console.log("wallet record updated", response.data);
                //       context.app.service('wallet').create({ action: 'deposit', debit_transc: false, email: response.data.customer.email, ...response.data, updatedAt: Date.now()});
                //       context.result = "Transaction Resolved";
                //       resolve(context);
    
                //     })
                //     .catch(function (error) {
                //       console.log('ERROR: ' + error);
                //       reject(new Error('ERROR: ' + error.message));
                //     })
                //   }
                //   else{
                //     resolve(context);
                //   }
                // }
              })
              
              break;
            case 'subscription.cancelled':
              
              break;
          
            default:
              break;
          }
          
          context.result = "Settled";
          resolve(context);

        }
        else{
          // resolve(context);
          reject(new Error('UnAuthorized'));
        }
      }
      
      if(context.method === 'find'){
        context.result = 'Unauthorized';
        resolve(context)
      }
      if(context.method === 'create'){
        console.log(context, signature);
        // context.app.service('flw-webhooks').create(context.data);
        
      }

    })
  };
};


// {
//   "status": "success",
//   "message": "Transfer Queued Successfully",
//   "data": {
//     "id": 26251,
//     "account_number": "0690000040",
//     "bank_code": "044",
//     "full_name": "Flutterwave Developers",
//     "created_at": "2020-01-20T16:09:34.000Z",
//     "currency": "NGN",
//     "debit_currency": "NGN",
//     "amount": 5500,
//     "fee": 45,
//     "status": "NEW",
//     "reference": "akhlm-pstmnpyt-rfxx007_PMCKDU_1",
//     "meta": null,
//     "narration": "Akhlm Pstmn Trnsfr xx007",
//     "complete_message": "",
//     "requires_approval": 0,
//     "is_approved": 1,
//     "bank_name": "ACCESS BANK NIGERIA"
//   }
// }
