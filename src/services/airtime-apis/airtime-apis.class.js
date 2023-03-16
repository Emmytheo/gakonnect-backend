const { Service } = require('feathers-mongodb');

exports.AirtimeApis = class AirtimeApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('airtime-apis');
    });
  }
};
