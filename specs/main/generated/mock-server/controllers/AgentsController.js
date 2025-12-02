/**
 * The AgentsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AgentsService');
const workspacesWorkspaceIdAgentsAgentIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdAgentsAgentIdDELETE);
};

const workspacesWorkspaceIdAgentsAgentIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdAgentsAgentIdGET);
};

const workspacesWorkspaceIdAgentsAgentIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdAgentsAgentIdPATCH);
};

const workspacesWorkspaceIdAgentsAgentIdTestPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdAgentsAgentIdTestPOST);
};

const workspacesWorkspaceIdAgentsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdAgentsGET);
};

const workspacesWorkspaceIdAgentsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdAgentsPOST);
};


module.exports = {
  workspacesWorkspaceIdAgentsAgentIdDELETE,
  workspacesWorkspaceIdAgentsAgentIdGET,
  workspacesWorkspaceIdAgentsAgentIdPATCH,
  workspacesWorkspaceIdAgentsAgentIdTestPOST,
  workspacesWorkspaceIdAgentsGET,
  workspacesWorkspaceIdAgentsPOST,
  deleteAgent: workspacesWorkspaceIdAgentsAgentIdDELETE,
  getAgent: workspacesWorkspaceIdAgentsAgentIdGET,
  updateAgent: workspacesWorkspaceIdAgentsAgentIdPATCH,
  testAgent: workspacesWorkspaceIdAgentsAgentIdTestPOST,
  listAgents: workspacesWorkspaceIdAgentsGET,
  createAgent: workspacesWorkspaceIdAgentsPOST,
};
