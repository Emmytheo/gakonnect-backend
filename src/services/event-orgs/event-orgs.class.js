const { Service } = require('feathers-mongodb');

exports.EventOrgs = class EventOrgs extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('event-orgs');
    });
  }
};
