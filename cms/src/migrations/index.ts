import * as migration_20261121_154943_initial from './20261121_154943_initial';
import * as migration_20261121_161952_gcs_storage_fields from './20261121_161952_gcs_storage_fields';
import * as migration_20261121_164507_case_image from './20261121_164507_case_image';
import * as migration_20261121_165053_inquiries from './20261121_165053_inquiries';
import * as migration_20261121_171500_prices_50 from './20261121_171500_prices_50';
import * as migration_20261121_170000_operator_prices from './20261121_170000_operator_prices';
import * as migration_20261121_197000_list_prices from './20261121_197000_list_prices';
import * as migration_20261121_198000_five_advantages from './20261121_198000_five_advantages';
import * as migration_20261121_199000_headings_and_advantages from './20261121_199000_headings_and_advantages';
import * as migration_20261121_200000_section_intros from './20261121_200000_section_intros';
import * as migration_20261122_100000_pitch from './20261122_100000_pitch';
import * as migration_20261122_110000_short_headings from './20261122_110000_short_headings';
import * as migration_20261122_120000_legal_pages from './20261122_120000_legal_pages';
import * as migration_20261122_120100_legal_texts from './20261122_120100_legal_texts';
import * as migration_20261122_130000_hero_and_comparison from './20261122_130000_hero_and_comparison';
import * as migration_20261122_140000_comparison_rows from './20261122_140000_comparison_rows';
import * as migration_20261122_150000_pricing_sms_networks from './20261122_150000_pricing_sms_networks';
import * as migration_20261122_150100_prices_and_texts from './20261122_150100_prices_and_texts';
import * as migration_20261122_160000_comparison_tidy from './20261122_160000_comparison_tidy';
import * as migration_20261122_170000_privacy_email from './20261122_170000_privacy_email';
import * as migration_20261122_180000_brand_name from './20261122_180000_brand_name';
import * as migration_20261121_190000_case_names from './20261121_190000_case_names';
import * as migration_20261121_191000_case_photos from './20261121_191000_case_photos';
import * as migration_20261121_192000_webinars from './20261121_192000_webinars';
import * as migration_20261121_193000_first_webinar from './20261121_193000_first_webinar';
import * as migration_20261121_194000_logo_shape_article from './20261121_194000_logo_shape_article';
import * as migration_20261121_195000_humanizer_copy from './20261121_195000_humanizer_copy';

export const migrations = [
  {
    up: migration_20261121_154943_initial.up,
    down: migration_20261121_154943_initial.down,
    name: '20261121_154943_initial',
  },
  {
    up: migration_20261121_161952_gcs_storage_fields.up,
    down: migration_20261121_161952_gcs_storage_fields.down,
    name: '20261121_161952_gcs_storage_fields',
  },
  {
    up: migration_20261121_164507_case_image.up,
    down: migration_20261121_164507_case_image.down,
    name: '20261121_164507_case_image',
  },
  {
    up: migration_20261121_165053_inquiries.up,
    down: migration_20261121_165053_inquiries.down,
    name: '20261121_165053_inquiries',
  },
  // Schema for operator prices. Listed before every migration that reads the pricing global, so
  // that one which has not run yet never queries a table that does not exist.
  {
    up: migration_20261121_170000_operator_prices.up,
    down: migration_20261121_170000_operator_prices.down,
    name: '20261121_170000_operator_prices',
  },
  {
    up: migration_20261121_171500_prices_50.up,
    down: migration_20261121_171500_prices_50.down,
    name: '20261121_171500_prices_50',
  },
  {
    up: migration_20261121_190000_case_names.up,
    down: migration_20261121_190000_case_names.down,
    name: '20261121_190000_case_names',
  },
  {
    up: migration_20261121_191000_case_photos.up,
    down: migration_20261121_191000_case_photos.down,
    name: '20261121_191000_case_photos',
  },
  {
    up: migration_20261121_192000_webinars.up,
    down: migration_20261121_192000_webinars.down,
    name: '20261121_192000_webinars',
  },
  {
    up: migration_20261121_193000_first_webinar.up,
    down: migration_20261121_193000_first_webinar.down,
    name: '20261121_193000_first_webinar',
  },
  {
    up: migration_20261121_194000_logo_shape_article.up,
    down: migration_20261121_194000_logo_shape_article.down,
    name: '20261121_194000_logo_shape_article',
  },
  {
    up: migration_20261121_195000_humanizer_copy.up,
    down: migration_20261121_195000_humanizer_copy.down,
    name: '20261121_195000_humanizer_copy'
  },
  {
    up: migration_20261121_197000_list_prices.up,
    down: migration_20261121_197000_list_prices.down,
    name: '20261121_197000_list_prices',
  },
  {
    up: migration_20261121_198000_five_advantages.up,
    down: migration_20261121_198000_five_advantages.down,
    name: '20261121_198000_five_advantages',
  },
  {
    up: migration_20261121_199000_headings_and_advantages.up,
    down: migration_20261121_199000_headings_and_advantages.down,
    name: '20261121_199000_headings_and_advantages',
  },
  {
    up: migration_20261121_200000_section_intros.up,
    down: migration_20261121_200000_section_intros.down,
    name: '20261121_200000_section_intros',
  },
  {
    up: migration_20261122_100000_pitch.up,
    down: migration_20261122_100000_pitch.down,
    name: '20261122_100000_pitch',
  },
  {
    up: migration_20261122_110000_short_headings.up,
    down: migration_20261122_110000_short_headings.down,
    name: '20261122_110000_short_headings',
  },
  {
    up: migration_20261122_120000_legal_pages.up,
    down: migration_20261122_120000_legal_pages.down,
    name: '20261122_120000_legal_pages',
  },
  {
    up: migration_20261122_120100_legal_texts.up,
    down: migration_20261122_120100_legal_texts.down,
    name: '20261122_120100_legal_texts',
  },
  {
    up: migration_20261122_130000_hero_and_comparison.up,
    down: migration_20261122_130000_hero_and_comparison.down,
    name: '20261122_130000_hero_and_comparison',
  },
  {
    up: migration_20261122_140000_comparison_rows.up,
    down: migration_20261122_140000_comparison_rows.down,
    name: '20261122_140000_comparison_rows',
  },
  {
    up: migration_20261122_150000_pricing_sms_networks.up,
    down: migration_20261122_150000_pricing_sms_networks.down,
    name: '20261122_150000_pricing_sms_networks',
  },
  {
    up: migration_20261122_150100_prices_and_texts.up,
    down: migration_20261122_150100_prices_and_texts.down,
    name: '20261122_150100_prices_and_texts',
  },
  {
    up: migration_20261122_160000_comparison_tidy.up,
    down: migration_20261122_160000_comparison_tidy.down,
    name: '20261122_160000_comparison_tidy',
  },
  {
    up: migration_20261122_170000_privacy_email.up,
    down: migration_20261122_170000_privacy_email.down,
    name: '20261122_170000_privacy_email',
  },
  {
    up: migration_20261122_180000_brand_name.up,
    down: migration_20261122_180000_brand_name.down,
    name: '20261122_180000_brand_name',
  },
];
