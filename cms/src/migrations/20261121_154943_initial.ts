import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_artiklar_category" AS ENUM('Grunder', 'För företag', 'Meddelanden', 'Integration', 'Begrepp', 'Mobil & operatörer', 'Teknik', 'Meddelandedesign', 'Företag');
  CREATE TYPE "public"."enum_startsida_fordelar_items_icon" AS ENUM('trending-up', 'bar-chart', 'wallet', 'globe', 'code', 'image', 'layers', 'pointer', 'message', 'shield', 'check', 'sparkles');
  CREATE TYPE "public"."enum_startsida_vagar_items_icon" AS ENUM('trending-up', 'bar-chart', 'wallet', 'globe', 'code', 'image', 'layers', 'pointer', 'message', 'shield', 'check', 'sparkles');
  CREATE TYPE "public"."enum_demo_rich_cards_icon" AS ENUM('trending-up', 'bar-chart', 'wallet', 'globe', 'code', 'image', 'layers', 'pointer', 'message', 'shield', 'check', 'sparkles');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "kundcase" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"width" numeric NOT NULL,
  	"height" numeric NOT NULL,
  	"description" varchar NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "artiklar_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  CREATE TABLE "artiklar_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "artiklar_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "artiklar_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"section_id" varchar
  );
  
  CREATE TABLE "artiklar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_artiklar_category" NOT NULL,
  	"published" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "artiklar_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"kallor_id" integer,
  	"artiklar_id" integer
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
  
  CREATE TABLE "kallor" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"finding" varchar,
  	"implication" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"kundcase_id" integer,
  	"artiklar_id" integer,
  	"begrepp_id" integer,
  	"kallor_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
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
  
  CREATE TABLE "startsida" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_highlight" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"kundcase_heading" varchar NOT NULL,
  	"fordelar_heading" varchar NOT NULL,
  	"fordelar_intro" varchar NOT NULL,
  	"jamforelse_heading" varchar NOT NULL,
  	"jamforelse_intro" varchar NOT NULL,
  	"vagar_heading" varchar NOT NULL,
  	"vagar_intro" varchar NOT NULL,
  	"pris_heading" varchar NOT NULL,
  	"pris_subheading" varchar NOT NULL,
  	"pris_intro" varchar NOT NULL,
  	"blogg_heading" varchar NOT NULL,
  	"blogg_intro" varchar NOT NULL,
  	"kontakt_heading" varchar NOT NULL,
  	"kontakt_intro" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "startsida_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"artiklar_id" integer
  );
  
  CREATE TABLE "priser_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"badge" varchar,
  	"contents" varchar NOT NULL,
  	"short" varchar NOT NULL,
  	"copy" varchar NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE "priser_operators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "priser_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"available" boolean DEFAULT false
  );
  
  CREATE TABLE "priser_currencies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"available" boolean DEFAULT false
  );
  
  CREATE TABLE "priser_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "priser_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "priser" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"vat_note" varchar NOT NULL,
  	"selector_note" varchar NOT NULL,
  	"included_heading" varchar NOT NULL,
  	"faq_heading" varchar NOT NULL,
  	"volume_text" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kundcase" ADD CONSTRAINT "kundcase_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "artiklar_keywords" ADD CONSTRAINT "artiklar_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artiklar_sections_paragraphs" ADD CONSTRAINT "artiklar_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."artiklar_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artiklar_sections_points" ADD CONSTRAINT "artiklar_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."artiklar_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artiklar_sections" ADD CONSTRAINT "artiklar_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artiklar_rels" ADD CONSTRAINT "artiklar_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artiklar_rels" ADD CONSTRAINT "artiklar_rels_kallor_fk" FOREIGN KEY ("kallor_id") REFERENCES "public"."kallor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artiklar_rels" ADD CONSTRAINT "artiklar_rels_artiklar_fk" FOREIGN KEY ("artiklar_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "begrepp" ADD CONSTRAINT "begrepp_source_id_kallor_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."kallor"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "begrepp" ADD CONSTRAINT "begrepp_article_id_artiklar_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."artiklar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kundcase_fk" FOREIGN KEY ("kundcase_id") REFERENCES "public"."kundcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artiklar_fk" FOREIGN KEY ("artiklar_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_begrepp_fk" FOREIGN KEY ("begrepp_id") REFERENCES "public"."begrepp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kallor_fk" FOREIGN KEY ("kallor_id") REFERENCES "public"."kallor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_fordelar_items" ADD CONSTRAINT "startsida_fordelar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_jamforelse_rows" ADD CONSTRAINT "startsida_jamforelse_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_vagar_items" ADD CONSTRAINT "startsida_vagar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_rels" ADD CONSTRAINT "startsida_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."startsida"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startsida_rels" ADD CONSTRAINT "startsida_rels_artiklar_fk" FOREIGN KEY ("artiklar_id") REFERENCES "public"."artiklar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_plans" ADD CONSTRAINT "priser_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_operators" ADD CONSTRAINT "priser_operators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_countries" ADD CONSTRAINT "priser_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_currencies" ADD CONSTRAINT "priser_currencies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_included" ADD CONSTRAINT "priser_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "priser_faq" ADD CONSTRAINT "priser_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."priser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_features" ADD CONSTRAINT "demo_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_rich_cards" ADD CONSTRAINT "demo_rich_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_replies_actions" ADD CONSTRAINT "demo_replies_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo_replies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demo_replies" ADD CONSTRAINT "demo_replies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "kundcase__order_idx" ON "kundcase" USING btree ("_order");
  CREATE INDEX "kundcase_logo_idx" ON "kundcase" USING btree ("logo_id");
  CREATE INDEX "kundcase_updated_at_idx" ON "kundcase" USING btree ("updated_at");
  CREATE INDEX "kundcase_created_at_idx" ON "kundcase" USING btree ("created_at");
  CREATE INDEX "artiklar_keywords_order_idx" ON "artiklar_keywords" USING btree ("_order");
  CREATE INDEX "artiklar_keywords_parent_id_idx" ON "artiklar_keywords" USING btree ("_parent_id");
  CREATE INDEX "artiklar_sections_paragraphs_order_idx" ON "artiklar_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "artiklar_sections_paragraphs_parent_id_idx" ON "artiklar_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "artiklar_sections_points_order_idx" ON "artiklar_sections_points" USING btree ("_order");
  CREATE INDEX "artiklar_sections_points_parent_id_idx" ON "artiklar_sections_points" USING btree ("_parent_id");
  CREATE INDEX "artiklar_sections_order_idx" ON "artiklar_sections" USING btree ("_order");
  CREATE INDEX "artiklar_sections_parent_id_idx" ON "artiklar_sections" USING btree ("_parent_id");
  CREATE INDEX "artiklar__order_idx" ON "artiklar" USING btree ("_order");
  CREATE UNIQUE INDEX "artiklar_slug_idx" ON "artiklar" USING btree ("slug");
  CREATE INDEX "artiklar_updated_at_idx" ON "artiklar" USING btree ("updated_at");
  CREATE INDEX "artiklar_created_at_idx" ON "artiklar" USING btree ("created_at");
  CREATE INDEX "artiklar_rels_order_idx" ON "artiklar_rels" USING btree ("order");
  CREATE INDEX "artiklar_rels_parent_idx" ON "artiklar_rels" USING btree ("parent_id");
  CREATE INDEX "artiklar_rels_path_idx" ON "artiklar_rels" USING btree ("path");
  CREATE INDEX "artiklar_rels_kallor_id_idx" ON "artiklar_rels" USING btree ("kallor_id");
  CREATE INDEX "artiklar_rels_artiklar_id_idx" ON "artiklar_rels" USING btree ("artiklar_id");
  CREATE INDEX "begrepp__order_idx" ON "begrepp" USING btree ("_order");
  CREATE UNIQUE INDEX "begrepp_term_idx" ON "begrepp" USING btree ("term");
  CREATE INDEX "begrepp_source_idx" ON "begrepp" USING btree ("source_id");
  CREATE INDEX "begrepp_article_idx" ON "begrepp" USING btree ("article_id");
  CREATE INDEX "begrepp_updated_at_idx" ON "begrepp" USING btree ("updated_at");
  CREATE INDEX "begrepp_created_at_idx" ON "begrepp" USING btree ("created_at");
  CREATE INDEX "kallor__order_idx" ON "kallor" USING btree ("_order");
  CREATE UNIQUE INDEX "kallor_source_id_idx" ON "kallor" USING btree ("source_id");
  CREATE INDEX "kallor_updated_at_idx" ON "kallor" USING btree ("updated_at");
  CREATE INDEX "kallor_created_at_idx" ON "kallor" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_kundcase_id_idx" ON "payload_locked_documents_rels" USING btree ("kundcase_id");
  CREATE INDEX "payload_locked_documents_rels_artiklar_id_idx" ON "payload_locked_documents_rels" USING btree ("artiklar_id");
  CREATE INDEX "payload_locked_documents_rels_begrepp_id_idx" ON "payload_locked_documents_rels" USING btree ("begrepp_id");
  CREATE INDEX "payload_locked_documents_rels_kallor_id_idx" ON "payload_locked_documents_rels" USING btree ("kallor_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
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
  CREATE INDEX "priser_plans_order_idx" ON "priser_plans" USING btree ("_order");
  CREATE INDEX "priser_plans_parent_id_idx" ON "priser_plans" USING btree ("_parent_id");
  CREATE INDEX "priser_operators_order_idx" ON "priser_operators" USING btree ("_order");
  CREATE INDEX "priser_operators_parent_id_idx" ON "priser_operators" USING btree ("_parent_id");
  CREATE INDEX "priser_countries_order_idx" ON "priser_countries" USING btree ("_order");
  CREATE INDEX "priser_countries_parent_id_idx" ON "priser_countries" USING btree ("_parent_id");
  CREATE INDEX "priser_currencies_order_idx" ON "priser_currencies" USING btree ("_order");
  CREATE INDEX "priser_currencies_parent_id_idx" ON "priser_currencies" USING btree ("_parent_id");
  CREATE INDEX "priser_included_order_idx" ON "priser_included" USING btree ("_order");
  CREATE INDEX "priser_included_parent_id_idx" ON "priser_included" USING btree ("_parent_id");
  CREATE INDEX "priser_faq_order_idx" ON "priser_faq" USING btree ("_order");
  CREATE INDEX "priser_faq_parent_id_idx" ON "priser_faq" USING btree ("_parent_id");
  CREATE INDEX "demo_features_order_idx" ON "demo_features" USING btree ("_order");
  CREATE INDEX "demo_features_parent_id_idx" ON "demo_features" USING btree ("_parent_id");
  CREATE INDEX "demo_rich_cards_order_idx" ON "demo_rich_cards" USING btree ("_order");
  CREATE INDEX "demo_rich_cards_parent_id_idx" ON "demo_rich_cards" USING btree ("_parent_id");
  CREATE INDEX "demo_replies_actions_order_idx" ON "demo_replies_actions" USING btree ("_order");
  CREATE INDEX "demo_replies_actions_parent_id_idx" ON "demo_replies_actions" USING btree ("_parent_id");
  CREATE INDEX "demo_replies_order_idx" ON "demo_replies" USING btree ("_order");
  CREATE INDEX "demo_replies_parent_id_idx" ON "demo_replies" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "kundcase" CASCADE;
  DROP TABLE "artiklar_keywords" CASCADE;
  DROP TABLE "artiklar_sections_paragraphs" CASCADE;
  DROP TABLE "artiklar_sections_points" CASCADE;
  DROP TABLE "artiklar_sections" CASCADE;
  DROP TABLE "artiklar" CASCADE;
  DROP TABLE "artiklar_rels" CASCADE;
  DROP TABLE "begrepp" CASCADE;
  DROP TABLE "kallor" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "startsida_fordelar_items" CASCADE;
  DROP TABLE "startsida_jamforelse_rows" CASCADE;
  DROP TABLE "startsida_vagar_items" CASCADE;
  DROP TABLE "startsida" CASCADE;
  DROP TABLE "startsida_rels" CASCADE;
  DROP TABLE "priser_plans" CASCADE;
  DROP TABLE "priser_operators" CASCADE;
  DROP TABLE "priser_countries" CASCADE;
  DROP TABLE "priser_currencies" CASCADE;
  DROP TABLE "priser_included" CASCADE;
  DROP TABLE "priser_faq" CASCADE;
  DROP TABLE "priser" CASCADE;
  DROP TABLE "demo_features" CASCADE;
  DROP TABLE "demo_rich_cards" CASCADE;
  DROP TABLE "demo_replies_actions" CASCADE;
  DROP TABLE "demo_replies" CASCADE;
  DROP TABLE "demo" CASCADE;
  DROP TYPE "public"."enum_artiklar_category";
  DROP TYPE "public"."enum_startsida_fordelar_items_icon";
  DROP TYPE "public"."enum_startsida_vagar_items_icon";
  DROP TYPE "public"."enum_demo_rich_cards_icon";`)
}
