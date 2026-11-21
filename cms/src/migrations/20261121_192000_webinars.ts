import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_forfragningar_type" ADD VALUE 'webinar';
  CREATE TABLE "webinarer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Lär dig allt om RCS' NOT NULL,
  	"description" varchar NOT NULL,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"duration_minutes" numeric DEFAULT 45 NOT NULL,
  	"registration_url" varchar,
  	"visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "webinarer_id" integer;
  CREATE INDEX "webinarer_updated_at_idx" ON "webinarer" USING btree ("updated_at");
  CREATE INDEX "webinarer_created_at_idx" ON "webinarer" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_webinarer_fk" FOREIGN KEY ("webinarer_id") REFERENCES "public"."webinarer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_webinarer_id_idx" ON "payload_locked_documents_rels" USING btree ("webinarer_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "webinarer" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "webinarer" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_webinarer_fk";
  
  ALTER TABLE "forfragningar" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_forfragningar_type";
  CREATE TYPE "public"."enum_forfragningar_type" AS ENUM('contact', 'signup');
  ALTER TABLE "forfragningar" ALTER COLUMN "type" SET DATA TYPE "public"."enum_forfragningar_type" USING "type"::"public"."enum_forfragningar_type";
  DROP INDEX "payload_locked_documents_rels_webinarer_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "webinarer_id";`)
}
