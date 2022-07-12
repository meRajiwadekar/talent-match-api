"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, fastify_1.default)();
server.addContentTypeParser('application/vnd.api+json', { parseAs: 'string' }, server.getDefaultJsonParser('ignore', 'ignore'));
// server.setErrorHandler(function (error, request, reply) {
//     // from utils/log.ts
//     // logError(error);
//     reply.status(500);
//     reply.send({
//       error: error.message
//     });
(0, routes_1.default)(server);
exports.default = server;
//# sourceMappingURL=server-setup.js.map