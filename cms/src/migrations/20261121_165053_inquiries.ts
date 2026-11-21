import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_forfragningar_type" AS ENUM('contact', 'signup');
  CREATE TYPE "public"."enum_forfragningar_status" AS ENUM('new', 'done');
  CREATE TABLE "forfragningar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_forfragningar_type" NOT NULL,
  	"status" "enum_forfragningar_status" DEFAULT 'new' NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"message" varchar,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forfragningar_id" integer;
  CREATE INDEX "forfragningar_updated_at_idx" ON "forfragningar" USING btree ("updated_at");
  CREATE INDEX "forfragningar_created_at_idx" ON "forfragningar" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forfragningar_fk" FOREIGN KEY ("forfragningar_id") REFERENCES "public"."forfragningar"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_forfragningar_id_idx" ON "payload_locked_documents_rels" USING btree ("forfragningar_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "forfragningar" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "forfragningar" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forfragningar_fk";
  
  DROP INDEX "payload_locked_documents_rels_forfragningar_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "forfragningar_id";
  DROP TYPE "public"."enum_forfragningar_type";
  DROP TYPE "public"."enum_forfragningar_status";`)
}
