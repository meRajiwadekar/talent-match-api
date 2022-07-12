"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_api_1 = __importDefault(require("../serializers/json-api"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function default_1(server) {
    server.post('/user', async function responder(request, reply) {
        json_api_1.default.register({
            name: 'users',
            schema: {
                data: {
                    type() {
                        return 'users';
                    },
                    id({ data }) {
                        let id = data.userId || data.id;
                        return id.toString();
                    },
                    attributes({ data }) {
                        let attributes = {
                            email: data.email,
                            name: data.name,
                            phoneNumber: data.phoneNumber,
                            termsAcceptedAt: data.termsAcceptedAt,
                        };
                        return attributes;
                    }
                }
            }
        });
        let body = await request.body;
        let { name, email, phoneNumber, timezone } = body.data.attributes;
        let user = await prisma.user.create({
            data: { name, email, phoneNumber, timezone }
        });
        return json_api_1.default.transform({
            name: 'users',
            source: user
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=users.js.map