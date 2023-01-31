const { Service } = require('feathers-mongodb');

exports.Airt2Cash = class Airt2Cash extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('airt-2-cash');
    });
  }
};
