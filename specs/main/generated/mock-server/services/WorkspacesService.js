/* eslint-disable no-unused-vars */
const Service = require('./Service');

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
/**
* List workspaces
*
* page Integer  (optional)
* perPage Integer  (optional)
* search String  (optional)
* returns _users__userId__workspaces_get_200_response
* */
const workspacesGET = ({ page, perPage, search }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        page,
        perPage,
        search,
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
* Create a workspace
*
* createWorkspaceRequest CreateWorkspaceRequest 
* page Integer  (optional)
* perPage Integer  (optional)
* search String  (optional)
* returns Workspace
* */
const workspacesPOST = ({ createWorkspaceRequest, page, perPage, search }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        createWorkspaceRequest,
        page,
        perPage,
        search,
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
* Archive a workspace
*
* workspaceId String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdDELETE = ({ workspaceId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
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
* Retrieve workspace detail
*
* workspaceId String 
* returns Workspace
* */
const workspacesWorkspaceIdGET = ({ workspaceId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
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
* Update workspace metadata
*
* workspaceId String 
* updateWorkspaceRequest UpdateWorkspaceRequest 
* returns Workspace
* */
const workspacesWorkspaceIdPATCH = ({ workspaceId, updateWorkspaceRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        updateWorkspaceRequest,
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
  usersUserIdWorkspacesGET,
  workspacesGET,
  workspacesPOST,
  workspacesWorkspaceIdDELETE,
  workspacesWorkspaceIdGET,
  workspacesWorkspaceIdPATCH,
};
