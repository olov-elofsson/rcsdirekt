// Schema change: articles can be hidden on the site (archived) and point to the article that replaces them; the topic "Nyheter" is added.
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_artiklar_category" ADD VALUE 'Nyheter' BEFORE 'Grunder';
  ALTER TABLE "artiklar" ADD COLUMN "archived" boolean DEFAULT false;
  ALTER TABLE "artiklar" ADD COLUMN "replaced_by_id" integer;
  ALTER TABLE "artiklar" ADD CONSTRAINT "artiklar_replaced_by_id_artiklar_id_fk" FOREIGN KEY ("replaced_by_id") REFERENCES "public"."artiklar"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "artiklar_replaced_by_idx" ON "artiklar" USING btree ("replaced_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artiklar" DROP CONSTRAINT "artiklar_replaced_by_id_artiklar_id_fk";
  
  ALTER TABLE "artiklar" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_artiklar_category";
  CREATE TYPE "public"."enum_artiklar_category" AS ENUM('Grunder', 'Företag', 'Meddelandedesign', 'Teknik', 'Mobil & operatörer', 'Begrepp');
  ALTER TABLE "artiklar" ALTER COLUMN "category" SET DATA TYPE "public"."enum_artiklar_category" USING "category"::"public"."enum_artiklar_category";
  DROP INDEX "artiklar_replaced_by_idx";
  ALTER TABLE "artiklar" DROP COLUMN "archived";
  ALTER TABLE "artiklar" DROP COLUMN "replaced_by_id";`)
}
