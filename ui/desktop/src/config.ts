export const getApiUrl = (endpoint: string): string => {
  const baseUrl = window.appConfig.get('GOOSE_API_HOST') + ':' + window.appConfig.get('GOOSE_PORT');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export const getSecretKey = (): string => {
  return window.appConfig.get('secretKey');
};

export const getCopilotApiKey = (): string => {
  return window.appConfig.get('COPILOT_API_KEY');
};
