import { join } from 'path';
import { createLogger, format, transports } from 'winston';
import { AppConfig } from '../config/app.config';

const logDir = AppConfig.logDir;
const errorPath = join(logDir, 'error.log');
const combinedPath = join(logDir, 'combined.log');

const Logger = createLogger({
    defaultMeta: { service: AppConfig.appName },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    level: 'info',
    transports: [
        new transports.File({
            filename: errorPath,
            level: 'error',
        }),
        new transports.File({
            filename: combinedPath,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    Logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

export { Logger };
