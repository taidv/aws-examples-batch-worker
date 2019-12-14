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

const listKeys = async (bucket: string, token?: string): Promise<[string[], string | undefined]> => {
    try {
        const opts: any = { Bucket: bucket };
        if (token) {
            opts.ContinuationToken = token;
        }

        const data = await s3.listObjectsV2(opts).promise();
        const keys = data.Contents.map(object => object.Key);
        if (!data.IsTruncated) {
            return [keys, 'end'];
        }
        return [keys, data.NextContinuationToken];
    } catch (error) {
        Logger.error(`Failed when listing keys of bucket ${bucket}`, { error });
        if (error.retryable) {
            return [[], undefined];
        }
        return [[], 'error'];
    }
};

export { getObjectContent, listKeys };
