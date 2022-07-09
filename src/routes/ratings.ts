import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import serializer, { queryParamIncludes } from '../serializers/json-api';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type RatingBody={
    data:{
        attributes:{
            userId?: number,
            score : number,
            comment : string
        }
    }
}

export default async function(server : FastifyInstance){
    server.post('/ratings',async function(
        request : FastifyRequest<{Body: RatingBody}>,
        reply : FastifyReply
    ){

        serializer.register({
            name : 'ratings',
            schema : {
                data : {
                    type(){
                        return 'ratings';
                    },
                    id({data}){
                        return data.id.toString();
                    },
                    untransformAttributes({attributes}){
                        return attributes;
                    },
                    attributes({data}){
                        return {
                            score : data.score,
                            comment : data.comment
                        };
                    },
                    relationships:{
                        user({data,local}){
                            if(!local?.include?.user?.self){
                                return;
                            }
                            if(data.user){
                                return {
                                    data : {
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
                                        data:{
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


        let {userId, score, comment} = await request.body.data.attributes;

        let data = {
            score,
            comment
        } as any;

        if (userId){
            let userIdAsInt = Number(userId);
            data.user = {
                connect : {
                    id : userIdAsInt
                }
            };
        }

        let rating = await prisma.rating.create({
            data,
            include : {
                user : true
            }
        });

        reply.code(201);
        return serializer.transform({
            name : 'ratings',
            source : rating,
            local : {
                include : queryParamIncludes('user')
            }
        })
    })
}