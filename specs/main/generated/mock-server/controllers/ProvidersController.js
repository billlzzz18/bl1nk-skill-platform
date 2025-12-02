/**
 * The ProvidersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ProvidersService');
const workspacesWorkspaceIdProvidersGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdProvidersGET);
};

const workspacesWorkspaceIdProvidersProviderDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdProvidersProviderDELETE);
};

const workspacesWorkspaceIdProvidersProviderPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdProvidersProviderPUT);
};

const workspacesWorkspaceIdProvidersProviderTestPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdProvidersProviderTestPOST);
};


module.exports = {
  workspacesWorkspaceIdProvidersGET,
  workspacesWorkspaceIdProvidersProviderDELETE,
  workspacesWorkspaceIdProvidersProviderPUT,
  workspacesWorkspaceIdProvidersProviderTestPOST,
  listProviders: workspacesWorkspaceIdProvidersGET,
  deleteProviderCredential: workspacesWorkspaceIdProvidersProviderDELETE,
  upsertProviderCredential: workspacesWorkspaceIdProvidersProviderPUT,
  testProviderCredential: workspacesWorkspaceIdProvidersProviderTestPOST,
};
