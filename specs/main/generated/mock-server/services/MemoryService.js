/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List memory artifacts
*
* workspaceId String 
* page Integer  (optional)
* perPage Integer  (optional)
* returns _workspaces__workspaceId__memories_get_200_response
* */
const workspacesWorkspaceIdMemoriesGET = ({ workspaceId, page, perPage }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
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
* Delete a memory entry
*
* workspaceId String 
* memoryId String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdMemoriesMemoryIdDELETE = ({ workspaceId, memoryId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        memoryId,
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
* Fetch a memory entry
*
* workspaceId String 
* memoryId String 
* returns Memory
* */
const workspacesWorkspaceIdMemoriesMemoryIdGET = ({ workspaceId, memoryId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        memoryId,
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
* Update a memory entry
*
* workspaceId String 
* memoryId String 
* updateMemoryRequest UpdateMemoryRequest 
* returns Memory
* */
const workspacesWorkspaceIdMemoriesMemoryIdPATCH = ({ workspaceId, memoryId, updateMemoryRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        memoryId,
        updateMemoryRequest,
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
* Create a memory entry
*
* workspaceId String 
* createMemoryRequest CreateMemoryRequest 
* page Integer  (optional)
* perPage Integer  (optional)
* returns Memory
* */
const workspacesWorkspaceIdMemoriesPOST = ({ workspaceId, createMemoryRequest, page, perPage }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        createMemoryRequest,
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
  workspacesWorkspaceIdMemoriesGET,
  workspacesWorkspaceIdMemoriesMemoryIdDELETE,
  workspacesWorkspaceIdMemoriesMemoryIdGET,
  workspacesWorkspaceIdMemoriesMemoryIdPATCH,
  workspacesWorkspaceIdMemoriesPOST,
};
