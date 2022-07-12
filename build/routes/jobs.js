"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_api_1 = __importDefault(require("../serializers/json-api"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function default_1(server) {
    server.get('/jobs/:id', async function responder(request, reply) {
        json_api_1.default.register({
            name: 'jobs',
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
                            title: data.title,
                            description: data.description,
                            displayUrl: data.displayUrl,
                            applyUrl: data.applyUrl,
                            jobCreatedAt: data.createdAt,
                            delete_after: data.delete_after
                        };
                        return attributes;
                    }
                }
            }
        });
        if (!request.params.id) {
            reply.code(404);
            return null;
        }
        let job = await prisma.job.findUnique({
            where: {
                id: Number(request.params.id)
            }
        });
        // const past = await prisma.job.findUnique({
        //     where: {
        //         id: Number(request.params.id),
        //     },
        //     select: {
        //         createdAt : true
        //     }
        // })
        // console.log(past);
        // console.log("::Expiry date::");
        // const lastDate = new Date();
        // lastDate.setDate(lastDate.getDate() + 60);
        // console.log(lastDate.toString());
        // function addDays(date, days) {
        //     var result = new Date(date);
        //     result.setDate(result.getDate() + days);
        //     return result;
        //   }
        if (!job) {
            reply.code(404);
            return null;
        }
        return json_api_1.default.transform({
            name: 'jobs',
            source: job
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=jobs.js.map