const { Service } = require('feathers-mongodb');

exports.Airt2CashApis = class Airt2CashApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('airt-2-cash-apis');
    });
  }
};
