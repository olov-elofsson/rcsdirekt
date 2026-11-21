import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
// The schema snapshot for this migration is 20261121_196000_operator_prices.json: it keeps the
// later name so that the next migrate:create compares against the newest schema.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "priser_plans_operator_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"operator" varchar NOT NULL,
  	"price" varchar NOT NULL
  );
  
  ALTER TABLE "priser_plans_operator_prices" ADD CONSTRAINT "priser_plans_operator_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser_plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "priser_plans_operator_prices_order_idx" ON "priser_plans_operator_prices" USING btree ("_order");
  CREATE INDEX "priser_plans_operator_prices_parent_id_idx" ON "priser_plans_operator_prices" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "priser_plans_operator_prices" CASCADE;`)
}
