/**
 * The MemoryController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/MemoryService');
const workspacesWorkspaceIdMemoriesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdMemoriesGET);
};

const workspacesWorkspaceIdMemoriesMemoryIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdMemoriesMemoryIdDELETE);
};

const workspacesWorkspaceIdMemoriesMemoryIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdMemoriesMemoryIdGET);
};

const workspacesWorkspaceIdMemoriesMemoryIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdMemoriesMemoryIdPATCH);
};

const workspacesWorkspaceIdMemoriesPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdMemoriesPOST);
};


module.exports = {
  workspacesWorkspaceIdMemoriesGET,
  workspacesWorkspaceIdMemoriesMemoryIdDELETE,
  workspacesWorkspaceIdMemoriesMemoryIdGET,
  workspacesWorkspaceIdMemoriesMemoryIdPATCH,
  workspacesWorkspaceIdMemoriesPOST,
  listMemories: workspacesWorkspaceIdMemoriesGET,
  deleteMemory: workspacesWorkspaceIdMemoriesMemoryIdDELETE,
  getMemory: workspacesWorkspaceIdMemoriesMemoryIdGET,
  updateMemory: workspacesWorkspaceIdMemoriesMemoryIdPATCH,
  createMemory: workspacesWorkspaceIdMemoriesPOST,
};
