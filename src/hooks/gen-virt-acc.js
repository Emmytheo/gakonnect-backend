// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// function encrypt(text) {
//  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//  let encrypted = cipher.update(text);
//  encrypted = Buffer.concat([encrypted, cipher.final()]);
//  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// function decrypt(text) {
//  let iv = Buffer.from(text.iv, 'hex');
//  let encryptedText = Buffer.from(text.encryptedData, 'hex');
//  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//  let decrypted = decipher.update(encryptedText);
//  decrypted = Buffer.concat([decrypted, decipher.final()]);
//  return decrypted.toString();
// }


// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if(!context.params.user.virtAcc){
        let details = {
          email: context.params.user.email,
          is_permanent: true,
          bvn: context.params.user.bvn,
          tx_ref: context.params.user._id,
          phonenumber: context.params.user.phone,
          firstname: context.params.user.firstname,
          lastname: context.params.user.lastname,
          narration: context.params.user.fullname,
        };
        flw.VirtualAcct.create(details)
        .then((res)=>{

          if(res.status === "success"){
            // context.data.response = res.data
            context.data.owner = { email: context.params.user.email, userId: context.params.user._id }
            context.app.service('users').patch(
              context.params.user._id, 
              {
                virtAcc: true
              }
            )
            resolve(context);
          }
          else{
            reject(new Error(res.message));
          }
        })
        .catch((error)=>{
          console.log("error", error.message)
          reject(new Error('ERROR: ' + error.message));
        });
      }
      else{
        reject(new Error('Virtual Account Already Exists.'));
      }
    })
  }
};
