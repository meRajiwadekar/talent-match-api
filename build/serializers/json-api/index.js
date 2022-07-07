"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamIncludes = exports.registerSerializers = void 0;
const transformalizer_1 = __importDefault(require("transformalizer"));
const ratings_1 = __importDefault(require("../../routes/user/ratings"));
const job_1 = __importDefault(require("./job"));
const user_1 = __importDefault(require("./user"));
const serializer = (0, transformalizer_1.default)();
exports.default = serializer;
function registerSerializers() {
    serializer.register(user_1.default);
    serializer.register(job_1.default);
    serializer.register(ratings_1.default);
}
exports.registerSerializers = registerSerializers;
function queryParamIncludes(includes, data = {}) {
    if (!includes) {
        return {};
    }
    let keys = includes.split(',');
    keys.forEach((key) => {
        if (key.includes('.')) {
            let [subType, ...subIncludes] = key.split('.');
            data[subType] = data[subType] || {};
            let subIncludesJoined = subIncludes.join('.');
            return queryParamIncludes(subIncludesJoined, data[subType]);
        }
        data[key] = data[key] || {};
        data[key].self = true;
    });
    return data;
}
exports.queryParamIncludes = queryParamIncludes;
//# sourceMappingURL=index.js.map