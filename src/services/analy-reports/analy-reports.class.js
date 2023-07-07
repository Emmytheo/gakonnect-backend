const { Service } = require('feathers-mongodb');

exports.AnalyReports = class AnalyReports extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('analy-reports');
    });
  }
};
