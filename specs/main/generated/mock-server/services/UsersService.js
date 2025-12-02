/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Fetch a user profile
*
* userId String 
* returns User
* */
const usersUserIdGET = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
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
* Update profile fields
*
* userId String 
* updateUserRequest UpdateUserRequest 
* returns User
* */
const usersUserIdPATCH = ({ userId, updateUserRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        updateUserRequest,
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
* List workspaces accessible by a user
*
* userId String 
* page Integer  (optional)
* perPage Integer  (optional)
* returns _users__userId__workspaces_get_200_response
* */
const usersUserIdWorkspacesGET = ({ userId, page, perPage }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        page,
        perPage,
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
  usersUserIdGET,
  usersUserIdPATCH,
  usersUserIdWorkspacesGET,
};
