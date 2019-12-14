"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.AppConfig = {
    appName: process.env.APP_NAME || 'worker',
    logDir: process.env.LOG_DIR,
};
const configAWS = () => {
    aws_sdk_1.config.logger = console;
    aws_sdk_1.config.apiVersions = {
        s3: '2006-03-01',
    };
    aws_sdk_1.config.maxRetries = 3;
};
configAWS();
//# sourceMappingURL=app.config.js.map