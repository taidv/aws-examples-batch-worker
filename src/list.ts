import { AppConfig } from './config/app.config';
import { Logger } from './util/logger';
import { listKeys } from './util/s3';

const main = async () => {
    Logger.info(`${AppConfig.appName} started!`);
    let [keys, token] = [[], undefined];

    while (token !== 'end' && token !== 'error') {
        [keys, token] = await listKeys(AppConfig.s3Bucket, token);
        for (const key of keys) {
            Logger.info(`Key ${key}`);
        }
    }
    Logger.info(`${AppConfig.appName} finished!`);
};

main();
