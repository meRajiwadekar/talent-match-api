import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import serializer from '../serializers/json-api';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


type QueryParams ={
    include : string
}


export default async function (server : FastifyInstance){
    server.post('/user',async function responder(
        request : FastifyRequest<{ Querystring: QueryParams }>,
        reply : FastifyReply)
        {

            serializer.register({
                name : 'users',
                schema : {
                    data:{
                        type(){
                            return 'users'
                        },
                        id({data}){
                            let id = data.userId || data.id;
                            return id.toString();
                        },   
                        attributes({data}) {
                            let attributes ={
                                email : data.email,
                                name : data.name,
                                phoneNumber : data.phoneNumber,
                                termsAcceptedAt: data.termsAcceptedAt,
                            }
                            return attributes;
                        }
                    }
                }
            })



            let body = await request.body as any;
            let {name, email, phoneNumber,timezone} = body.data.attributes;
            let user = await prisma.user.create({
                data: {name,email, phoneNumber,timezone}
            });

  
        return serializer.transform({
            name : 'users',
            source : user
        })
    })
}
