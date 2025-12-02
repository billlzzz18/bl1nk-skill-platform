/**
 * The SkillsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/SkillsService');
const workspacesWorkspaceIdSkillsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsGET);
};

const workspacesWorkspaceIdSkillsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsPOST);
};

const workspacesWorkspaceIdSkillsSkillIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsSkillIdDELETE);
};

const workspacesWorkspaceIdSkillsSkillIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsSkillIdGET);
};

const workspacesWorkspaceIdSkillsSkillIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsSkillIdPATCH);
};

const workspacesWorkspaceIdSkillsSkillIdTestPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsSkillIdTestPOST);
};

const workspacesWorkspaceIdSkillsSkillIdVersionsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.workspacesWorkspaceIdSkillsSkillIdVersionsGET);
};


module.exports = {
  workspacesWorkspaceIdSkillsGET,
  workspacesWorkspaceIdSkillsPOST,
  workspacesWorkspaceIdSkillsSkillIdDELETE,
  workspacesWorkspaceIdSkillsSkillIdGET,
  workspacesWorkspaceIdSkillsSkillIdPATCH,
  workspacesWorkspaceIdSkillsSkillIdTestPOST,
  workspacesWorkspaceIdSkillsSkillIdVersionsGET,
  listSkills: workspacesWorkspaceIdSkillsGET,
  createSkill: workspacesWorkspaceIdSkillsPOST,
  deleteSkill: workspacesWorkspaceIdSkillsSkillIdDELETE,
  getSkill: workspacesWorkspaceIdSkillsSkillIdGET,
  updateSkill: workspacesWorkspaceIdSkillsSkillIdPATCH,
  testSkill: workspacesWorkspaceIdSkillsSkillIdTestPOST,
  listSkillVersions: workspacesWorkspaceIdSkillsSkillIdVersionsGET,
};
