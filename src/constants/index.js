const EBILLS = {
    // API_BASE_URL: process.env.REACT_APP_API_URL,
    API_BASE_URL: 'ebills.ng/wp-json/api/v1',
    // Airtime Api
    API_BUY_AIRTIME: "/airtime",
    // Data Api
    API_BUY_DATA: "/data",
    // Electricity Api
    API_BUY_ELECTRICITY: "/electricity",
    // Cable Api
    API_BUY_CABLE: "/tv",
    // Verify Customer Api
    API_VERIFY_CUSTOMER: "/verify-customer",
    // Check Balance Api
    API_CHECK_BALANCE: "/balance",
    // Username
    API_USERNAME: "Emmy_Gakonnect",
    // Password
    API_PASSWORD: "EMMYfinest@123",
};

const NEARLY_FREE = {
  // API_BASE_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: 'api.nearlyfree.ng',
  // Get Plans Api
  API_GET_PLANS: "/plans",
  // Airtime Api
  API_PURCHASE: "/purchase",
  // Data Api
  API_GET_PRODUCTS: "/products",
  // Check Balance Api
  API_CHECK_BALANCE: "/balance",
  // Username
  API_USERNAME: "Emmytheo",
};

const MYSMEDATA = {
  // API_BASE_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: 'mysmedata.com.ng/api',
  // Buy Data Api
  API_BUY_DATA: "/data",
  // Buy Airtime Api
  API_BUY_AIRTIME: "/topup",
};

const SME_API = {
  // API_BASE_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: 'samorabot.com/vtu/api',
  // Data Api
  API_BUY_DATA: "/buydata",
  // Check Balance Api
  API_CHECK_BALANCE: "/balance",
  // Query Transaction
  API_QUERY: "/query",
};

const SUBPADI = {
  // API_BASE_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: 'subpadi.com/api',
  // Airtime Api
  API_BUY_AIRTIME: "/airtime",
  // Data Api
  API_BUY_DATA: "/data",
  // Electricity Api
  API_BUY_ELECTRICITY: "/electricity",
  // Cable Api
  API_BUY_CABLE: "/tv",
  // Verify Customer Api
  API_VERIFY_CUSTOMER: "/verify-customer",
  // Check Balance Api
  API_CHECK_BALANCE: "/balance",
  // User Details
  API_USER: "/user",
  // Username
  API_USERNAME: "Emmy_Gakonnect",
  // Password
  API_PASSWORD: "EMMYfinest@123",
};

const PAYSTACK = {
  // PS BASE URL,
  BASE_URL: 'api.paystack.co',
  //Get Bank List
  LIST_BANKS: '/bank',
  //Resolve Account Number
  RESOLVE_ACC_NO: '/bank/resolve',
  //transfers
  TRANSFER: '/transfer'
};

const BINGPAY = {
  //base URL
  BASE_URL: 'bingpay.ng/api/v1',
  // Airtime Api
  API_BUY_AIRTIME: "/buy-airtime",
  // Data Api
  API_BUY_DATA: "/buy-data",
  // Purchase Bill
  API_PURCHASE_BILL: "/purchase-bill",
  // Verify Customer Api
  API_VERIFY_CUSTOMER: "/validate-service",
  // Check Balance Api
  API_CHECK_BALANCE: "/self/balance",
  //Fetch All Local Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
  //Validate Local Gift Cards
  API_VAL_LOCAL_GIFTCARDS: "/validate-local-giftcard",
  //purchase local  Cards
  API_PURCHASE_LOCAL_GIFTCARDS: "/purchase-local-giftcard",
  //Fetch All airt2cash fee
  API_FETCH_AIRT2CASH_FEE: "/airtime-cash/fee",
  //Process airt2cash
  API_PROCESS_AIRT2CASH: "/airtime-cash/process",
  //Fetch AIRT2CASH INFO
  API_AIRT2CASH_INFO: "/airtime-cash/info",
  //Fetch All Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
  //Fetch All Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
  //Fetch All Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
  //Fetch All Networks
  API_FETCH_NETWORKS: "/all-networks",
  //Fetch Data Plans
  API_FETCH_DATA_PLANS: "/all-data-plans",
  //Fetch Data Plans for a network
  API_FETCH_NTWRK_DATA_PLANS: "/data-plans/{network_id}",
  //Fetch All Services
  API_FETCH_SERVICES: "/all-services",
  //Fetch All Services Variation ID
  API_FETCH_SERVICE_VAR: "/service/{service_id}",
  //Verify Phone
  API_VERIFY_PHONE: "/verify/phone"
}

const GSUBZ = {
  // API_BASE_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: 'gsubz.com/api',
  // Payment Api
  API_PAY: "/pay",
  // Fetch Plans
  API_FETCH_PLANS: "/plans",
}

const REDBILLER = {
  API_BASE_URL: 'api.live.redbiller.com',
  //Airtime Pins
  API_BUY_AIRTIME_PIN: '/1.3/bills/airtime-pin/purchase/create',
  //Check Balance
  API_CHECK_BALANCE: 'https://api.live.redbiller.com/1.0/get/balance',
  //Fund bet wallet
  API_FUND_BET_WALLET: '/1.4/bills/betting/account/payment/create',
  //verify bet account
  API_VERIFY_BET_WALLET: '/1.4/bills/betting/account/verify',
  //Get Betting providers
  API_GET_BET_PROVIDERS: '/1.4/bills/betting/providers/list'
}

  
module.exports = { EBILLS, SUBPADI, PAYSTACK, BINGPAY, GSUBZ, SME_API, NEARLY_FREE, MYSMEDATA, REDBILLER };
//   export default ENDPOINTS;
  