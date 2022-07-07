"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./routes/user"));
// import bearerAuthPlugin from 'fastify-bearer-auth';
const health_1 = __importDefault(require("./routes/health"));
const users_1 = __importDefault(require("./routes/users"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const ratings_1 = __importDefault(require("./routes/user/ratings"));
const JWT_SECRET = process.env.JWT_SECRET || '';
function registerApi(server) {
    console.log("registerApi works!");
    server.register(health_1.default);
    server.register(async function performanceMonitoredRoutes(subroutes) {
        console.log("Inside performancemonitoredRoutes!");
        subroutes.register(async function authenticatedRoutes(subroutes) {
            subroutes.register(user_1.default);
        });
        subroutes.register(async function unauthenticatedRoutes(subroutes) {
            subroutes.register(users_1.default);
            subroutes.register(jobs_1.default);
            subroutes.register(ratings_1.default);
        });
    });
}
exports.default = registerApi;
//# sourceMappingURL=routes.js.map