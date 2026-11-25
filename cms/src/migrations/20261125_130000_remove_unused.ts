import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "kundcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "begrepp" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "startsida_fordelar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "startsida_jamforelse_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "startsida_vagar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "startsida_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "priser_sms_operator_prices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "demo_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "demo_rich_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "demo_replies_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "demo_replies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "demo" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "kundcase" CASCADE;
  DROP TABLE "begrepp" CASCADE;
  DROP TABLE "startsida_fordelar_items" CASCADE;
  DROP TABLE "startsida_jamforelse_rows" CASCADE;
  DROP TABLE "startsida_vagar_items" CASCADE;
  DROP TABLE "startsida_rels" CASCADE;
  DROP TABLE "priser_sms_operator_prices" CASCADE;
  DROP TABLE "demo_features" CASCADE;
  DROP TABLE "demo_rich_cards" CASCADE;
  DROP TABLE "demo_replies_actions" CASCADE;
  DROP TABLE "demo_replies" CASCADE;
  DROP TABLE "demo" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_kundcase_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_begrepp_fk";
  
  DROP INDEX "payload_locked_documents_rels_kundcase_id_idx";
  DROP INDEX "payload_locked_documents_rels_begrepp_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "kundcase_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "begrepp_id";
  ALTER TABLE "startsida" DROP COLUMN "kundcase_heading";
  ALTER TABLE "startsida" DROP COLUMN "fordelar_heading";
  ALTER TABLE "startsida" DROP COLUMN "fordelar_intro";
  ALTER TABLE "startsida" DROP COLUMN "jamforelse_heading";
  ALTER TABLE "startsida" DROP COLUMN "jamforelse_intro";
  ALTER TABLE "startsida" DROP COLUMN "vagar_heading";
  ALTER TABLE "startsida" DROP COLUMN "vagar_intro";
  ALTER TABLE "startsida" DROP COLUMN "pris_heading";
  ALTER TABLE "startsida" DROP COLUMN "pris_subheading";
  ALTER TABLE "startsida" DROP COLUMN "pris_intro";
  ALTER TABLE "startsida" DROP COLUMN "blogg_heading";
  ALTER TABLE "startsida" DROP COLUMN "blogg_intro";
  ALTER TABLE "startsida" DROP COLUMN "kontakt_heading";
  ALTER TABLE "startsida" DROP COLUMN "kontakt_intro";
  ALTER TABLE "priser" DROP COLUMN "sms_name";
  ALTER TABLE "priser" DROP COLUMN "sms_contents";
  DROP TYPE "public"."enum_startsida_fordelar_items_icon";
  DROP TYPE "public"."enum_startsida_vagar_items_icon";
  DROP TYPE "public"."enum_demo_rich_cards_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_startsida_fordelar_items_icon" AS ENUM('trending-up', 'bar-chart', 'wallet', 'globe', 'code', 'image', 'layers', 'pointer', 'message', 'shield', 'check', 'sparkles');
  CREATE TYPE "public"."enum_startsida_vagar_items_icon" AS ENUM('trending-up', 'bar-chart', 'wallet', 'globe', 'code', 'image', 'layers', 'pointer', 'message', 'shield', 'check', 'sparkles');
  CREATE TYPE "public"."enum_demo_rich_cards_icon" AS ENUM('trending-up', 'bar-chart', 'wallet', 'globe', 'code', 'image', 'layers', 'pointer', 'message', 'shield', 'check', 'sparkles');
  CREATE TABLE "kundcase" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"image_id" integer,
  	"logo_id" integer,
  	"width" numeric,
  	"height" numeric,
  	"description" varchar NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "begrepp" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"term" varchar NOT NULL,
  	"aliases" varchar,
  	"definition" varchar NOT NULL,
  	"source_id" integer NOT NULL,
  	"article_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "startsida_fordelar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_startsida_fordelar_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"copy" varchar NOT NULL
  );
  
  CREATE TABLE "startsida_jamforelse_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"sms" varchar NOT NULL,
  	"rcs" varchar NOT NULL
  );
  
  CREATE TABLE "startsida_vagar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_startsida_vagar_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"copy" varchar NOT NULL
  );
  
  CREATE TABLE "startsida_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"artiklar_id" integer
  );
  
  CREATE TABLE "priser_sms_operator_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"operator" varchar NOT NULL,
  	"price" varchar NOT NULL
  );
  
  CREATE TABLE "demo_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"copy" varchar NOT NULL
  );
  
  CREATE TABLE "demo_rich_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_demo_rich_cards_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"copy" varchar NOT NULL
  );
  
  CREATE TABLE "demo_replies_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "demo_replies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"copy" varchar NOT NULL
  );
  
  CREATE TABLE "demo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "kundcase_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "begrepp_id" integer;
  ALTER TABLE "startsida" ADD COLUMN "kundcase_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "fordelar_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "fordelar_intro" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "jamforelse_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "jamforelse_intro" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "vagar_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "vagar_intro" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "pris_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "pris_subheading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "pris_intro" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "blogg_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "blogg_intro" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "kontakt_heading" varchar NOT NULL;
  ALTER TABLE "startsida" ADD COLUMN "kontakt_intro" varchar NOT NULL;
  ALTER TABLE "priser" ADD COLUMN "sms_name" varchar;
  ALTER TABLE "priser" ADD COLUMN "sms_contents" varchar;
  ALTER TABLE "kundcase" ADD CONSTRAINT "kundcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kundcase" ADD CONSTRAINT "kundcase_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "begrepp" ADD CONSTRAINT "begrepp_source_id_kallor_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."kallor"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "begrepp" ADD CONSTRAINT "begrepp_article_id_artiklar_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."artiklar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startsida_fordelar_items" ADD CONSTRAINT "startsida_fordelar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_jamforelse_rows" ADD CONSTRAINT "startsida_jamforelse_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_vagar_items" ADD CONSTRAINT "startsida_vagar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_rels" ADD CONSTRAINT "startsida_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_rels" ADD CONSTRAINT "startsida_rels_artiklar_fk" FOREIGN KEY ("artiklar_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_sms_operator_prices" ADD CONSTRAINT "priser_sms_operator_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_features" ADD CONSTRAINT "demo_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_rich_cards" ADD CONSTRAINT "demo_rich_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_replies_actions" ADD CONSTRAINT "demo_replies_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo_replies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_replies" ADD CONSTRAINT "demo_replies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "kundcase__order_idx" ON "kundcase" USING btree ("_order");
  CREATE INDEX "kundcase_image_idx" ON "kundcase" USING btree ("image_id");
  CREATE INDEX "kundcase_logo_idx" ON "kundcase" USING btree ("logo_id");
  CREATE INDEX "kundcase_updated_at_idx" ON "kundcase" USING btree ("updated_at");
  CREATE INDEX "kundcase_created_at_idx" ON "kundcase" USING btree ("created_at");
  CREATE INDEX "begrepp__order_idx" ON "begrepp" USING btree ("_order");
  CREATE UNIQUE INDEX "begrepp_term_idx" ON "begrepp" USING btree ("term");
  CREATE INDEX "begrepp_source_idx" ON "begrepp" USING btree ("source_id");
  CREATE INDEX "begrepp_article_idx" ON "begrepp" USING btree ("article_id");
  CREATE INDEX "begrepp_updated_at_idx" ON "begrepp" USING btree ("updated_at");
  CREATE INDEX "begrepp_created_at_idx" ON "begrepp" USING btree ("created_at");
  CREATE INDEX "startsida_fordelar_items_order_idx" ON "startsida_fordelar_items" USING btree ("_order");
  CREATE INDEX "startsida_fordelar_items_parent_id_idx" ON "startsida_fordelar_items" USING btree ("_parent_id");
  CREATE INDEX "startsida_jamforelse_rows_order_idx" ON "startsida_jamforelse_rows" USING btree ("_order");
  CREATE INDEX "startsida_jamforelse_rows_parent_id_idx" ON "startsida_jamforelse_rows" USING btree ("_parent_id");
  CREATE INDEX "startsida_vagar_items_order_idx" ON "startsida_vagar_items" USING btree ("_order");
  CREATE INDEX "startsida_vagar_items_parent_id_idx" ON "startsida_vagar_items" USING btree ("_parent_id");
  CREATE INDEX "startsida_rels_order_idx" ON "startsida_rels" USING btree ("order");
  CREATE INDEX "startsida_rels_parent_idx" ON "startsida_rels" USING btree ("parent_id");
  CREATE INDEX "startsida_rels_path_idx" ON "startsida_rels" USING btree ("path");
  CREATE INDEX "startsida_rels_artiklar_id_idx" ON "startsida_rels" USING btree ("artiklar_id");
  CREATE INDEX "priser_sms_operator_prices_order_idx" ON "priser_sms_operator_prices" USING btree ("_order");
  CREATE INDEX "priser_sms_operator_prices_parent_id_idx" ON "priser_sms_operator_prices" USING btree ("_parent_id");
  CREATE INDEX "demo_features_order_idx" ON "demo_features" USING btree ("_order");
  CREATE INDEX "demo_features_parent_id_idx" ON "demo_features" USING btree ("_parent_id");
  CREATE INDEX "demo_rich_cards_order_idx" ON "demo_rich_cards" USING btree ("_order");
  CREATE INDEX "demo_rich_cards_parent_id_idx" ON "demo_rich_cards" USING btree ("_parent_id");
  CREATE INDEX "demo_replies_actions_order_idx" ON "demo_replies_actions" USING btree ("_order");
  CREATE INDEX "demo_replies_actions_parent_id_idx" ON "demo_replies_actions" USING btree ("_parent_id");
  CREATE INDEX "demo_replies_order_idx" ON "demo_replies" USING btree ("_order");
  CREATE INDEX "demo_replies_parent_id_idx" ON "demo_replies" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kundcase_fk" FOREIGN KEY ("kundcase_id") REFERENCES "public"."kundcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_begrepp_fk" FOREIGN KEY ("begrepp_id") REFERENCES "public"."begrepp"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_kundcase_id_idx" ON "payload_locked_documents_rels" USING btree ("kundcase_id");
  CREATE INDEX "payload_locked_documents_rels_begrepp_id_idx" ON "payload_locked_documents_rels" USING btree ("begrepp_id");`)
}
