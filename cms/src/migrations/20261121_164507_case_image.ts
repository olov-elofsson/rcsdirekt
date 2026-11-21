import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "kundcase" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "kundcase" ALTER COLUMN "width" DROP NOT NULL;
  ALTER TABLE "kundcase" ALTER COLUMN "height" DROP NOT NULL;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "kundcase" ADD COLUMN "image_id" integer;
  ALTER TABLE "kundcase" ADD CONSTRAINT "kundcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "kundcase_image_idx" ON "kundcase" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "kundcase" DROP CONSTRAINT "kundcase_image_id_media_id_fk";
  
  DROP INDEX "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "kundcase_image_idx";
  ALTER TABLE "kundcase" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "kundcase" ALTER COLUMN "width" SET NOT NULL;
  ALTER TABLE "kundcase" ALTER COLUMN "height" SET NOT NULL;
  ALTER TABLE "media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "kundcase" DROP COLUMN "image_id";`)
}
