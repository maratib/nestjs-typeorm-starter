import { dbConfig } from '@/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = dbConfig;

export default new DataSource(dataSourceOptions);

console.log('Seeding Done');
