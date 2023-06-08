// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { TwitterApi } = require("twitter-api-v2");
const client = new TwitterApi("Bearer " + process.env.TWITTER_KEY);
var roClient = client.readOnly;

module.exports = (options = {}) => {
  return async (context) => {
    return new Promise((resolve, reject) => {
      if (context.method == "find") {
        if (context.data && context.data.action) {
          roClient.v2
            .me()
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.message);
            });

          switch (context.data.action) {
            case "auth":
              context.result = "Done";
              resolve(context);
              break;

            default:
              context.result = "Done";
              resolve(context);
              break;
          }
        } else {
          resolve(context);
        }
      } else {
        resolve(context);
      }
    });
  };
};
