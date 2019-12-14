# Example for using AWS Batch

An example for using aws batch run tasks to count characters of s3 file.

## Settings

Change file `.env.example` to `.env` and update your AWS credentials.

## Development

Install dependencies by `yarn install`, then `yarn start:dev <s3-bucket-name> <s3-key>` or `yarn start <s3-bucket-name> <s3-key>` to run local

## Docker

`yarn docker:build` to create docker image, then `yarn docker:run <s3-bucket-name> <s3-key>` to run in docker container.
