const { Service } = require('feathers-mongodb');

exports.Campaigns = class Campaigns extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('campaigns');
    });
  }
};
