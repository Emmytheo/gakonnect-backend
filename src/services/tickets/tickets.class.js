const { Service } = require('feathers-mongodb');

exports.Tickets = class Tickets extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('tickets');
    });
  }
};
