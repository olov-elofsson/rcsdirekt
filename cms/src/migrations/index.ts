import * as migration_20261121_154943_initial from './20261121_154943_initial';
import * as migration_20261121_161952_gcs_storage_fields from './20261121_161952_gcs_storage_fields';
import * as migration_20261121_164507_case_image from './20261121_164507_case_image';

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
    name: '20261121_164507_case_image'
  },
];
