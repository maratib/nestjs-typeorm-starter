// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "users" RESTART IDENTITY;');

    const repository = dataSource.getRepository(User);
    await repository.save(
      repository.create([
        {
          userName: 'maratib',
          email: 'maratib@gmail.com',
          phoneNumber: '03229249502',
          password: 'passw0rd',
        },
        {
          userName: 'musa',
          email: 'musa@gmail.com',
          phoneNumber: '03229249503',
          password: 'passw0rd',
        },
      ]),
    );
  }
}
