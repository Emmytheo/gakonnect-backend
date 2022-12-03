const { Service } = require('feathers-mongodb');

exports.Ussd = class Ussd extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('ussd');
    });
  }
};
