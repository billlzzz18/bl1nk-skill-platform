/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Delete an agent
*
* workspaceId String 
* agentId String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdAgentsAgentIdDELETE = ({ workspaceId, agentId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        agentId,
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
* Fetch an agent
*
* workspaceId String 
* agentId String 
* returns Agent
* */
const workspacesWorkspaceIdAgentsAgentIdGET = ({ workspaceId, agentId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        agentId,
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
* Update an agent
*
* workspaceId String 
* agentId String 
* updateAgentRequest UpdateAgentRequest 
* returns Agent
* */
const workspacesWorkspaceIdAgentsAgentIdPATCH = ({ workspaceId, agentId, updateAgentRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        agentId,
        updateAgentRequest,
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
* Chat-test an agent with optional tool calls
*
* workspaceId String 
* agentId String 
* agentTestRequest AgentTestRequest 
* returns TestResponse
* */
const workspacesWorkspaceIdAgentsAgentIdTestPOST = ({ workspaceId, agentId, agentTestRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        agentId,
        agentTestRequest,
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
* List agents
*
* workspaceId String 
* page Integer  (optional)
* perPage Integer  (optional)
* search String  (optional)
* returns _workspaces__workspaceId__agents_get_200_response
* */
const workspacesWorkspaceIdAgentsGET = ({ workspaceId, page, perPage, search }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
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
* Create an agent
*
* workspaceId String 
* createAgentRequest CreateAgentRequest 
* page Integer  (optional)
* perPage Integer  (optional)
* search String  (optional)
* returns Agent
* */
const workspacesWorkspaceIdAgentsPOST = ({ workspaceId, createAgentRequest, page, perPage, search }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        createAgentRequest,
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

module.exports = {
  workspacesWorkspaceIdAgentsAgentIdDELETE,
  workspacesWorkspaceIdAgentsAgentIdGET,
  workspacesWorkspaceIdAgentsAgentIdPATCH,
  workspacesWorkspaceIdAgentsAgentIdTestPOST,
  workspacesWorkspaceIdAgentsGET,
  workspacesWorkspaceIdAgentsPOST,
};
