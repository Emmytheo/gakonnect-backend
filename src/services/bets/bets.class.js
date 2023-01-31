const { Service } = require('feathers-mongodb');

exports.Bets = class Bets extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('bets');
    });
  }
};
