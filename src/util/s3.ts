import { S3 } from 'aws-sdk';
import { Logger } from './logger';

const s3 = new S3();

const getObjectContent = async (bucket: string, key: string): Promise<string | undefined> => {
    try {
        const res = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        return res.Body.toString();
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            Logger.warn(`${bucket}/${key} is not exists or deleted!`);
            return;
        }
        Logger.error(`Failed to get content of file ${bucket}/${key}`, error);
    }
};

export { getObjectContent };
