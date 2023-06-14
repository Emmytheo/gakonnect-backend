// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    return new Promise((resolve, reject) => {
      if (!context.data.parsed) {
        //Confirm and Update wallet
        context.app
          .service("wallet")
          .create({ ...context.data.payment, wallet: false })
          .then((res) => {
            //Prep
            context.data.ticket_list.forEach((ticket) => {
              context.service
                .create({
                  ...ticket,
                  ticket_data: context.data.ticket_data[ticket.ticket_type],
                  event_id: context.data.event_id,
                  event: context.data.event,
                  buyer_email: context.data.payment_email,
                  buyer_phone: context.data.payment_phone,
                  seat_number: Math.floor(
                    Math.random() * (parseInt(context.data.ticket_data[ticket.ticket_type].seat_capacity) + 1)
                  ),
                  parsed: true,
                })
                // .then((res) => {
                // })
                .catch(function (error) {
                  console.log("ERROR_2: " + error);
                  reject(new Error("ERROR_2: " + error.message));
                });
            });
            context.result = "Done";
            resolve(context);
          })
          .catch(function (error) {
            console.log("ERROR_1: " + error);
            reject(new Error("ERROR_1: " + error.message));
          });
      } else if (context.data.parsed == true) {
        resolve(context);
      }
    });
  };
};
