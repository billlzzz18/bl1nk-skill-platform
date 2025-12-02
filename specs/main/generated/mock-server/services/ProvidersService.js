/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List provider credentials
*
* workspaceId String 
* returns List
* */
const workspacesWorkspaceIdProvidersGET = ({ workspaceId }) => new Promise(
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
* Delete provider credentials
*
* workspaceId String 
* provider String 
* no response value expected for this operation
* */
const workspacesWorkspaceIdProvidersProviderDELETE = ({ workspaceId, provider }) => new Promise(
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
* Upsert credentials for a provider
*
* workspaceId String 
* provider String 
* providerCredentialRequest ProviderCredentialRequest 
* returns ProviderCredential
* */
const workspacesWorkspaceIdProvidersProviderPUT = ({ workspaceId, provider, providerCredentialRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workspaceId,
        provider,
        providerCredentialRequest,
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

module.exports = {
  workspacesWorkspaceIdProvidersGET,
  workspacesWorkspaceIdProvidersProviderDELETE,
  workspacesWorkspaceIdProvidersProviderPUT,
  workspacesWorkspaceIdProvidersProviderTestPOST,
};
