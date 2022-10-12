// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var crypto = require('crypto');
var secret = process.env.PS_KEY;

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(context.data)).digest('hex');
      if (hash == context.params.headers['x-paystack-signature']) {
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

        reject(new Error('UnAuthorized'));
      }
    })
  };
};
