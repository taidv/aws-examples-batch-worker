import { AppConfig } from './config/app.config';
import { Logger } from './util/logger';
import { getObjectContent } from './util/s3';

export interface ICounterEventParams {
    bucket: string;
    key: string;
}

const handleEvent = async (event: ICounterEventParams) => {
    const { bucket, key } = event;
    const content = await getObjectContent(bucket, key);
    if (!content) {
        return;
    }
    Logger.info(`The length of ${bucket}/${key} is ${[...content].length}.`);
};

const main = async () => {
    const event: ICounterEventParams = {
        bucket: AppConfig.s3Bucket,
        key: AppConfig.s3Key,
    };
    await handleEvent(event);
};

main();
