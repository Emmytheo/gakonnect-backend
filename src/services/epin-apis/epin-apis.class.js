const { Service } = require('feathers-mongodb');

exports.EpinApis = class EpinApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('epin-apis');
    });
  }
};
