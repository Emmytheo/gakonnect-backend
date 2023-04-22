const { Service } = require('feathers-mongodb');

exports.EventsFeed = class EventsFeed extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('events-feed');
    });
  }
};
