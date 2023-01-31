const { Service } = require('feathers-mongodb');

exports.EPins = class EPins extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('e-pins');
    });
  }
};
