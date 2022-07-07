import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import serializer from "../serializers/json-api";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


type QueryParams ={
    include : string
}

export type UserEmailParams = {
    email: string
  }


export default async function (server: FastifyInstance){
    server.get('/user',async function responder(
        request : FastifyRequest<{ Querystring: QueryParams }>,
        reply : FastifyReply) {

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
                                phoneNumber: data.phoneNumber,
                                termsAcceptedAt: data.termsAcceptedAt,
                            }
                            return attributes;
                        }
                    }
                }
            })


            try {
                let user = await prisma.user.findMany();

                return serializer.transform({
                    name : 'users',
                    source : user
                })
            } catch (error) {
                return reply.status(500).send({
                    "message": error
                });
            }
            
        })

        server.get('/users/:email',async function responder(
            request : FastifyRequest<{Params : UserEmailParams, Querystring :QueryParams}>,
            reply : FastifyReply
        ) {
            reply.send("userId works");
            let email = request.params.email;

            let user = await prisma.user.findUnique({ 
                where : {
                    email
                }
            });

            return user;
        })
}
