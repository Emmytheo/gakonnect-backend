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

  
module.exports = { EBILLS, SUBPADI, PAYSTACK };
//   export default ENDPOINTS;
  