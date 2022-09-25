const users = require('./users/users.service.js')
const airtime = require('./airtime/airtime.service.js');
const data = require('./data/data.service.js');
const bets = require('./bets/bets.service.js');
const bills = require('./bills/bills.service.js');
const wallet = require('./wallet/wallet.service.js');
const transactions = require('./transactions/transactions.service.js');
const cable = require('./cable/cable.service.js');
const electricity = require('./electricity/electricity.service.js');
const eduPins = require('./edu-pins/edu-pins.service.js');
const ePins = require('./e-pins/e-pins.service.js');
const verifyCustomer = require('./verify-customer/verify-customer.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(airtime);
  app.configure(data);
  app.configure(bets);
  app.configure(bills);
  app.configure(wallet);
  app.configure(transactions);
  app.configure(cable);
  app.configure(electricity);
  app.configure(eduPins);
  app.configure(ePins);
  app.configure(verifyCustomer);
}
