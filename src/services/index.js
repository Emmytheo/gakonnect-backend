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
const paystackWebhooks = require('./paystack-webhooks/paystack-webhooks.service.js');
const tickets = require('./tickets/tickets.service.js');
const apis = require('./apis/apis.service.js');
const dataApis = require('./data-apis/data-apis.service.js');
const flwWebhooks = require('./flw-webhooks/flw-webhooks.service.js');
const virtCards = require('./virt-cards/virt-cards.service.js');
const virtAccounts = require('./virt-accounts/virt-accounts.service.js');
const giftCards = require('./gift-cards/gift-cards.service.js');
const webhooks = require('./webhooks/webhooks.service.js');
const ghWebhooks = require('./gh-webhooks/gh-webhooks.service.js');
const ussd = require('./ussd/ussd.service.js');
const resellers = require('./resellers/resellers.service.js');
const epinApis = require('./epin-apis/epin-apis.service.js');
const betApis = require('./bet-apis/bet-apis.service.js');
const giftCardApis = require('./gift-card-apis/gift-card-apis.service.js');
const airt2Cash = require('./airt-2-cash/airt-2-cash.service.js');
const airt2CashApis = require('./airt-2-cash-apis/airt-2-cash-apis.service.js');
const stats = require('./stats/stats.service.js');
const redbiller = require('./redbiller/redbiller.service.js');
const airtimeApis = require('./airtime-apis/airtime-apis.service.js');
const cableApis = require('./cable-apis/cable-apis.service.js');
const electricityApis = require('./electricity-apis/electricity-apis.service.js');
const eduPinsApis = require('./edu-pins-apis/edu-pins-apis.service.js');
const eventsFeed = require('./events-feed/events-feed.service.js');
const eventsList = require('./events-list/events-list.service.js');
const eventsHelpDesk = require('./events-help-desk/events-help-desk.service.js');
const eventsNotifications = require('./events-notifications/events-notifications.service.js');
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
  app.configure(paystackWebhooks);
  app.configure(tickets);
  app.configure(apis);
  app.configure(dataApis);
  app.configure(flwWebhooks);
  app.configure(virtCards);
  app.configure(virtAccounts);
  app.configure(giftCards);
  app.configure(webhooks);
  app.configure(ghWebhooks);
  app.configure(ussd);
  app.configure(resellers);
  app.configure(epinApis);
  app.configure(betApis);
  app.configure(giftCardApis);
  app.configure(airt2Cash);
  app.configure(airt2CashApis);
  app.configure(stats);
  app.configure(redbiller);
  app.configure(airtimeApis);
  app.configure(cableApis);
  app.configure(electricityApis);
  app.configure(eduPinsApis);
  app.configure(eventsFeed);
  app.configure(eventsList);
  app.configure(eventsHelpDesk);
  app.configure(eventsNotifications);
}
