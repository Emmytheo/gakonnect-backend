const { Service } = require('feathers-mongodb');

exports.VerifyCustomer = class VerifyCustomer extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('verify-customer');
    });
  }
};
