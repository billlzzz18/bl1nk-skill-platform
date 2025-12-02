/* eslint-disable no-unused-vars */
const Service = require('./Service');

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
* Test stored provider credentials
*
* workspaceId String 
* provider String 
* returns ProviderStatus
* */
const workspacesWorkspaceIdProvidersProviderTestPOST = ({ workspaceId, provider }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        provider,
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

module.exports = {
  workspacesWorkspaceIdAgentsAgentIdTestPOST,
  workspacesWorkspaceIdProvidersProviderTestPOST,
  workspacesWorkspaceIdSkillsSkillIdTestPOST,
};
