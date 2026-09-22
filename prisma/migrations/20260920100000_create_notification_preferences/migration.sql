-- CreateSchema
-- First-ever migration for the "notification" service (no Prisma/Postgres existed before this
-- feature). implement must also scaffold prisma/schema.prisma + the generator/datasource block
-- matching user/auth's shape (see the audit report) -- this file only creates the table.
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'PUSH', 'IN_APP');

-- CreateTable
-- userId has NO FK: User lives in the "user" service's own database (no shared DB).
CREATE TABLE IF NOT EXISTS "notification_preferences" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "eventType" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "notification_preferences_userId_eventType_channel_key" ON "notification_preferences"("userId", "eventType", "channel");
