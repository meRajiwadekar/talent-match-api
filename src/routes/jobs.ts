import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import serializer from '../serializers/json-api';
import { Job, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type JobParams = {
    id: string
}

type JobQuery = {
    include: string
}

export default async function (server: FastifyInstance) {
    server.get('/jobs/:id', async function responder(
        request: FastifyRequest<{ Params: JobParams }>,
        reply: FastifyReply
    ) : Promise<Job | null> {

        serializer.register({
            name: 'jobs',
            schema: {
                data: {
                    type() {
                        return 'users'
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
                            applyUrl: data.applyUrl
                        }
                        return attributes;
                    }
                }
            }
        })

        if (!request.params.id) {
            reply.code(404);
            return null;
        }

        let job = await prisma.job.findUnique({
            where: {
                id: Number(request.params.id)
            }
        })

        if (!job) {
            reply.code(404);
            return null;
        }


        return serializer.transform({
            name: 'jobs',
            source: job
        })
    })
}