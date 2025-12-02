/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List MCP tools in a workspace
*
* workspaceId String 
* returns List
* */
const workspacesWorkspaceIdToolsGET = ({ workspaceId }) => new Promise(
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
* Create a tool definition
*
* workspaceId String 
* createToolRequest CreateToolRequest 
* returns Tool
* */
const workspacesWorkspaceIdToolsPOST = ({ workspaceId, createToolRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        createToolRequest,
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
* Delete a tool
*
* workspaceId String 
* toolId String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdToolsToolIdDELETE = ({ workspaceId, toolId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        toolId,
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
* Fetch a tool definition
*
* workspaceId String 
* toolId String 
* returns Tool
* */
const workspacesWorkspaceIdToolsToolIdGET = ({ workspaceId, toolId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        toolId,
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
* Update a tool
*
* workspaceId String 
* toolId String 
* updateToolRequest UpdateToolRequest 
* returns Tool
* */
const workspacesWorkspaceIdToolsToolIdPATCH = ({ workspaceId, toolId, updateToolRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        toolId,
        updateToolRequest,
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
  workspacesWorkspaceIdToolsGET,
  workspacesWorkspaceIdToolsPOST,
  workspacesWorkspaceIdToolsToolIdDELETE,
  workspacesWorkspaceIdToolsToolIdGET,
  workspacesWorkspaceIdToolsToolIdPATCH,
};
