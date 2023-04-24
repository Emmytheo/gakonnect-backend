const { Service } = require('feathers-mongodb');

exports.EventsNotifications = class EventsNotifications extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('events-notifications');
    });
  }
};
