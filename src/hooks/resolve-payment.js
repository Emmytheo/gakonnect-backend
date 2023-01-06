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
      console.log(context);
      if(context.data){
        delete context.data.dateTime;
        const hashPS = crypto.createHmac('sha512', secretPS).update(JSON.stringify(context.data)).digest('hex');
        const signature = context.params.headers['verif-hash'];
      }
      if(context.method === 'find'){
        context.result = 'Unauthorized';
        resolve(context)
      }
      else if (hashPS == context.params.headers['x-paystack-signature']) {
        switch (context.data.event) {
          case "charge.dispute":
            
            break;
          
          case "charge.dispute":
            
            break;

          case "charge.dispute":
            
            break;

          case "charge.success":
            
            break;
            
          case "customeridentification.failed":
            
            break;
            
          case "customeridentification.success":
              
            break;
  
          case "invoice.create":
              
            break;
  
          case "invoice.payment_failed":
              
            break;
            
          case "invoice.update":
            
            break;
            
          case "paymentrequest.pending":
              
            break;
  
          case "paymentrequest.success":
              
            break;
  
          case "refund.failed":
              
            break;
              
          case "refund.pending":
              
            break;
              
          case "refund.processed":
                
            break;
    
          case "refund.processing":
                
            break;
    
          case "subscription.create":
                
            break;
              
          case "subscription.disable":
            
            break;
              
          case "subscription.expiring_cards":
                
            break;
    
          case "subscription.not_renew":
                
            break;
    
          case "transfer.failed":
                
            break;
                
          case "transfer.success":
                
            break;

          case "transfer.reversed":
                
            break;
        
          default:
            break;
        }

        context.result = "Settled";
        resolve(context);

      }
      else{
        console.log(context);
        context.app.service('flw-webhooks').create(context.data);
        if (signature && (signature == secretFW)) {
          switch (context.data.event) {
            case 'charge.completed':
              context.result = "Received";
              resolve(context);
              // Search for transaction
              // context.app.service('wallet').find({query: { 
              //   transaction_id : context.data.data.transaction_id,
              // }})
              // .then((res)=>{
              //   if(res.data && res.data.length >= 1){
              //     if(res.data[0].status !== 'successful'){
              //       flw.Transaction.verify({ id: res.data[0].transaction_id })
              //       .then((response) => {
              //         if (
              //           response.data.status === "successful"
              //           && response.data.amount === res.data[0].amount
              //           && response.data.currency === res.data[0].currency
              //         ) {
              //             //Update Wallet Balance
              //             context.app.service('users').find({query: {email : response.data.customer.email, _id : response.data.tx_ref.split('-')[0]}})
              //             .then((resx)=>{
              //               if(resx.data && resx.data.length >= 1){
              //                 let nw_bal = parseInt(resx.data[0].personalWalletBalance) + parseInt(response.data.amount);
              //                 context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
              //               }
              //             })
              //           }
                      
              //         //Update Wallet Transaction Object
              //         context.app.service('wallet').patch(res.data[0]._id, {...response.data, ...res.data[0], updatedAt: Date.now()});
              //         context.result = "Transaction Resolved";
              //         resolve(context);

              //       })
              //       .catch(function (error) {
              //         console.log('ERROR: ' + error);
              //         reject(new Error('ERROR: ' + error.message));
              //       })
              //     }
              //   } else {
              //     if(context.data.event.type === "BANK_TRANSFER_TRANSACTION"){
              //       flw.Transaction.verify({ id: context.data.data.transaction_id })
              //       .then((response) => {
              //         if (
              //           response.data.status === "successful"
              //           && response.data.amount === res.data[0].amount
              //           && response.data.currency === res.data[0].currency
              //         ) {
              //             //Update Wallet Balance
              //             context.app.service('users').find({query: {email : response.data.customer.email}})
              //             .then((resx)=>{
              //               if(resx.data && resx.data.length >= 1){
              //                 let nw_bal = parseInt(resx.data[0].personalWalletBalance) + parseInt(response.data.amount);
              //                 context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
              //               }
              //             })
              //           }
                          
              //         //Update Wallet Transaction Object
              //         context.app.service('wallet').create({ action: 'deposit', debit_transc: false, ...response.data, ...res.data[0], updatedAt: Date.now()});
              //         context.result = "Transaction Resolved";
              //         resolve(context);
    
              //       })
              //       .catch(function (error) {
              //         console.log('ERROR: ' + error);
              //         reject(new Error('ERROR: ' + error.message));
              //       })
              //     }
              //     else{
              //       resolve(context);
              //     }
              //   }
              // })
              break;
            case 'transfer.completed':
              
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
