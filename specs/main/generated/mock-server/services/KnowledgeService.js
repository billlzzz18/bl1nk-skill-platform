/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List knowledgebases
*
* workspaceId String 
* returns List
* */
const workspacesWorkspaceIdKnowledgebasesGET = ({ workspaceId }) => new Promise(
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
* Delete a knowledgebase
*
* workspaceId String 
* knowledgebaseId String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDELETE = ({ workspaceId, knowledgebaseId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        knowledgebaseId,
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
* Fetch a knowledgebase
*
* workspaceId String 
* knowledgebaseId String 
* returns Knowledgebase
* */
const workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGET = ({ workspaceId, knowledgebaseId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        knowledgebaseId,
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
* Update a knowledgebase
*
* workspaceId String 
* knowledgebaseId String 
* updateKnowledgebaseRequest UpdateKnowledgebaseRequest 
* returns Knowledgebase
* */
const workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPATCH = ({ workspaceId, knowledgebaseId, updateKnowledgebaseRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        knowledgebaseId,
        updateKnowledgebaseRequest,
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
* Create a knowledgebase
*
* workspaceId String 
* createKnowledgebaseRequest CreateKnowledgebaseRequest 
* returns Knowledgebase
* */
const workspacesWorkspaceIdKnowledgebasesPOST = ({ workspaceId, createKnowledgebaseRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        createKnowledgebaseRequest,
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
  workspacesWorkspaceIdKnowledgebasesGET,
  workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDELETE,
  workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGET,
  workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPATCH,
  workspacesWorkspaceIdKnowledgebasesPOST,
};
