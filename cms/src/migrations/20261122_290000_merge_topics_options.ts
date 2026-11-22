// Schema change: the article topic field keeps only the merged topics (see 20261122_280000_merge_topics).
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artiklar" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_artiklar_category";
  CREATE TYPE "public"."enum_artiklar_category" AS ENUM('Grunder', 'Företag', 'Meddelandedesign', 'Teknik', 'Mobil & operatörer', 'Begrepp');
  ALTER TABLE "artiklar" ALTER COLUMN "category" SET DATA TYPE "public"."enum_artiklar_category" USING "category"::"public"."enum_artiklar_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artiklar" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_artiklar_category";
  CREATE TYPE "public"."enum_artiklar_category" AS ENUM('Grunder', 'För företag', 'Meddelanden', 'Integration', 'Begrepp', 'Mobil & operatörer', 'Teknik', 'Meddelandedesign', 'Företag');
  ALTER TABLE "artiklar" ALTER COLUMN "category" SET DATA TYPE "public"."enum_artiklar_category" USING "category"::"public"."enum_artiklar_category";`)
}
