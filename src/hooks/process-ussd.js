// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if(context.data.serviceCode === "*384*72216#"){
        context.app.service('users').find({query: { 
          phone : context.data.phoneNumber,
        }})
        .then(res=>{
          if(res.data && res.data.length >= 1){
            let user = res.data[0];
            let plans = {};
            let charge = 0;
            switch(user.package){
              case 'starter': 
                  charge = 50
              break;

              case 'reseller': 
                  charge = 30
              break;

              case 'superuser': 
                  charge = 0
              break;

              default: 
              break;
            }
            context.app.service("data-apis").create({query: { 
              query: 'optimal',
            }})
            .then((response) => {
              Object.keys(response.data).forEach(ntwrk => {
                let count = 1;
                response.data[ntwrk].forEach(pln => {
                  plans[ntwrk] += 1 + ". " + pln.name + " - " + parseInt(pln.amount) + charge + "\n"
                });
              });
            })
            .catch((error) => {
              context.result = "CON Network Error, Try Again END";
              resolve(context);
            })

            //Old Member
            switch (context.data.text) {
              case '':
                response  = "CON Welcome " + user.firstname + ", What would you like to do? \n"
                response += "1. Check Wallet Balance \n"
                response += "2. Buy Airtime \n"
                response += "3. Buy Data \n"
                response += "4. Pay Electric Bill \n"
                response += "5. Pay for Cable (GoTv, DSTV, Startiimes...) \n"
                response += "6. Fund Wallet \n"
                response += "7. Transfer \n"
                response += "8. Withdraw \n"
                response += "9. Buy GiftCards \n"
                response += "0. Quit"
                break;
              
              case '1':
                response  = "CON Your account number is ₦ " + user.personalWalletBalance + "\n\n"
                response += "0. Quit"
                break;
    
              case '2':
                response  = "CON 1. For Self \n"
                response += "2. For Others"
                break;
    
              case '2*1':
                response  = "CON Choose a Network \n"
                response += "1. MTN \n"
                response += "2. AIRTEL \n"
                response += "3. GLO \n"
                response += "4. 9MOBILE \n"
                break;
              
              case '2*1*1':
                response  = "CON Choose a Plan \n"
                response += plans.mtn
                break;
              
              case '2*1*2':
                response  = "CON Choose a Network\n"
                response += plans.airtel
                break;
              
              case '2*1*3':
                response  = "CON Choose a Network\n"
                response += plans.glo
                break;
              
              case '2*1*4':
                response  = "CON Choose a Network\n"
                response += plans.etisalat
                break;
    
              case '0':
                response = "CON Thanks for choosing kugatel END"
                break;
            
              default:
                response = "CON Wrong Input, Try Again. END"
                break;
            }
            context.result = response;
            resolve(context);
          }
          else{
            //New Member
            context.result = "END Welcome to the Kugatel USSD Portal, Kindly go to www.dashboard.kugatel.com.ng to create your account.";
            resolve(context);
          }
        })
        .catch(error=>{
          context.result = "END Network Error, Try Again";
          resolve(context);
        })

        
      }
      else{
        reject(new Error("UnAuthorized"));
      }

    })
  };
};
