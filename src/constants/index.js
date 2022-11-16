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
  //Fetch All Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
  //Fetch All Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
  //Fetch All Gift Cards
  API_LOCAL_GIFTCARDS: "/all-local-giftcards",
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

  
module.exports = { EBILLS, SUBPADI, PAYSTACK, BINGPAY, GSUBZ, SME_API, NEARLY_FREE };
//   export default ENDPOINTS;
  