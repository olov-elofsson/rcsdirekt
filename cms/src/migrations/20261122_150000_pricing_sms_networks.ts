import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "priser_sms_operator_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"operator" varchar NOT NULL,
  	"price" varchar NOT NULL
  );
  
  CREATE TABLE "priser_networks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"network" varchar NOT NULL,
  	"host" varchar,
  	"basic" varchar,
  	"single" varchar,
  	"conversation" varchar,
  	"sms" varchar
  );
  
  ALTER TABLE "priser" ADD COLUMN "sms_name" varchar;
  ALTER TABLE "priser" ADD COLUMN "sms_contents" varchar;
  ALTER TABLE "priser" ADD COLUMN "networks_heading" varchar;
  ALTER TABLE "priser" ADD COLUMN "networks_note" varchar;
  ALTER TABLE "priser_sms_operator_prices" ADD CONSTRAINT "priser_sms_operator_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_networks" ADD CONSTRAINT "priser_networks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "priser_sms_operator_prices_order_idx" ON "priser_sms_operator_prices" USING btree ("_order");
  CREATE INDEX "priser_sms_operator_prices_parent_id_idx" ON "priser_sms_operator_prices" USING btree ("_parent_id");
  CREATE INDEX "priser_networks_order_idx" ON "priser_networks" USING btree ("_order");
  CREATE INDEX "priser_networks_parent_id_idx" ON "priser_networks" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "priser_sms_operator_prices" CASCADE;
  DROP TABLE "priser_networks" CASCADE;
  ALTER TABLE "priser" DROP COLUMN "sms_name";
  ALTER TABLE "priser" DROP COLUMN "sms_contents";
  ALTER TABLE "priser" DROP COLUMN "networks_heading";
  ALTER TABLE "priser" DROP COLUMN "networks_note";`)
}
