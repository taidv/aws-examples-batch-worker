"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const winston_1 = require("winston");
const app_config_1 = require("../config/app.config");
const logDir = app_config_1.AppConfig.logDir;
const errorPath = path_1.join(logDir, 'error.log');
const combinedPath = path_1.join(logDir, 'combined.log');
const Logger = winston_1.createLogger({
    defaultMeta: { service: app_config_1.AppConfig.appName },
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    level: 'info',
    transports: [
        new winston_1.transports.File({
            filename: errorPath,
            level: 'error',
        }),
        new winston_1.transports.File({
            filename: combinedPath,
        }),
    ],
});
exports.Logger = Logger;
if (process.env.NODE_ENV !== 'production') {
    Logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    }));
}
//# sourceMappingURL=logger.js.map