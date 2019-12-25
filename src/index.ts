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
    Logger.info(`Handled event for ${bucket}/${key}.`);
};

const main = async () => {
    const event: ICounterEventParams = {
        bucket: process.argv[2],
        key: process.argv[3],
    };
    await handleEvent(event);
};

main();
