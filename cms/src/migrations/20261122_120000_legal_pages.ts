import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "juridiskt_integritetspolicy_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "juridiskt_villkor_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "juridiskt" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"integritetspolicy_title" varchar NOT NULL,
  	"integritetspolicy_description" varchar NOT NULL,
  	"integritetspolicy_updated" varchar NOT NULL,
  	"villkor_title" varchar NOT NULL,
  	"villkor_description" varchar NOT NULL,
  	"villkor_updated" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "juridiskt_integritetspolicy_sections" ADD CONSTRAINT "juridiskt_integritetspolicy_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."juridiskt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "juridiskt_villkor_sections" ADD CONSTRAINT "juridiskt_villkor_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."juridiskt"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "juridiskt_integritetspolicy_sections_order_idx" ON "juridiskt_integritetspolicy_sections" USING btree ("_order");
  CREATE INDEX "juridiskt_integritetspolicy_sections_parent_id_idx" ON "juridiskt_integritetspolicy_sections" USING btree ("_parent_id");
  CREATE INDEX "juridiskt_villkor_sections_order_idx" ON "juridiskt_villkor_sections" USING btree ("_order");
  CREATE INDEX "juridiskt_villkor_sections_parent_id_idx" ON "juridiskt_villkor_sections" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "juridiskt_integritetspolicy_sections" CASCADE;
  DROP TABLE "juridiskt_villkor_sections" CASCADE;
  DROP TABLE "juridiskt" CASCADE;`)
}
