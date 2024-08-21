import { MigrationInterface, QueryRunner } from 'typeorm';

export class CryptocurrencyMigration1711680418907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cryptocurrency (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        symbol varchar(100) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE cryptocurrency;
    `);
  }
}
