// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const path = require('path');
var fs = require('fs');
const filename = path.resolve(__dirname, '..', 'rb3ds');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if(context.method === 'find'){
        let ref = `'pointer'`
        let file = path.join(filename, ref);
        fs.writeFile(file, ref, function (err) {
          if (err) reject(err);
          fs.readFile(file, (error, data) => {
            if(error) {
              console.log(error)
              return reject(error);
            }
            // context.result = JSON.parse(data.toString());
            // context.params.headers[`content-type`] = "application/octet-stream"
            // context.params.headers[`content-disposition`] = `attachment; filename="pointer"`
            context.data = {}
            console.log(context.params.headers)
            console.log(data)
            context.result = data;
            resolve(context)                                        
          });
        })
        // context.result = 'Unauthorized';
        // resolve(context)
      }
      else if(context.data.verifiedsource === true){
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
        console.log("airt2cash", context)
        context.app.service('airt-2-cash').find({query: { 
          reference : context.data.data.reference,
        }})
        .then((res)=>{
          if(res.data && res.data.length >= 1){
            if(context.data.data.status == 'approved' && res.data[0].status !== 'pending'){
              res.data[0].status = 'successful';
              //Update Wallet Balance
              context.app.service('users').find({query: {email : res.data[0].email}})
              .then((resx)=>{
                if(resx.data && resx.data.length >= 1){
                  let nw_bal = parseFloat(resx.data[0].personalWalletBalance) - parseFloat(res.data[0].verificationData.value);
                  context.app.service('users').patch(resx.data[0]._id, {personalWalletBalance: nw_bal.toString()});
                }
              })
            }
            else{
              res.data[0].status = context.data.data.status;
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
