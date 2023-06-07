// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    return new Promise((resolve, reject) => {
      if (context.data.action == "deposit") {
        if (context.data.debit_transc && context.data.debit_transc !== false) {
          let nw_amt =
            parseInt(context.params.user.personalWalletBalance) +
            parseInt(context.data.amount);
          context.app.service("users").patch(context.params.user._id, {
            personalWalletBalance: nw_amt.toString(),
          });
        }
      } else if (
        context.data.action == "transfer" ||
        context.data.action == "withdraw"
      ) {
      } else if (context.data.wallet === false) {
      } else {
        let nw_amt =
          parseInt(context.params.user.personalWalletBalance) -
          parseInt(context.data.amount);
        context.app.service("users").patch(context.params.user._id, {
          personalWalletBalance: nw_amt.toString(),
        });
      }

      // Search for transaction
      context.service
        .find({
          query: {
            transaction_id: context.data.transaction_id,
          },
        })
        .then((res) => {
          if (res.data && res.data.length >= 1) {
            context.service
              .patch(res.data[0]._id, {
                ...res.data[0],
                ...context.data.data,
                updatedAt: Date.now(),
              })
              .then((res) => {
                context.result = "Done";
                resolve(context);
              })
              .catch(function (error) {
                console.log("ERROR_2: " + error);
                reject(new Error("ERROR_2: " + error.message));
              });
          } else {
            resolve(context);
          }
        })
        .catch(function (error) {
          console.log("ERROR_1: " + error);
          reject(new Error("ERROR_1: " + error.message));
        });
    });
  };
};
