const { Service } = require('feathers-mongodb');

exports.InboxNotif = class InboxNotif extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('inbox-notif');
    });
  }
};
