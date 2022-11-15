const { Service } = require('feathers-mongodb');

exports.GiftCards = class GiftCards extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('gift-cards');
    });
  }
};
