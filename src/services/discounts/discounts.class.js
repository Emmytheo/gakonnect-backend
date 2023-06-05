const { Service } = require('feathers-mongodb');

exports.Discounts = class Discounts extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('discounts');
    });
  }
};
