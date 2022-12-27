// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html


// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      delete context.data.dateTime;
      if(context.data.verifiedsource === true){
        context.app.service('users').find({query: { 
          email : context.data.email,
        }})
        .then(res=>{
          if(res.data && res.data.length >= 1){
            if(
              context.data.phone === res.data[0].phone &&
              context.data.firstname === res.data[0].firstname
            ){
              if(context.data.password === context.data["verify-password"]){
                context.app.service('users').patch(res.data[0]._id, {password: context.data.password})
                .then(res=>{
                  context.result = "Password Changed"
                  resolve(context);
                })
                .catch(error=>{
                  reject(new Error(error.message));
                })
              }
              else{
                reject(new Error("Passwords Don't Match"));
              }
            }
            else{
              reject(new Error("Account verification failed"));
            }
          } 
          else{
            reject(new Error("Account doesn't exist"));
          }
        })
        .catch(error=>{
          reject(new Error(error.message));
        })
      }
      else if(context.params.headers['host'] === '51.161.6.43'){
        context.app.service('airt-2-cash').find({query: { 
          reference : context.data.data.reference,
        }})
        .then((res)=>{
          if(res.data && res.data.length >= 1){
            if(context.data.data.status == 'approved' && res.data[0].status !== 'successful'){
              res.data[0].status = 'successful';
            }
            res.data[0].approval = context.data.data;
            //Update Transaction Object
            context.app.service('airt-2-cash').patch(res.data[0]._id, {...res.data[0], updatedAt: Date.now()});
            context.result = "Transaction Resolved";
            resolve(context);
          }
        })
        .catch(function (error) {
          console.log('ERROR: ' + error);
          reject(new Error('ERROR: ' + error.message));
        })
      }
      else{
        reject(new Error("Unauthorized"));
      }
    })
  };
};
