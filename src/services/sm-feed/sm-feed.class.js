const { Service } = require('feathers-mongodb');

exports.SmFeed = class SmFeed extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('sm-feed');
    });
  }
};
