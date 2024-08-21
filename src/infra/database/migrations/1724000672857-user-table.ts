import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1711680418906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        username varchar(100) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE user;
    `);
  }
}
