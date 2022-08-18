const { Service } = require('feathers-mongodb');

exports.Bills = class Bills extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('bills');
    });
  }
};
