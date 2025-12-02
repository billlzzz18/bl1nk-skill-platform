/**
 * The KnowledgeController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/KnowledgeService');
const workspacesWorkspaceIdKnowledgebasesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdKnowledgebasesGET);
};

const workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDELETE);
};

const workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGET);
};

const workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPATCH);
};

const workspacesWorkspaceIdKnowledgebasesPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdKnowledgebasesPOST);
};


module.exports = {
  workspacesWorkspaceIdKnowledgebasesGET,
  workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDELETE,
  workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGET,
  workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPATCH,
  workspacesWorkspaceIdKnowledgebasesPOST,
  listKnowledgebases: workspacesWorkspaceIdKnowledgebasesGET,
  deleteKnowledgebase: workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDELETE,
  getKnowledgebase: workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGET,
  updateKnowledgebase: workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPATCH,
  createKnowledgebase: workspacesWorkspaceIdKnowledgebasesPOST,
};
