import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Removes the fields the site never read: related articles and the prices' short and long
// texts. The related rows go first, so artiklar_rels keeps only real relations.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DELETE FROM "artiklar_rels" WHERE "path" = 'related';
   ALTER TABLE "artiklar_rels" DROP CONSTRAINT IF EXISTS "artiklar_rels_artiklar_fk";
  
  DROP INDEX IF EXISTS "artiklar_rels_artiklar_id_idx";
  ALTER TABLE "artiklar_rels" DROP COLUMN IF EXISTS "artiklar_id";
  ALTER TABLE "priser_plans" DROP COLUMN IF EXISTS "short";
  ALTER TABLE "priser_plans" DROP COLUMN IF EXISTS "copy";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artiklar_rels" ADD COLUMN "artiklar_id" integer;
  ALTER TABLE "priser_plans" ADD COLUMN "short" varchar NOT NULL;
  ALTER TABLE "priser_plans" ADD COLUMN "copy" varchar NOT NULL;
  ALTER TABLE "artiklar_rels" ADD CONSTRAINT "artiklar_rels_artiklar_fk" FOREIGN KEY ("artiklar_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "artiklar_rels_artiklar_id_idx" ON "artiklar_rels" USING btree ("artiklar_id");`)
}
