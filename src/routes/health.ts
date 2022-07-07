import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


export default async function (server: FastifyInstance) {
    server.get('/',async function responder(
        request : FastifyRequest, 
        reply : FastifyReply) {
            return '';
        })

        server.get('/health',async function responder(
            request : FastifyRequest, 
            reply : FastifyReply    
        ){
            return 'A OK';
        })

        // server.get('/test-ra',async function responder(
        //     request : FastifyRequest,
        //     reply : FastifyReply
        // ){

        // })
}