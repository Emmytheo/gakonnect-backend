const { Service } = require('feathers-mongodb');

exports.VirtAccounts = class VirtAccounts extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('virt-accounts');
    });
  }
};
