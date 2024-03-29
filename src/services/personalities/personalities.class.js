const { Service } = require('feathers-mongodb');

exports.Personalities = class Personalities extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('personalities');
    });
  }
};
