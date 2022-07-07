import fastify,{ FastifyInstance } from "fastify";
import registerApi from "./routes";


const server: FastifyInstance = fastify();

server.addContentTypeParser(
    'application/vnd.api+json',
    {parseAs : 'string'},
    server.getDefaultJsonParser('ignore','ignore')
);

// server.setErrorHandler(function (error, request, reply) {
//     // from utils/log.ts
//     // logError(error);
  
//     reply.status(500);
//     reply.send({
//       error: error.message
//     });
  
registerApi(server);
export default server;