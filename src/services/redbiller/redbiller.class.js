const { Service } = require('feathers-mongodb');

exports.Redbiller = class Redbiller extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('redbiller');
    });
  }
};
