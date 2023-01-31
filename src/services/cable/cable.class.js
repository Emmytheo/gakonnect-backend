const { Service } = require('feathers-mongodb');

exports.Cable = class Cable extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('cable');
    });
  }
};
