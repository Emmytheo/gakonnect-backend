const { Service } = require('feathers-mongodb');

exports.Stats = class Stats extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('stats');
    });
  }
};
