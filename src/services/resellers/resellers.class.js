const { Service } = require('feathers-mongodb');

exports.Resellers = class Resellers extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('resellers');
    });
  }
};
