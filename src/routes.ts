import { FastifyInstance, FastifyRequest } from "fastify";
import user from "./routes/user";
// import bearerAuthPlugin from 'fastify-bearer-auth';


import health from "./routes/health";
import users from "./routes/users";
import jobs from "./routes/jobs";
import ratings from "./routes/ratings";
import userRatings from "./routes/user/ratings";
import userEvents from "./routes/user/events";
import userAgreements from "./routes/user/agreements";


const JWT_SECRET = process.env.JWT_SECRET || '';

export default function registerApi(server : FastifyInstance){
    console.log("registerApi works!");

    server.register(health);

    server.register(async function performanceMonitoredRoutes(subroutes : FastifyInstance){
        console.log("Inside performancemonitoredRoutes!");

        subroutes.register(async function authenticatedRoutes(subroutes : FastifyInstance){
            subroutes.register(user);
            subroutes.register(userEvents);
            subroutes.register(userAgreements);
            subroutes.register(userRatings);
        })

        subroutes.register(async function unauthenticatedRoutes(subroutes : FastifyInstance){
            subroutes.register(users);
            subroutes.register(jobs);
            subroutes.register(ratings);
        })
        
    })
}
