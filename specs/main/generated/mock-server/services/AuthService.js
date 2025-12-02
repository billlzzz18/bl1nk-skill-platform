/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Authenticate with email/password
*
* loginRequest LoginRequest 
* returns AuthResponse
* */
const authLoginPOST = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        loginRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get the authenticated user
*
* returns User
* */
const authMeGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Register a user
*
* registerRequest RegisterRequest 
* returns AuthResponse
* */
const authRegisterPOST = ({ registerRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        registerRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  authLoginPOST,
  authMeGET,
  authRegisterPOST,
};
