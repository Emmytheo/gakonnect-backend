const { Service } = require('feathers-mongodb');

exports.BetApis = class BetApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('bet-apis');
    });
  }
};
