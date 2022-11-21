// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      delete context.data.dateTime;
      if(context.data.verifiedsource === true){
        // console.log(context.data)
        reject(new Error("Try Again Later"));
      }
      else{
        reject(new Error("Unauthorized"));
      }
    })
  };
};
