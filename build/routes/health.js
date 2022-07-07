"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(server) {
    server.get('/', async function responder(request, reply) {
        return '';
    });
    server.get('/health', async function responder(request, reply) {
        return 'A OK';
    });
    // server.get('/test-ra',async function responder(
    //     request : FastifyRequest,
    //     reply : FastifyReply
    // ){
    // })
}
exports.default = default_1;
//# sourceMappingURL=health.js.map