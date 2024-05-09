import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '@/entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "cats" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Category);
    await repository.save(
      repository.create([
        {
          name: 'Electronics',
        },
        {
          name: 'fashion',
        },
        {
          name: 'goods',
        },
      ]),
    );
  }
}
