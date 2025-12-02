/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List workspace skills
*
* workspaceId String 
* page Integer  (optional)
* perPage Integer  (optional)
* search String  (optional)
* returns _workspaces__workspaceId__skills_get_200_response
* */
const workspacesWorkspaceIdSkillsGET = ({ workspaceId, page, perPage, search }) => new Promise(
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
* Create a skill
*
* workspaceId String 
* createSkillRequest CreateSkillRequest 
* page Integer  (optional)
* perPage Integer  (optional)
* search String  (optional)
* returns Skill
* */
const workspacesWorkspaceIdSkillsPOST = ({ workspaceId, createSkillRequest, page, perPage, search }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        createSkillRequest,
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
* Delete a skill
*
* workspaceId String 
* skillId String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdSkillsSkillIdDELETE = ({ workspaceId, skillId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        skillId,
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
* Fetch a skill
*
* workspaceId String 
* skillId String 
* returns Skill
* */
const workspacesWorkspaceIdSkillsSkillIdGET = ({ workspaceId, skillId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        skillId,
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
* Update a skill
*
* workspaceId String 
* skillId String 
* updateSkillRequest UpdateSkillRequest 
* returns Skill
* */
const workspacesWorkspaceIdSkillsSkillIdPATCH = ({ workspaceId, skillId, updateSkillRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        skillId,
        updateSkillRequest,
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
* Test a skill via chat completion
*
* workspaceId String 
* skillId String 
* skillTestRequest SkillTestRequest 
* returns TestResponse
* */
const workspacesWorkspaceIdSkillsSkillIdTestPOST = ({ workspaceId, skillId, skillTestRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        skillId,
        skillTestRequest,
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
* List version history
*
* workspaceId String 
* skillId String 
* limit Integer  (optional)
* returns List
* */
const workspacesWorkspaceIdSkillsSkillIdVersionsGET = ({ workspaceId, skillId, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        skillId,
        limit,
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
  workspacesWorkspaceIdSkillsGET,
  workspacesWorkspaceIdSkillsPOST,
  workspacesWorkspaceIdSkillsSkillIdDELETE,
  workspacesWorkspaceIdSkillsSkillIdGET,
  workspacesWorkspaceIdSkillsSkillIdPATCH,
  workspacesWorkspaceIdSkillsSkillIdTestPOST,
  workspacesWorkspaceIdSkillsSkillIdVersionsGET,
};
