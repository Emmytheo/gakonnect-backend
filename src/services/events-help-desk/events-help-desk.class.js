const { Service } = require('feathers-mongodb');

exports.EventsHelpDesk = class EventsHelpDesk extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('events-help-desk');
    });
  }
};
