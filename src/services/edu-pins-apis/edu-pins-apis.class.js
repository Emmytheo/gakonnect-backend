const { Service } = require('feathers-mongodb');

exports.EduPinsApis = class EduPinsApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('edu-pins-apis');
    });
  }
};
