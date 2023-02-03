// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if(context.data.action == 'deposit'){
      if(context.data.debit_transc && context.data.debit_transc !== false){
        let nw_amt = parseInt(context.params.user.personalWalletBalance) + parseInt(context.data.amount);
        context.app.service('users').patch(context.params.user._id, {personalWalletBalance: nw_amt.toString()})
      }
    }
    else if(context.data.action == 'transfer' || context.data.action == 'withdraw'){
      // Nothing here yet
    }
    else{
      let nw_amt = parseInt(context.params.user.personalWalletBalance) - parseInt(context.data.amount);
      context.app.service('users').patch(context.params.user._id, {personalWalletBalance: nw_amt.toString()})
    }
    return context;
  };
};
