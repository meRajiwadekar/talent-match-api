"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_api_1 = __importDefault(require("../../serializers/json-api"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function default_1(server) {
    server.post('/user/events/convert/:clientUserId', async function (request, reply) {
        json_api_1.default.register({
            name: 'events',
            schema: {
                data: {
                    type() {
                        return 'events';
                    },
                    id({ data }) {
                        return data.id.toString();
                    },
                    untransformAttributes({ attributes }) {
                        return attributes;
                    },
                    attributes({ data }) {
                        return {};
                    }
                }
            }
        });
        // let userId = request.userId;
        // OR
        let body = request.body;
        let userId = body.data.attributes.userId;
        await prisma.event.updateMany({
            where: {
                clientUserId: request.params.clientUserId
            },
            data: {
                userId
            }
        });
        reply.code(201);
        return null;
    });
}
exports.default = default_1;
//# sourceMappingURL=events.js.map