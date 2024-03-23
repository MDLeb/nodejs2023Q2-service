-- AlterTable
CREATE SEQUENCE user_version_seq;
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT nextval('user_version_seq'),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE user_version_seq OWNED BY "User"."version";
