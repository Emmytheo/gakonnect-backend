const { Service } = require('feathers-mongodb');

exports.FlwWebhooks = class FlwWebhooks extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('flw-webhooks');
    });
  }
};
