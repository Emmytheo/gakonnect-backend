const { Service } = require('feathers-mongodb');

exports.InfluManage = class InfluManage extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('influ-manage');
    });
  }
};
