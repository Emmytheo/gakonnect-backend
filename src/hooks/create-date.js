// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    context.data.dateTime = new Date().toISOString();
    if(context.params.user && context.path == "edu-pins"){
      let nw_amt = parseInt(context.params.user.personalWalletBalance) - parseInt(context.data.amount);
      context.app.service('users').patch(context.params.user._id, {personalWalletBalance: nw_amt.toString()})
    }
    
    return context;
  };
};
