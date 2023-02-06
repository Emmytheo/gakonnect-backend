// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if(context.data && context.data.reselling && context.data.resell_amt){
      if(context.data.amount){
        context.data.amount = context.data.resell_amt
      }
    }
    // else if(context.data){
    //   if(context.params.user.role !== "admin"){
    //     let charge = 0;
    //     switch(context.params.user.package){
    //         case 'starter': 
    //             charge = 50
    //         break;

    //         case 'reseller': 
    //             charge = 30
    //         break;

    //         case 'superuser': 
    //             charge = 0
    //         break;

    //         default: 
    //         break;
    //     }
    //   }
    //   if(context.data.amount){
    //     context.data.amount =  parseInt(context.data.amount) - parseInt(charge)
    //   }
    // }
    return context;
  };
};
