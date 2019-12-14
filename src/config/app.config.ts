import { config as AWSConfig } from 'aws-sdk';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

export const AppConfig = {
    appName: process.env.APP_NAME || 'worker',
    logDir: process.env.LOG_DIR,
    s3Bucket: process.env.S3_BUCKET,
    s3Key: process.env.S3_KEY,
};

const configAWS = () => {
    AWSConfig.logger = console;
    AWSConfig.apiVersions = {
        s3: '2006-03-01',
    };
    AWSConfig.maxRetries = 3;
    AWSConfig.httpOptions = {
        connectTimeout: 3000,
        timeout: 5000,
    };
};

configAWS();
