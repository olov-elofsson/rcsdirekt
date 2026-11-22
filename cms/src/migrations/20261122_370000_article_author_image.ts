import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artiklar" ADD COLUMN "author" varchar;
  ALTER TABLE "artiklar" ADD COLUMN "image_id" integer;
  ALTER TABLE "artiklar" ADD CONSTRAINT "artiklar_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "artiklar_image_idx" ON "artiklar" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artiklar" DROP CONSTRAINT "artiklar_image_id_media_id_fk";
  
  DROP INDEX "artiklar_image_idx";
  ALTER TABLE "artiklar" DROP COLUMN "author";
  ALTER TABLE "artiklar" DROP COLUMN "image_id";`)
}
