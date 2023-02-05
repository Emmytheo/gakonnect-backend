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
    return context;
  };
};
