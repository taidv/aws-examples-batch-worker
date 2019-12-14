import { Logger } from './util/logger';
import { getObjectContent } from './util/s3';

const handleRecord = async record => {
    if (!record.eventName.startsWith('ObjectCreated')) {
        return;
    }

    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    const content = await getObjectContent(bucket, key);
    if (!content) {
        return;
    }
    Logger.info(`The length of ${bucket}/${key} is ${[...content].length}.`);
};

const main = async event => {
    for (const record of event.Records) {
        await handleRecord(record);
    }
};

import testEvents from './event.json';
main(testEvents);
