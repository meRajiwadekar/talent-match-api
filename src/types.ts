/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }

  interface FastifyRequest {
    // partner: Partner | null,
    userId: number | null,
    transaction: number | any
  }
}

