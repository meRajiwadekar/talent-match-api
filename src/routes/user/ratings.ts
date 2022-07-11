import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import serializer, { queryParamIncludes } from '../../serializers/json-api';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


type RatingBody = {
    data: {
        attributes: {
            score: number,
            comment: string
        }
    }
}

export default async function (server: FastifyInstance) {
    server.post('/user/ratings', async function (
        request: FastifyRequest<{ Body: RatingBody }>,
        reply: FastifyReply
    ) {
        serializer.register({
            name: 'ratings',
            schema: {
                data: {
                    type() {
                        return 'ratings';
                    },
                    id({ data }) {
                        let id = data.userId || data.id;
                        return id.toString();
                    },
                    untransformAttributes({ attributes }) {
                        return attributes;
                    },
                    attributes({ data }) {
                        let attributes={
                            score: data.score,
                            comment: data.comment
                        }
                        return attributes;
                    },
                    relationships:{
                        user({data,local}){
                            if(!local?.include?.user?.self){
                                return;
                            }
                            if(data.user){
                                return {
                                    data: {
                                        name : 'users',
                                        data : data.user,
                                        included : true,
                                        local : {
                                            include : local?.include?.user
                                        }
                                    }
                                };
                            }
                            if(data.userId){
                                return {
                                    data: {
                                        name : 'users',
                                        data : {
                                            id : data.userId
                                        },
                                        included : false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        let userId = request.userId as number;
        let body = await request.body as any;

        let { score, comment } = body.data.attributes;
        let rating = await prisma.rating.create({
            data: {
                score,
                comment,
                user: {
                    connect: {
                      id: userId
                    }
                  }
             },
             include:{
                 user: true
             }
        });
        reply.code(201);
        return serializer.transform({
            name: 'ratings',
            source: rating,
            local:{
                include : queryParamIncludes('user')
            }
        })
    })
}