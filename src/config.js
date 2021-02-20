const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 8080,
  // access key id (from portal or sub account)
  NCP_API_access_key: process.env.NCP_API_ACCESS_KEY,

  // secret key (from portal or sub account)
  NCP_API_secret_key: process.env.NCP_API_SECRET_KEY,

  // sens serviceID
  SENS_service_ID: process.env.SENS_SERVICE_ID,

  myPhoneNumber: process.env.MY_PHONE_NUMBER,
};

module.exports = config;
