const { Service } = require('feathers-mongodb');

exports.Airtime = class Airtime extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('airtime');
    });
  }
};
