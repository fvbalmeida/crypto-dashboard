import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCryptocurrencyMigration1711680418908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_cryptocurrency (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_id int NOT NULL,
        cryptocurrency_id int NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (cryptocurrency_id) REFERENCES cryptocurrency(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE user_cryptocurrency;
    `);
  }
}
