import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const accelerateUrl = process.env.DATABASE_ACCELERATE_URL?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();

if (!accelerateUrl && !databaseUrl) {
  throw new Error(
    'Missing Prisma configuration. Set DATABASE_ACCELERATE_URL or DATABASE_URL.'
  );
}

export const prismaClient = accelerateUrl
  ? new PrismaClient({ accelerateUrl })
  : new PrismaClient({
      adapter: new PrismaPg(
        new Pool({
          connectionString: databaseUrl,
        })
      ),
    });