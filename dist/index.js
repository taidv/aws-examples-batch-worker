"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./util/logger");
const s3_1 = require("./util/s3");
const handleRecord = (record) => __awaiter(void 0, void 0, void 0, function* () {
    if (!record.eventName.startsWith('ObjectCreated')) {
        return;
    }
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const content = yield s3_1.getObjectContent(bucket, key);
    if (!content) {
        return;
    }
    logger_1.Logger.info(`The length of ${bucket}/${key} is ${[...content].length}.`);
});
const main = (event) => __awaiter(void 0, void 0, void 0, function* () {
    for (const record of event.Records) {
        yield handleRecord(record);
    }
});
const event_json_1 = __importDefault(require("./event.json"));
main(event_json_1.default);
//# sourceMappingURL=index.js.map