import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import serializer, { queryParamIncludes } from '../../serializers/json-api';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Agreement= {
    data:{
        attributes:{
            tiTermsAceepted : boolean
        }
    }
}

export default async function (server: FastifyInstance){
    server.post('/user/agreement',async function(
        request : FastifyRequest<{Body : Agreement}>,
        reply : FastifyReply
    ):Promise<null>{

        serializer.register({
            name : 'agreements',
            schema : {
                data :{
                    type(){
                        return 'agreements';
                    },
                    id({data}){
                        return data.id.toString();
                    },
                    attributes({data}) {
                        return {
                            acceptedAt : data.termsAcceptedAt
                        };
                    },
                    relationships: {
                        user({ data, local }) {
                          if (!local?.include?.user?.self) {
                            return;
                          }
                
                          return {
                            data: {
                              name: 'users',
                              data,
                              included: true,
                              local: {
                                include: local?.include?.user
                              }
                            }
                          };
                        },
                      }
                }
            }
        })

        // let userId = request.userId as number;
        // OR
        let body = request.body as any;
        let userId = body.data.attributes.userId;
        let user = await prisma.user.update({
            where: {
                id : userId,
            },
            data:{
                termsAcceptedAt : new Date()
            }
        });

        // await prisma.event.create({
        //     data:{
        //         name : 'tos:accept',
        //         userId,
        //         metadata:{
        //             tiTermsAceepted : request.body.data.attributes.tiTermsAceepted
        //         }
        //     }
        // });

        reply.code(201);
        return serializer.transform({
            name : 'agreements',
            source : user,
            local:{
                include : queryParamIncludes('user')
            }
        });
    });
}