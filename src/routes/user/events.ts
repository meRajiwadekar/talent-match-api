import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import serializer, { queryParamIncludes } from '../../serializers/json-api';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


type UserEventParams ={
    clientUserId :string
}

export default async function (server : FastifyInstance){
    server.post('/user/events/convert/:clientUserId',async function(
        request : FastifyRequest<{Params : UserEventParams}>,
        reply : FastifyReply
    ): Promise<null>{

        serializer.register({
                name : 'events',
            schema : {
                data : {
                    type(){
                        return 'events';
                    },
                    id({data}){
                        return data.id.toString();
                    },
                    untransformAttributes({ attributes }){
                        return attributes;
                    },
                    attributes({data}) {
                        return {}
                    }
                }
            }
        })
        // let userId = request.userId;
        // OR
        let body = request.body as any;
        let userId = body.data.attributes.userId;

        await prisma.event.updateMany({
            where:{
                clientUserId : request.params.clientUserId
            },
            data:{
                userId
            }
        });

        reply.code(201);
        return null;
    })
}