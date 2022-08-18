const { Service } = require('feathers-mongodb');

exports.Transactions = class Transactions extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('transactions');
    });
  }
};
