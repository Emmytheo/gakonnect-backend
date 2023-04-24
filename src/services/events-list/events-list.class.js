const { Service } = require('feathers-mongodb');

exports.EventsList = class EventsList extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('events-list');
    });
  }
};
