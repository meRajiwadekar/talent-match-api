"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_api_1 = __importStar(require("../serializers/json-api"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function default_1(server) {
    server.post('/ratings', async function (request, reply) {
        json_api_1.default.register({
            name: 'ratings',
            schema: {
                data: {
                    type() {
                        return 'ratings';
                    },
                    id({ data }) {
                        return data.id.toString();
                    },
                    untransformAttributes({ attributes }) {
                        return attributes;
                    },
                    attributes({ data }) {
                        return {
                            score: data.score,
                            comment: data.comment
                        };
                    },
                    relationships: {
                        user({ data, local }) {
                            if (!local?.include?.user?.self) {
                                return;
                            }
                            if (data.user) {
                                return {
                                    data: {
                                        name: 'users',
                                        data: data.user,
                                        included: true,
                                        local: {
                                            include: local?.include?.user
                                        }
                                    }
                                };
                            }
                            if (data.userId) {
                                return {
                                    data: {
                                        name: 'users',
                                        data: {
                                            id: data.userId
                                        },
                                        included: false
                                    }
                                };
                            }
                        }
                    }
                }
            }
        });
        let { userId, score, comment } = await request.body.data.attributes;
        let data = {
            score,
            comment
        };
        if (userId) {
            let userIdAsInt = Number(userId);
            data.user = {
                connect: {
                    id: userIdAsInt
                }
            };
        }
        let rating = await prisma.rating.create({
            data,
            include: {
                user: true
            }
        });
        reply.code(201);
        return json_api_1.default.transform({
            name: 'ratings',
            source: rating,
            local: {
                include: (0, json_api_1.queryParamIncludes)('user')
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=ratings.js.map