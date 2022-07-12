"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_api_1 = __importDefault(require("../serializers/json-api"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function default_1(server) {
    server.get('/user', async function responder(request, reply) {
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
        try {
            let user = await prisma.user.findMany();
            return json_api_1.default.transform({
                name: 'users',
                source: user
            });
        }
        catch (error) {
            return reply.status(500).send({
                "message": error
            });
        }
    });
    server.get('/users/:email', async function responder(request, reply) {
        // reply.send("userId works");
        let email = request.params.email;
        let user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    });
}
exports.default = default_1;
//# sourceMappingURL=user.js.map