const { Service } = require('feathers-mongodb');

exports.GiftCardApis = class GiftCardApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('gift-card-apis');
    });
  }
};
