// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_KEY;



// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    return new Promise((resolve, reject) => {
      if (
        (context.method == "update" ||
          context.method == "patch" ||
          context.method == "create") &&
        context.path == "tickets"
      ) {
        if (context.data.send_mail) {
          new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
            {
              'subject':`Successful ${context.data.event} Ticket Purchase!`,
              'sender' : {'email':'tickets@mail.kugatel.com.ng', 'name':'Emmanuel'},
              'replyTo' : {'email':'tickets@mail.kugatel.com.ng', 'name':'Emmanuel'},
              'to' : [{'name': context.data.recipient_name, 'email': context.data.recipient_email}],
              'templateId' : context.data.ticket_email_id,
              'params' : {...context.data}
            }
          ).then(function(data) {
            console.log(context.data, data);
            context.data.email_resp = data
            resolve(context);
          }, function(error) {
            console.error(error);
            reject(new Error("ERROR_1: " + error));
          });
        } else {
          resolve(context);
        }
      } else {
        resolve(context);
      }
    });
  };
};
