import { Certificate } from 'electron';
import fs from 'fs';

// Helper to construct API endpoints
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = window.appConfig.get('GOOSE_API_HOST') + ':' + window.appConfig.get('GOOSE_PORT');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export const getSecretKey = (): string => {
  return window.appConfig.get('secretKey');
};

// Function to load custom certificate
export const loadCustomCertificate = (certPath: string): Certificate | null => {
  try {
    const cert = fs.readFileSync(certPath);
    return Certificate.fromPEM(cert);
  } catch (error) {
    console.error('Failed to load custom certificate:', error);
    return null;
  }
};
