import axios from 'axios';

// The API endpoint for the logging service
const API_URL = 'http://13.236.142.144/middleware/api/v1/log';

/**
 * Sends a log message to the logging middleware API.
 * @param {object} params
 * @param {string} params.level - The log severity level (e.g., 'info', 'error').
 * @param {string} params.packageName - The package name the log originates from.
 * @param {string} params.version - The version of the application.
 * @param {string} params.message - The log message content.
 */
const log = async ({ level, packageName, version, message }) => {
  try {
    if (!message) {
      console.error('Log function called without a message.');
      return null;
    }

    const requestBody = {
      level: level || 'info',
      package: packageName || 'middleware', // Correctly maps packageName to the required 'package' key
      version: version || '1.0.0',
      message: message,
    };

    const response = await axios.post(API_URL, requestBody);

    if (response.status === 200) {
      console.log('Log entry created successfully:', response.data);
      return response.data;
    } else {
      console.error(`Failed to send log. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error sending log:', error.message);
    return null;
  }
};

export default log;