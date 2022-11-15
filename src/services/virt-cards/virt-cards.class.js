const { Service } = require('feathers-mongodb');

exports.VirtCards = class VirtCards extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('virt-cards');
    });
  }
};
