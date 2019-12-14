import { config as AWSConfig } from 'aws-sdk';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

export const AppConfig = {
    appName: process.env.APP_NAME || 'worker',
    logDir: process.env.LOG_DIR,
};

const configAWS = () => {
    AWSConfig.logger = console;
    AWSConfig.apiVersions = {
        s3: '2006-03-01',
    };
    AWSConfig.maxRetries = 3;
};

configAWS();
