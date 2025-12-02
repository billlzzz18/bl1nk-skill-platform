/**
 * The ToolsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ToolsService');
const workspacesWorkspaceIdToolsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdToolsGET);
};

const workspacesWorkspaceIdToolsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdToolsPOST);
};

const workspacesWorkspaceIdToolsToolIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdToolsToolIdDELETE);
};

const workspacesWorkspaceIdToolsToolIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdToolsToolIdGET);
};

const workspacesWorkspaceIdToolsToolIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdToolsToolIdPATCH);
};


module.exports = {
  workspacesWorkspaceIdToolsGET,
  workspacesWorkspaceIdToolsPOST,
  workspacesWorkspaceIdToolsToolIdDELETE,
  workspacesWorkspaceIdToolsToolIdGET,
  workspacesWorkspaceIdToolsToolIdPATCH,
  listTools: workspacesWorkspaceIdToolsGET,
  createTool: workspacesWorkspaceIdToolsPOST,
  deleteTool: workspacesWorkspaceIdToolsToolIdDELETE,
  getTool: workspacesWorkspaceIdToolsToolIdGET,
  updateTool: workspacesWorkspaceIdToolsToolIdPATCH,
};
