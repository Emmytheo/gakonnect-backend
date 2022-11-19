// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var crypto = require('crypto');
var secretPS = process.env.PS_KEY;
var secretFW = process.env.PS_KEY;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      delete context.data.dateTime;
      const hashPS = crypto.createHmac('sha512', secretPS).update(JSON.stringify(context.data)).digest('hex');
      const signature = context.params.headers['verif-hash'];
      if (hashPS == context.params.headers['x-paystack-signature']) {
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
        if (signature && (signature == secretFW)) {
          switch (context.data.event) {
            case 'charge.completed':
              
              break;
            case 'transfer.completed':
              
              break;
            case 'subscription.cancelled':
              
              break;
            case 'charge.completed':
              
              break;
          
            default:
              break;
          }
          
          context.result = "Settled";
          resolve(context);

        }
        else{
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