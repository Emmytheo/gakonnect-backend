const { Service } = require('feathers-mongodb');

exports.AudiInsights = class AudiInsights extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('audi-insights');
    });
  }
};
