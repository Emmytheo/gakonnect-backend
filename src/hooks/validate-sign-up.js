// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      context.service.find({
        query: {
          email: context.data.email
        }
      })
      .then(res => {
        if(res.data && res.data.length !== 0){
          console.log('Email Already Exists', res.data);
          reject(new Error('Email Already Exists'));
        }
        else{
          resolve(context);
        }
      })
      .catch(res => {
        console.log('Sign Up Error, Try Again', res.data);
        reject(new Error('Sign Up Error, Try Again'));
      })
    })
  };
};
